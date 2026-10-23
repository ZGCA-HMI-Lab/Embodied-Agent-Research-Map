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
