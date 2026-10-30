const {test} = require('node:test');
const assert = require('node:assert/strict');
const M = require('../web/map-core.js');
const papers = [
 {id:'OLD.RL.1',category:'NEW.LEARN',short_name:'Touch Policy',title:'Learning fingers',authors:'Li',kind:'model',tags:['ppo','touch'],topics:['rl','touch'],year:2026,publication_date:{value:'2026-10'},display_tags:[{zh:'手内操作',en:'In-hand'}],tldr:{zh:'触觉策略',en:'Touch policy'},show_on_map:false},
 {id:'OLD.VLA.2',category:'NEW.LEARN',short_name:'VLA',title:'Joint prediction',kind:'model',tags:['vla'],topics:['vla'],year:2026,publication_date:{value:'2026-07'},show_on_map:true},
 {id:'OLD.BENCH.1',category:'NEW.DATA',short_name:'Bench',title:'A benchmark',kind:'benchmark',tags:['touch'],topics:['touch'],year:2025,publication_date:{value:'2025'},benchmark:{hands:{zh:'两种手',en:'Two hands'}}},
];
const data={papers,topics:{rl:{tags:['ppo','residual-rl']},touch:{tags:['touch']}}};
test('search and intersecting topics include papers omitted from static map',()=>{
 assert.deepEqual(M.filterPapers(data,{topics:['rl','touch'],query:'手内操作',range:'all'}).map(p=>p.id),['OLD.RL.1']);
 assert.equal(M.filterPapers(data,{topics:['rl','vla'],range:'all'}).length,0);
 assert.deepEqual(M.filterPapers(data,{query:'两种手',kind:'benchmark',range:'all'}).map(p=>p.id),['OLD.BENCH.1']);
 assert.equal(M.filterPapers(data,{topics:['rl'],representatives:true,range:'all'}).length,0);
});
test('partial-year dates intersect windows and never become invented January dates',()=>{
 const year={publication_date:{value:'2026'}};
 assert.equal(M.inWindow(year,{start:'2026-05',end:'2026-10'}),true);
 assert.equal(M.inWindow(papers[2],{start:'2026-05',end:'2026-10'}),false);
 assert.equal(M.monthKey(year),'2026-unknown');
 assert.deepEqual(M.bounds(papers,'6'),{start:'2026-05',end:'2026-10'});
 assert.equal(M.filterPapers(data,{query:'VLA',range:'6'}).length,1);
 assert.equal(M.filterPapers({papers:[]},{range:'6'}).length,0);
});
test('taxonomy uses explicit category with unique IDs even for shared code prefixes',()=>{
 const tax={children:[{name:'One',children:[{code:'NEW.LEARN',children:[]}]},{name:'Two',children:[{code:'NEW.DATA',children:[]}]}]};
 const tree=M.buildTree(tax,papers);
 assert.notEqual(tree[0].key,tree[1].key);
 assert.deepEqual(tree[0].children[0].papers.map(p=>p.id),['OLD.RL.1','OLD.VLA.2']);
 assert.equal(tree[1].papers.length,1);
});
test('older years expand without losing unknown-month entries',()=>{
 let cols=M.columns(papers,new Set(), '2026-10');
 assert.deepEqual(cols.map(c=>c.key),['2026-10','2026-07','2025']);
 assert.equal(M.columnFor(papers[2],cols),'2025');
 cols=M.columns(papers,new Set(['2025']), '2026-10');
 assert.deepEqual(cols.map(c=>c.key),['2026-10','2026-07','2025-unknown']);
 assert.equal(M.columnFor(papers[2],cols),'2025-unknown');
});
test('text and permitted summary formatting do not inject HTML',()=>{
 const html=M.formatText('**Fact** <img src=x onerror=alert(1)>\nnext<br>line');
 assert.ok(html.includes('<strong>Fact</strong>'));
 assert.ok(html.includes('&lt;img'));
 assert.ok(!html.includes('<img'));
 assert.ok(M.escape('" onmouseover="x').includes('&quot;'));
});

const taxonomy={children:[{name:'Manipulation',name_zh:'操作',children:[{name:'Policies',name_zh:'策略',code:'NEW.LEARN'},{name:'Benchmarks',name_zh:'基准',code:'NEW.DATA'}]},{name:'Navigation',name_zh:'导航',code:'EMPTY'}]};
const collection={...data,taxonomy,repository:'https://example.org',schema_version:1,papers:papers.map((p,i)=>({...p,slug:['touch','vla','bench'][i],links:{paper:`https://example.org/${i}`}}))};
test('category focus includes descendants and composes with topic intersections',()=>{
 const parent=M.categoryIndex(taxonomy).find(n=>n.name==='Manipulation');
 assert.equal(M.filterPapers(collection,{category:parent.key}).length,3);
 assert.deepEqual(M.filterPapers(collection,{category:'NEW.LEARN',topics:['touch']}).map(p=>p.slug),['touch']);
 assert.equal(M.filterPapers(collection,{category:'EMPTY'}).length,0);
});
test('parent category identity survives sibling reordering and rejects changed membership',()=>{
 const key=M.categoryIndex(taxonomy)[0].key;
 const reordered={children:[taxonomy.children[1],{...taxonomy.children[0],children:[...taxonomy.children[0].children].reverse()}]};
 assert.ok(M.categoryIndex(reordered).some(n=>n.key===key));
 const changed={children:[{...taxonomy.children[0],children:[taxonomy.children[0].children[0]]}]};
 assert.ok(!M.categoryIndex(changed).some(n=>n.key===key));
});
test('shared state validates values and keeps paper outside the filtered result readable',()=>{
 const state=M.readState('?view=map&category=NEW.LEARN&topic=rl&topic=missing&paper=bench&lang=en&sort=oldest&range=6',collection,{view:'list'});
 assert.equal(state.view,'map');assert.equal(state.paper,'bench');assert.deepEqual(state.topics,['rl']);
 assert.equal(M.filterPapers(collection,state).some(p=>p.slug==='bench'),false);
 const again=M.readState(M.stateQuery(state),collection);
 assert.deepEqual(again,state);
 const bad=M.readState('?category=unknown&view=bad&range=0&paper=missing&sort=bad',collection);
 assert.equal(bad.category,'');assert.equal(bad.invalidCategory,true);assert.equal(bad.paper,'');assert.equal(bad.range,'12');
});
test('compact cell preview reveals exactly three and can reveal the complete cell',()=>{
 const ps=Array.from({length:7},(_,i)=>({slug:String(i)}));
 assert.deepEqual(M.preview(ps,false),{shown:ps.slice(0,3),remaining:4});
 assert.deepEqual(M.preview(ps,true),{shown:ps,remaining:0});
 assert.deepEqual(M.preview([],false),{shown:[],remaining:0});
});
test('sorting remains deterministic without changing imprecise dates',()=>{
 const ps=[{slug:'a',short_name:'A',year:2026},{slug:'b',short_name:'B',publication_date:{value:'2026-10'}},{slug:'c',short_name:'C',publication_date:{value:'2026-10-13'}}];
 assert.deepEqual(M.sortPapers(ps,'newest').map(p=>p.slug),['c','b','a']);
 assert.deepEqual(M.sortPapers(ps,'oldest').map(p=>p.slug),['a','b','c']);
 assert.deepEqual(M.sortPapers(ps,'name').map(p=>p.slug),['a','b','c']);
 assert.equal(M.stamp(ps[0]),'2026');
});
test('exports include every matching result and preserve bilingual benchmark facts',()=>{
 const state={category:'NEW.DATA',lang:'zh',range:'all',sort:'newest'};
 const exported=JSON.parse(M.exportResults(collection,state,'json'));
 assert.deepEqual(exported.papers,[collection.papers[2]]);
 assert.deepEqual(exported.taxonomy,taxonomy);
 const csv=M.exportResults(collection,state,'csv');
 assert.ok(csv.includes('两种手'));assert.ok(csv.includes('https://example.org/2'));
});
test('CSV quotes newlines and separators and neutralizes spreadsheet formulas',()=>{
 const d={...collection,papers:[{...collection.papers[0],title:'=HYPERLINK("x")',authors:'A, B\nC',tldr:{en:'@danger',zh:'安全'}}]};
 const csv=M.exportResults(d,{lang:'en',range:'all'},'csv');
 assert.ok(csv.includes('"\'=HYPERLINK(""x"")"'));
 assert.ok(csv.includes('"A, B\nC"'));assert.ok(csv.includes('"\'@danger"'));
});

const deepTaxonomy={children:[
 {name:'Manipulation',children:[{name:'Dexterous',children:[{name:'Control',children:[{code:'LEARN'},{code:'PLAN'}]},{code:'BENCH'}]},{code:'GRIP'}]},
 {name:'Whole body',children:[{name:'Motion',children:[{code:'BODY'}]}]}
]};
test('initial overview expands every category level down to the leaves',()=>{
 const nodes=M.categoryIndex(deepTaxonomy);
 const expanded=M.expandedCategories(deepTaxonomy);
 assert.deepEqual([...expanded],nodes.filter(n=>n.children.length).map(n=>n.key));
});
test('focusing a parent expands all its descendants without expanding unrelated branches',()=>{
 const nodes=M.categoryIndex(deepTaxonomy), focus=nodes.find(n=>n.name==='Dexterous');
 const expanded=M.expandedCategories(deepTaxonomy,focus.key);
 assert.deepEqual([...expanded],[focus.key,nodes.find(n=>n.name==='Control').key]);
 assert.equal(M.expandedCategories(deepTaxonomy,'LEARN').size,0);
});
test('history restores explicit collapsed state while fresh category links expand by default',()=>{
 const parent=M.categoryIndex(deepTaxonomy).find(n=>n.name==='Manipulation');
 assert.equal(M.expandedCategories(deepTaxonomy,parent.key,[]).size,0);
 assert.deepEqual([...M.expandedCategories(deepTaxonomy,parent.key,[parent.key,'deleted'])],[parent.key]);
 assert.ok(M.expandedCategories(deepTaxonomy,parent.key).size>1);
});

test('tree share links roundtrip scope, filters, language and an outside paper',()=>{
 const state=M.readState('?view=tree&category=NEW.LEARN&range=all&topic=rl&lang=en&paper=bench',collection);
 assert.equal(state.view,'tree');
 assert.equal(state.category,'NEW.LEARN');
 assert.deepEqual(M.readState(M.stateQuery(state),collection),state);
 assert.equal(M.readState('?view=tree&category=retired',collection).invalidCategory,true);
});

test('tree re-roots at the selected category and retains every descendant level',()=>{
 const T=require('../web/tree-view.js');
 const d={...collection,taxonomy:deepTaxonomy,papers:[{...collection.papers[0],category:'LEARN'},{...collection.papers[1],category:'PLAN'}]};
 const dex=M.categoryIndex(deepTaxonomy).find(n=>n.name==='Dexterous');
 const model=T.model(d,{category:dex.key,range:'all'});
 assert.equal(model.root.name,'Dexterous');
 assert.deepEqual(model.root.children.map(n=>n.name||n.code),['Control','BENCH']);
 assert.deepEqual(model.root.children[0].children.map(n=>n.code),['LEARN','PLAN']);
 assert.equal(model.parentKey,M.categoryIndex(deepTaxonomy)[0].key);
 assert.deepEqual(model.breadcrumbs.map(n=>n.name),['Research Map','Manipulation','Dexterous']);
 const leaves=T.model(d,{category:'LEARN',range:'all'});
 assert.equal(leaves.root.code,'LEARN');
 assert.deepEqual(leaves.root.children.map(n=>n.paper.slug),['touch']);
});

test('tree places papers once by current category and includes nonrepresentatives',()=>{
 const T=require('../web/tree-view.js');
 const d={...collection,papers:collection.papers.map(p=>({...p,related_categories:['NEW.LEARN','NEW.DATA']}))};
 const before=JSON.stringify(d);
 const model=T.model(d,{range:'all'});
 const flat=T.layout(model.root).nodes;
 assert.deepEqual(flat.filter(n=>n.type==='paper').map(n=>n.paper.slug).sort(),['bench','touch','vla']);
 assert.equal(flat.find(n=>n.paper?.slug==='bench').parentKey,'NEW.DATA');
 assert.equal(JSON.stringify(d),before);
});

test('tree distinguishes uncollected categories from filters hiding existing work',()=>{
 const T=require('../web/tree-view.js');
 const empty=T.model(collection,{category:'EMPTY',range:'all'});
 assert.equal(empty.total,0);assert.equal(empty.matched,0);assert.equal(empty.root.children.length,0);
 const filtered=T.model(collection,{category:'NEW.LEARN',query:'no-such-paper',range:'all'});
 assert.equal(filtered.total,2);assert.equal(filtered.matched,0);assert.equal(filtered.root.children.length,0);
 const reps=T.model(collection,{category:'NEW.LEARN',representatives:true,range:'all'});
 assert.deepEqual(reps.root.children.map(n=>n.paper.slug),['vla']);
});

test('tree layout keeps all nodes within the canvas without overlapping cards',()=>{
 const T=require('../web/tree-view.js');
 const d={...collection,papers:[...collection.papers,...Array.from({length:40},(_,i)=>({...collection.papers[0],slug:`extra-${i}`}))]};
 const graph=T.layout(T.model(d,{range:'all'}).root);
 assert.equal(graph.nodes.length,48); // 43 papers + virtual root + four categories
 assert.equal(graph.edges.length,47);
 for(const n of graph.nodes){
  assert.ok(n.x>=0&&n.y>=0&&n.x+n.width<=graph.width&&n.y+n.height<=graph.height);
  if(n.parentKey!==null){const parent=graph.nodes.find(p=>p.key===n.parentKey);assert.ok(parent.x+parent.width<n.x||n.x+n.width<parent.x);}
 }
 for(let i=0;i<graph.nodes.length;i++)for(const b of graph.nodes.slice(i+1)){
  const a=graph.nodes[i];
  assert.ok(a.x+a.width<=b.x||b.x+b.width<=a.x||a.y+a.height<=b.y||b.y+b.height<=a.y,`${a.key} overlaps ${b.key}`);
 }
 const leaf=T.layout(T.model(collection,{category:'EMPTY',range:'all'}).root);
 assert.equal(leaf.nodes.length,1);assert.equal(leaf.edges.length,0);
});

test('tree cards reserve more space for long names and bilingual method tags',()=>{
 const T=require('../web/tree-view.js');
 const short={type:'paper',key:'short',paper:{short_name:'A',display_tags:[]},children:[]};
 const long={type:'paper',key:'long',paper:{short_name:'A very long paper name about dexterous manipulation with multiple embodiments',display_tags:[{en:'Cross-embodiment adaptation of learned manipulation policies',zh:'跨手迁移'},{en:'Execution feedback and action refinement',zh:'执行反馈与动作修正'}]},children:[]};
 const root={type:'category',key:'root',children:[short,long]};
 const graph=T.layout(root);
 assert.ok(graph.nodes.find(n=>n.key==='short').height<=100);
 assert.ok(graph.nodes.find(n=>n.key==='long').height>graph.nodes.find(n=>n.key==='short').height);
});

test('compact tree balances dense leaf siblings and removes card-sized whitespace',()=>{
 const T=require('../web/tree-view.js');
 const ps=Array.from({length:20},(_,i)=>({...collection.papers[0],slug:`p-${i}`,short_name:`Paper ${i}`,display_tags:[{en:'RL',zh:'RL'}]}));
 const graph=T.layout(T.model({...collection,papers:ps},{category:'NEW.LEARN',range:'all'}).root,{lang:'zh'});
 assert.ok(graph.height<=600,`twenty short papers should fit a compact tree, got ${graph.height}px`);
 const root=graph.nodes.find(n=>n.parentKey===null),leaves=graph.nodes.filter(n=>n.type==='paper');
 assert.ok(leaves.some(n=>n.x+n.width<root.x));assert.ok(leaves.some(n=>n.x>root.x+root.width));
 assert.ok(leaves.every(n=>n.height<=52));
});

test('Chinese layout uses Chinese label lengths rather than reserving English whitespace',()=>{
 const T=require('../web/tree-view.js');
 const p={...collection.papers[0],short_name:'Policy',display_tags:[{en:'Long language-conditioned contact feedback for multi-fingered manipulation control',zh:'触觉'}]};
 const root=T.model({...collection,papers:[p]},{category:'NEW.LEARN',range:'all'}).root;
 const zh=T.layout(root,{lang:'zh'}),en=T.layout(root,{lang:'en'});
 assert.ok(zh.nodes.find(n=>n.type==='paper').height<en.nodes.find(n=>n.type==='paper').height);
});

test('subtree SVG exports every scoped paper, links and bold tags with safe standalone XML',()=>{
 const T=require('../web/tree-view.js');
 const ps=collection.papers.map(p=>({...p,display_tags:[{en:'Agent & code',zh:'Agent＋代码',bold:true}]}));
 const d={...collection,papers:ps},state={category:'NEW.LEARN',range:'all',lang:'zh'};
 const graph=T.layout(T.model(d,state).root,{lang:'zh'}),svg=T.svg(graph,{lang:'zh',state});
 assert.equal((svg.match(/data-paper-slug=/g)||[]).length,2);
 assert.ok(svg.includes('https://example.org/0'));assert.ok(svg.includes('https://example.org/1'));assert.ok(!svg.includes('https://example.org/2'));
 assert.ok(svg.includes('Agent＋代码'));assert.ok(svg.includes('font-weight="700"'));
 assert.ok(svg.includes(`viewBox="0 0 ${graph.width} ${graph.height}"`));
 assert.ok(!svg.includes('foreignObject'));assert.ok(!svg.includes('<script'));assert.ok(!svg.includes('data-tree-paper'));
 const unsafe={...ps[0],short_name:'<script>& unsafe',links:{paper:'https://example.org/?a=1&b=2'}};
 const escaped=T.svg(T.layout(T.model({...d,papers:[unsafe]},state).root,{lang:'en'}),{lang:'en'});
 assert.ok(escaped.includes('&lt;script&gt;'));assert.ok(escaped.includes('?a=1&amp;b=2'));assert.ok(!escaped.includes('<script>'));
});

test('PNG export bounds pixel allocation while preserving the full-tree aspect ratio',()=>{
 const T=require('../web/tree-view.js');
 assert.deepEqual(T.rasterSize({width:2000,height:1000}),{width:4000,height:2000});
 const large=T.rasterSize({width:20000,height:10000});
 assert.ok(large.width*large.height<=16000000);assert.ok(Math.max(large.width,large.height)<=8192);
 assert.ok(Math.abs(large.width/large.height-2)<.002);
});

test('fit-tree scales the complete graph even below the manual zoom minimum',()=>{
 const T=require('../web/tree-view.js');
 assert.equal(T.fitScale({width:20000,height:10000},400,600),.02);
 assert.equal(T.fitScale({width:200,height:100},400,600),1);
});
