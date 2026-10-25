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
