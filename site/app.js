/* View controller for generated map schema v1. No paper records live here. */
(() => {
  'use strict';
  const M = window.MapCore, data = window.RESEARCH_MAP, $ = id => document.getElementById(id);
  if (!M || !data || data.schema_version !== 1) {
    $('timeline').textContent = '地图数据未加载或接口版本不兼容。请重新运行 build_catalog.py。 / Map data unavailable.';
    return;
  }
  const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; } };
  const save = (key,value) => { try { localStorage.setItem(key,value); } catch (_) {} };
  const state = {lang: read('research-map-lang','zh') === 'en' ? 'en' : 'zh', query:'', topics:[], kind:'', range:'12', representatives:false};
  const open = new Set(), years = new Set();
  let selected = null, theme = read('research-map-theme','light');
  const treeAll = M.buildTree(data.taxonomy,data.papers);
  const walk = (nodes, fn, depth=0, path=[]) => nodes.forEach(n => { fn(n,depth,path); walk(n.children,fn,depth+1,[...path,n]); });
  walk(treeAll,n => { if(n.children.length) open.add(n.key); });
  const categoryPaths = {};
  walk(treeAll,(n,_,path) => { if(n.code) categoryPaths[n.code]=[...path,n]; });
  const newest = data.papers.map(M.stamp).sort().at(-1) || '';
  const e = M.escape;
  const words = {
    zh:{title:'具身动作模型',subtitle:'沿时间探索研究方向，从论文看见方法。',total:'篇已收录工作',map:'交互地图',static:'静态导图 ↗',catalog:'论文目录 ↗',search:'搜索论文、方法、作者…',kind:'成果类型',allKinds:'全部类型',range:{6:'近半年',12:'近一年',all:'全部'},representatives:'仅代表作',reset:'重置',hint:'多个主题取交集；时间以全库最新论文为参照。',heading:'分类 × 时间',result:(n,total)=>`${n} / ${total} 篇工作`,expand:'展开分类',collapse:'收起分类',direction:'最新 ← 更早',category:'研究方向',date:'公开时间',unknown:'月份未注明',expandYear:'展开',foldYear:'收起年份',noResults:'没有匹配的论文',noResultsHint:'尝试减少筛选条件，或重置后浏览全部工作。',empty:'尚未收录论文',footer:'与分类目录、思维导图使用同一份论文记录。',reference:'布局参考 ↗',note:'按已知公开时间排列；编号推导的 arXiv 月份与已核验日期分别标注，未注明月份的工作单独列出。',summary:'方法与贡献',scope:'评测范围',resources:'资源',entry:'分类记录',notes:'阅读笔记',verified:'内容核验',source:'时间依据',basis:{'arxiv-id-month':'arXiv 月份（编号推导，未核实更早公开时间）',source:'公开日期（来源记录）','year-only':'仅记录年份，月份未知'},kindNames:{model:'模型',benchmark:'评测基准',dataset:'数据集',tool:'工具',survey:'综述'},facts:{hands:'手型',tasks:'任务',cross_hand:'同任务跨手',release:'开放情况',highlight:'核心特点'},links:{paper:'论文',project:'项目',code:'代码',data:'数据',assets:'资产',hand_catalog:'手型清单'},details:'简介与资源',close:'关闭详情',theme:'切换深浅主题',statuses:{indexed:'已收录',skimmed:'初读',read:'已读',reproduced:'已复现'}},
    en:{title:'Embodied Action Models',subtitle:'Explore research through time. Discover the methods behind each paper.',total:'indexed works',map:'Interactive map',static:'Mind map ↗',catalog:'Paper catalog ↗',search:'Search papers, methods, authors…',kind:'Type',allKinds:'All types',range:{6:'6 months',12:'1 year',all:'All'},representatives:'Representatives only',reset:'Reset',hint:'Selected topics intersect. Time ranges are anchored to the newest work in the full collection.',heading:'Category × time',result:(n,total)=>`${n} / ${total} works`,expand:'Expand categories',collapse:'Collapse categories',direction:'Newer ← Older',category:'Research direction',date:'Public release',unknown:'Month unknown',expandYear:'Expand',foldYear:'Fold year',noResults:'No matching papers',noResultsHint:'Try fewer filters, or reset to explore the collection.',empty:'No papers indexed yet',footer:'One canonical collection for the catalog, mind map and interactive view.',reference:'Layout reference ↗',note:'Ordered by known release time. Identifier-derived arXiv months are labeled separately from source-verified dates; unknown months have their own columns.',summary:'Method and contribution',scope:'Evaluation scope',resources:'Resources',entry:'Catalog record',notes:'Reading notes',verified:'Facts checked',source:'Date source',basis:{'arxiv-id-month':'arXiv month (from identifier; earlier releases not checked)',source:'Public release date (source record)','year-only':'Year only; month unknown'},kindNames:{model:'Model',benchmark:'Benchmark',dataset:'Dataset',tool:'Tool',survey:'Survey'},facts:{hands:'Hands',tasks:'Tasks',cross_hand:'Same-task cross-hand reuse',release:'Release status',highlight:'Key distinction'},links:{paper:'Paper',project:'Project',code:'Code',data:'Data',assets:'Assets',hand_catalog:'Hand catalog'},details:'Summary & resources',close:'Close details',theme:'Toggle light/dark theme',statuses:{indexed:'Indexed',skimmed:'Initial reading',read:'Read',reproduced:'Reproduced'}}
  };
  const w = () => words[state.lang];
  const nodeName = n => state.lang === 'zh' ? n.name_zh : n.name;
  const localized = obj => obj?.[state.lang] || obj?.zh || obj?.en || '';
  function setTheme(){document.documentElement.dataset.theme=theme==='dark'?'dark':'light';}
  function controls() {
    const t=w();
    document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';
    document.title=`${t.title} · Interactive Map`;
    for(const [id,text] of Object.entries({title:t.title,subtitle:t.subtitle,'total-label':t.total,'nav-map':t.map,'static-map':t.static,'catalog-link':t.catalog,'kind-label':t.kind,'representatives-label':t.representatives,reset:t.reset,'filter-hint':t.hint,'map-heading':t.heading,expand:t.expand,collapse:t.collapse,'time-direction':t.direction,'time-note':t.note,'footer-note':t.footer,reference:t.reference})) $(id).textContent=text;
    $('total').textContent=data.papers.length;
    $('language').textContent=state.lang==='zh'?'EN':'中文';
    $('language').setAttribute('aria-label',state.lang==='zh'?'Switch to English':'切换到中文');
    $('theme').setAttribute('aria-label',t.theme);
    $('close-detail').setAttribute('aria-label',t.close);
    $('static-map').href=`mindmap${state.lang==='zh'?'_cn':''}.svg`;
    $('catalog-link').href=`${data.repository}/blob/main/catalog/README${state.lang==='zh'?'_cn':''}.md`;
    $('search').placeholder=t.search; $('search').setAttribute('aria-label',t.search);
    $('kind').setAttribute('aria-label',t.kind);
    $('filter-panel').setAttribute('aria-label',state.lang==='zh'?'筛选论文':'Filter papers');
    $('topics').setAttribute('aria-label',state.lang==='zh'?'主题筛选':'Topic filters');
    $('kind').innerHTML=`<option value="">${t.allKinds}</option>`+Object.entries(t.kindNames).map(([key,name])=>`<option value="${key}" ${state.kind===key?'selected':''}>${name}</option>`).join('');
    $('range-buttons').innerHTML=Object.entries(t.range).map(([key,name])=>`<button type="button" data-range="${key}" aria-pressed="${state.range===key}">${name}</button>`).join('');
    $('range-buttons').setAttribute('aria-label',t.date);
    $('timeline').setAttribute('aria-label',t.heading);
  }
  function topics() {
    $('topics').innerHTML=Object.entries(data.topics).map(([slug,topic])=>{
      const count=M.filterPapers(data,{...state,topics:[slug]}).length;
      return `<button type="button" class="topic" data-topic="${e(slug)}" aria-pressed="${state.topics.includes(slug)}">${e(localized(topic))}<span>${count}</span></button>`;
    }).join('');
  }
  function chip(p) {
    const tags=(p.display_tags||[]).map(tag=>`<span>${e(localized(tag))}</span>`).join('');
    return `<article class="paper" data-kind="${e(p.kind)}"><a class="paper-name" href="${e(p.links.paper)}" target="_blank" rel="noopener noreferrer">${e(p.short_name)} ↗</a><span class="paper-tags">${tags}</span><span class="paper-meta"><span>${e(w().kindNames[p.kind])}</span><span>${e(p.venue)}</span></span><button class="paper-details" type="button" data-paper="${e(p.id)}" aria-label="${e(p.short_name)}：${e(w().details)}">${e(w().details)}</button></article>`;
  }
  function render() {
    const t=w(), matches=M.filterPapers(data,state);
    topics();
    $('result-count').textContent=t.result(matches.length,data.papers.length);
    const sx=$('timeline').scrollLeft, sy=$('timeline').scrollTop;
    if(!matches.length) {
      $('timeline').innerHTML=`<div class="empty"><strong>${data.papers.length?t.noResults:t.empty}</strong>${data.papers.length?t.noResultsHint:''}</div>`;
      if($('detail').open) $('detail').close();
      return;
    }
    const window=M.bounds(data.papers,state.range);
    const cols=M.columns(data.papers.filter(p=>M.inWindow(p,window)),years,newest);
    const tree=M.buildTree(data.taxonomy,matches), rows=[];
    const filtered=!!(state.query||state.topics.length||state.kind||state.representatives);
    const visit=(nodes,depth=0)=>nodes.forEach(n=>{
      if(filtered&&!n.papers.length)return;
      const expanded=n.children.length>0&&open.has(n.key);
      rows.push({n,depth,expanded});
      if(expanded)visit(n.children,depth+1);
    });
    visit(tree);
    let html=`<div class="grid" style="--columns:${cols.length}"><div class="corner">${t.category}<span>${t.date}</span></div>`;
    cols.forEach(c=>{
      const name=c.type==='month'?`${c.key.slice(0,4)} / ${c.key.slice(5,7)}`:c.type==='unknown'?`${c.year} · ${t.unknown}`:c.year;
      const yearButton=c.type==='year'?`<button type="button" data-year="${c.year}">${t.expandYear} ▸</button>`:years.has(c.year)?`<button type="button" data-year="${c.year}">${t.foldYear}</button>`:'';
      html+=`<div class="month"><strong>${e(name)}</strong>${yearButton}</div>`;
    });
    rows.forEach(({n,depth,expanded})=>{
      const label=`<span class="caret" aria-hidden="true">${n.children.length?(expanded?'▾':'▸'):'·'}</span><span class="name">${e(nodeName(n))}</span><span class="count">${n.papers.length}</span>`;
      html+=`<div class="row-label ${n.children.length?'group-label':''}" style="--depth:${depth}">${n.children.length?`<button type="button" data-node="${n.key}" aria-expanded="${expanded}">${label}</button>`:`<div style="display:flex;gap:7px;width:100%">${label}</div>`}</div>`;
      const ordered=[...n.papers].sort((a,b)=>M.stamp(b).localeCompare(M.stamp(a))||a.short_name.localeCompare(b.short_name));
      cols.forEach(c=>{
        if(expanded){html+='<div class="cell group-cell"></div>';return;}
        const cell=ordered.filter(p=>M.columnFor(p,cols)===c.key);
        html+=`<div class="cell ${cell.length?'':'empty-cell'}">${cell.length?cell.map(chip).join(''):'—'}</div>`;
      });
    });
    $('timeline').innerHTML=html+'</div>';
    $('timeline').scrollLeft=sx; $('timeline').scrollTop=sy;
    if(selected&&$('detail').open){if(matches.some(p=>p.id===selected))showDetail(selected);else $('detail').close();}
  }
  function showDetail(id) {
    const p=data.papers.find(p=>p.id===id); if(!p)return;
    selected=id;
    const t=w(), path=(categoryPaths[p.category]||[]).map(nodeName).join(' → ');
    const summary=p.benchmark?Object.entries(t.facts).map(([key,label])=>`<div class="fact"><strong>${label}</strong><p>${M.formatText(localized(p.benchmark[key]))}</p></div>`).join(''):`<p>${M.formatText(localized(p.tldr))}</p>`;
    const resource=(label,url)=>`<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a>`;
    const links=Object.entries(p.links).map(([key,url])=>resource(t.links[key]||key,url));
    links.push(resource(t.entry,p.catalog_urls[state.lang]));
    if(p.notes_urls?.[state.lang])links.push(resource(t.notes,p.notes_urls[state.lang]));
    $('detail-content').innerHTML=`<div class="detail-path">${e(path)}</div><div class="detail-name">${e(p.short_name)} · ${e(t.kindNames[p.kind])}</div><h2 class="detail-title" id="detail-title">${resource(p.title,p.links.paper)}</h2><div class="detail-authors">${e(p.authors)}</div><div class="detail-links">${links.join('')}</div><div class="detail-tags">${(p.display_tags||[]).map(tag=>`<span>${e(localized(tag))}</span>`).join('')}</div><div class="detail-provenance">${e(p.venue)} · ${e(p.publication_date.value)}<br>${e(t.basis[p.publication_date.basis])}${p.publication_date.source?' · '+resource(t.source,p.publication_date.source):''}</div><section class="detail-block"><h3>${t.summary}</h3>${summary}</section>${p.evaluation_scope?`<section class="detail-block"><h3>${t.scope}</h3><p>${M.formatText(localized(p.evaluation_scope))}</p></section>`:''}<div class="detail-tags">${p.tags.map(tag=>`<span>${e(tag)}</span>`).join('')}</div><div class="detail-provenance">${t.verified}: ${e(p.verified_on)} · ${e(t.statuses[p.reading_status])}<br>${e(p.id)}</div>`;
    if(!$('detail').open) $('detail').showModal();
  }
  $('search').addEventListener('input',event=>{state.query=event.target.value;render();});
  $('kind').addEventListener('change',event=>{state.kind=event.target.value;render();});
  $('representatives').addEventListener('change',event=>{state.representatives=event.target.checked;render();});
  $('range-buttons').addEventListener('click',event=>{const button=event.target.closest('[data-range]');if(button){state.range=button.dataset.range;controls();render();$('range-buttons').querySelector(`[data-range="${state.range}"]`).focus();}});
  $('topics').addEventListener('click',event=>{const button=event.target.closest('[data-topic]');if(button){const tag=button.dataset.topic;state.topics=state.topics.includes(tag)?state.topics.filter(x=>x!==tag):[...state.topics,tag];render();$('topics').querySelector(`[data-topic="${tag}"]`).focus();}});
  $('reset').addEventListener('click',()=>{Object.assign(state,{query:'',topics:[],kind:'',range:'all',representatives:false});$('search').value='';$('representatives').checked=false;controls();render();});
  $('expand').addEventListener('click',()=>{walk(treeAll,n=>{if(n.children.length)open.add(n.key);});render();});
  $('collapse').addEventListener('click',()=>{open.clear();render();});
  $('timeline').addEventListener('click',event=>{
    const paper=event.target.closest('[data-paper]'),node=event.target.closest('[data-node]'),year=event.target.closest('[data-year]');
    if(paper)showDetail(paper.dataset.paper);
    else if(node){const key=node.dataset.node;open.has(key)?open.delete(key):open.add(key);render();$('timeline').querySelector(`[data-node="${key}"]`)?.focus({preventScroll:true});}
    else if(year){const key=year.dataset.year;years.has(key)?years.delete(key):years.add(key);render();}
  });
  $('close-detail').addEventListener('click',()=>$('detail').close());
  $('detail').addEventListener('click',event=>{if(event.target===$('detail')){const box=$('detail').getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)$('detail').close();}});
  $('detail').addEventListener('close',()=>{selected=null;});
  $('language').addEventListener('click',()=>{state.lang=state.lang==='zh'?'en':'zh';save('research-map-lang',state.lang);controls();render();});
  $('theme').addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';save('research-map-theme',theme);setTheme();});
  setTheme();controls();render();
})();
