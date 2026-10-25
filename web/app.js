/* Shared controller for the generated map schema v1. */
(() => {
  'use strict';
  const M=window.MapCore, data=window.RESEARCH_MAP, $=id=>document.getElementById(id);
  if(!M || !data || data.schema_version!==1){$('timeline').textContent='地图数据未加载 / Map data unavailable';return;}
  const read=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch(_){return fallback;}};
  const save=(key,value)=>{try{localStorage.setItem(key,value);}catch(_){} };
  const defaults={lang:read('research-map-lang','zh')==='en'?'en':'zh',view:matchMedia('(max-width:760px)').matches?'list':'map'};
  let state=M.readState(location.search,data,defaults), theme=read('research-map-theme','light'), limit=30, matches=[], lastDetailTrigger=null;
  const open=M.expandedCategories(data.taxonomy,state.category), years=new Set(), cells=new Set(), index=M.categoryIndex(data.taxonomy), e=M.escape;
  const newest=data.papers.map(M.stamp).sort().at(-1)||'';
  const treeAll=M.buildTree(data.taxonomy,data.papers);
  const walk=(nodes,fn,depth=0)=>nodes.forEach(n=>{fn(n,depth);walk(n.children,fn,depth+1);});
  const words = {
    zh:{title:'具身动作模型',subtitle:'沿时间探索研究方向，从论文看见方法。',total:'篇已收录工作',map:'交互地图',static:'静态导图 ↗',catalog:'论文目录 ↗',search:'搜索论文、方法、作者…',kind:'成果类型',allKinds:'全部类型',range:{6:'近半年',12:'近一年',all:'全部'},representatives:'仅代表作',reset:'重置',hint:'多个主题取交集；时间以全库最新论文为参照。',heading:'分类 × 时间',result:(n,total)=>`${n} / ${total} 篇工作`,expand:'展开分类',collapse:'收起分类',direction:'最新 ← 更早',category:'研究方向',date:'公开时间',unknown:'月份未注明',expandYear:'展开',foldYear:'收起年份',noResults:'没有匹配的论文',noResultsHint:'尝试减少筛选条件，或重置后浏览全部工作。',empty:'尚未收录论文',footer:'与分类目录、思维导图使用同一份论文记录。',reference:'布局参考 ↗',note:'按已知公开时间排列；编号推导的 arXiv 月份与已核验日期分别标注，未注明月份的工作单独列出。',summary:'方法与贡献',scope:'评测范围',resources:'资源',entry:'分类记录',notes:'阅读笔记',verified:'内容核验',source:'时间依据',basis:{'arxiv-id-month':'arXiv 月份（编号推导，未核实更早公开时间）',source:'公开日期（来源记录）','year-only':'仅记录年份，月份未知'},kindNames:{model:'模型',benchmark:'评测基准',dataset:'数据集',tool:'工具',survey:'综述'},facts:{hands:'手型',tasks:'任务',cross_hand:'同任务跨手',release:'开放情况',highlight:'核心特点'},links:{paper:'论文',project:'项目',code:'代码',data:'数据',assets:'资产',hand_catalog:'手型清单'},details:'简介与资源',close:'关闭详情',theme:'切换深浅主题',statuses:{indexed:'已收录',skimmed:'初读',read:'已读',reproduced:'已复现'}},
    en:{title:'Embodied Action Models',subtitle:'Explore research through time. Discover the methods behind each paper.',total:'indexed works',map:'Interactive map',static:'Mind map ↗',catalog:'Paper catalog ↗',search:'Search papers, methods, authors…',kind:'Type',allKinds:'All types',range:{6:'6 months',12:'1 year',all:'All'},representatives:'Representatives only',reset:'Reset',hint:'Selected topics intersect. Time ranges are anchored to the newest work in the full collection.',heading:'Category × time',result:(n,total)=>`${n} / ${total} works`,expand:'Expand categories',collapse:'Collapse categories',direction:'Newer ← Older',category:'Research direction',date:'Public release',unknown:'Month unknown',expandYear:'Expand',foldYear:'Fold year',noResults:'No matching papers',noResultsHint:'Try fewer filters, or reset to explore the collection.',empty:'No papers indexed yet',footer:'One canonical collection for the catalog, mind map and interactive view.',reference:'Layout reference ↗',note:'Ordered by known release time. Identifier-derived arXiv months are labeled separately from source-verified dates; unknown months have their own columns.',summary:'Method and contribution',scope:'Evaluation scope',resources:'Resources',entry:'Catalog record',notes:'Reading notes',verified:'Facts checked',source:'Date source',basis:{'arxiv-id-month':'arXiv month (from identifier; earlier releases not checked)',source:'Public release date (source record)','year-only':'Year only; month unknown'},kindNames:{model:'Model',benchmark:'Benchmark',dataset:'Dataset',tool:'Tool',survey:'Survey'},facts:{hands:'Hands',tasks:'Tasks',cross_hand:'Same-task cross-hand reuse',release:'Release status',highlight:'Key distinction'},links:{paper:'Paper',project:'Project',code:'Code',data:'Data',assets:'Assets',hand_catalog:'Hand catalog'},details:'Summary & resources',close:'Close details',theme:'Toggle light/dark theme',statuses:{indexed:'Indexed',skimmed:'Initial reading',read:'Read',reproduced:'Reproduced'}}
  };
  Object.assign(words.zh,{list:'论文列表',mapView:'分类地图',allCategories:'全部研究分类',sort:'排序',sorts:{newest:'最新优先',oldest:'最早优先',name:'名称'},overview:'返回总览',focus:'聚焦此分类',share:'分享当前视图',sharePaper:'分享这篇',copied:'链接已复制',shareTitle:'分享链接',shareHelp:'复制下方链接；本地预览地址仅可在本机打开。',newer:'← 更新',earlier:'更早 →',more:n=>`还有 ${n} 篇`,less:'收起',loadMore:n=>`继续显示（剩余 ${n} 篇）`,previous:'← 上一篇',next:'下一篇 →',locate:'查看所在分类',outside:'这篇论文不在当前筛选结果中，仍可阅读完整详情。',invalid:'原链接的分类已变化，已返回全部分类。',noCategoryMatch:'当前条件无匹配',clear:'清除',close:'关闭',exported:n=>`已导出 ${n} 篇工作`,countHint:'匹配 / 全库',previewHint:'每格预览三篇，点击“还有 N 篇”展开。',showing:n=>`已显示 ${n} 篇`});
  Object.assign(words.en,{list:'Paper list',mapView:'Category map',allCategories:'All research categories',sort:'Sort',sorts:{newest:'Newest',oldest:'Oldest',name:'Name'},overview:'Overview',focus:'Focus category',share:'Share view',sharePaper:'Share paper',copied:'Link copied',shareTitle:'Share link',shareHelp:'Copy the link below. Local preview addresses only work on this computer.',newer:'← Newer',earlier:'Older →',more:n=>`${n} more papers`,less:'Show less',loadMore:n=>`Load more (${n} remaining)`,previous:'← Previous',next:'Next →',locate:'View category',outside:'This paper is outside the current filters. Its full details remain available.',invalid:'The linked category has changed. Showing all categories.',noCategoryMatch:'No matches under current filters',clear:'Clear',close:'Close',exported:n=>`Exported ${n} works`,countHint:'Matched / total',previewHint:'Three papers per cell; expand to see all.',showing:n=>`${n} papers shown`});
  const w=()=>words[state.lang], local=obj=>obj?.[state.lang]||obj?.zh||obj?.en||'', name=n=>state.lang==='zh'?n.name_zh:n.name;
  const cat=key=>index.find(n=>n.key===key), path=code=>(cat(code)?.path||[]).map(name).join(' → ');
  const resource=(label,url)=>`<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(label)} ↗</a>`;
  const palette=['#347d82','#a65c3d','#7656a0','#4772a0','#8e7428','#3e7b52'];
  const rootColors=new Map([...treeAll].sort((a,b)=>a.key.localeCompare(b.key)).map((n,i)=>[n.key,palette[i%palette.length]]));
  const color=key=>rootColors.get(key)||palette[[...key].reduce((h,c)=>(h*31+c.charCodeAt(0))>>>0,0)%palette.length];
  function remember(mode='push'){
    try{history[mode==='replace'?'replaceState':'pushState']({open:[...open],years:[...years]},'',M.stateQuery(state));}catch(_){}
  }
  function change(patch,mode='push'){
    if(patch.paper && !state.paper)lastDetailTrigger=focusToken();
    Object.assign(state,patch);if(!Object.hasOwn(patch,'paper'))state.paper='';
    if(Object.hasOwn(patch,'category')){open.clear();M.expandedCategories(data.taxonomy,state.category).forEach(k=>open.add(k));state.invalidCategory=false;}
    if(!Object.hasOwn(patch,'paper')){limit=30;cells.clear();}
    remember(mode);render();
  }
  function focusToken(){const a=document.activeElement;return a?.dataset.focus || a?.id || '';}
  function restoreFocus(token){
    if(!token)return;
    const scope=$('detail').open?$('detail'):document;
    const target=[...scope.querySelectorAll('[id],[data-focus]')].find(x=>(x.id===token||x.dataset.focus===token)&&x.getClientRects().length&&!x.closest('[hidden]'));
    target?.focus({preventScroll:true});
  }
  function controls(){
    const t=w();document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';document.title=`${t.title} · Interactive Map`;
    document.documentElement.dataset.theme=theme==='dark'?'dark':'light';
    const labels={title:t.title,subtitle:t.subtitle,'total-label':t.total,'nav-map':t.map,'static-map':t.static,'catalog-link':t.catalog,
      'category-label':t.category,'kind-label':t.kind,'representatives-label':t.representatives,reset:t.reset,'filter-hint':t.hint,
      expand:t.expand,collapse:t.collapse,'time-direction':t.direction,'time-note':t.note,'footer-note':t.footer,reference:t.reference,
      'view-map':t.mapView,'view-list':t.list,'sort-label':t.sort,share:t.share,overview:t.overview,newer:t.newer,earlier:t.earlier,
      'share-title':t.shareTitle,'share-help':t.shareHelp,'close-share':t.close};
    for(const [id,text]of Object.entries(labels))$(id).textContent=text;
    $('total').textContent=data.papers.length;$('language').textContent=state.lang==='zh'?'EN':'中文';
    $('language').setAttribute('aria-label',state.lang==='zh'?'Switch to English':'切换到中文');
    $('theme').setAttribute('aria-label',t.theme);$('close-detail').setAttribute('aria-label',t.close);
    $('static-map').href=`mindmap${state.lang==='zh'?'_cn':''}.svg`;
    $('catalog-link').href=`${data.repository}/blob/main/catalog/README${state.lang==='zh'?'_cn':''}.md`;
    $('search').placeholder=t.search;$('search').setAttribute('aria-label',t.search);
    if($('search').value!==state.query)$('search').value=state.query;
    $('representatives').checked=state.representatives;
    $('kind').innerHTML=`<option value="">${t.allKinds}</option>`+Object.entries(t.kindNames).map(([key,label])=>`<option value="${key}">${label}</option>`).join('');$('kind').value=state.kind;
    $('sort').innerHTML=Object.entries(t.sorts).map(([key,label])=>`<option value="${key}">${label}</option>`).join('');$('sort').value=state.sort;
    const unscoped=M.filterPapers(data,{...state,category:''});
    $('category').innerHTML=`<option value="">${t.allCategories}</option>`+index.map(n=>{
      const total=data.papers.filter(p=>n.codes.includes(p.category)).length, count=unscoped.filter(p=>n.codes.includes(p.category)).length;
      return `<option value="${e(n.key)}">${'　'.repeat(n.depth)}${e(name(n))} (${count}/${total})</option>`;
    }).join('');$('category').value=state.category;
    $('category').setAttribute('aria-label',t.category);$('kind').setAttribute('aria-label',t.kind);$('sort').setAttribute('aria-label',t.sort);
    $('range-buttons').innerHTML=Object.entries(t.range).map(([key,label])=>`<button data-range="${key}" data-focus="range-${key}" aria-pressed="${state.range===key}">${label}</button>`).join('');
    $('topics').innerHTML=Object.entries(data.topics).map(([key,topic])=>`<button class="topic" data-topic="${e(key)}" data-focus="topic-${e(key)}" aria-pressed="${state.topics.includes(key)}">${e(local(topic))}<span>${M.filterPapers(data,{...state,topics:[key]}).length}</span></button>`).join('');
    for(const v of ['map','list'])$('view-'+v).setAttribute('aria-pressed',state.view===v);
    $('map-controls').hidden=state.view!=='map';$('timeline').hidden=state.view!=='map';$('paper-list').hidden=state.view!=='list';
    $('sort').disabled=state.view==='map';
    const focused=cat(state.category);$('map-heading').textContent=focused?path(focused.code)||focused.path.map(name).join(' → '):state.view==='map'?t.heading:t.list;
    $('category-description').textContent=focused?(state.lang==='zh'?focused.description_zh:focused.description)||'':state.view==='map'?t.previewHint:'';
    $('overview').hidden=!state.category;
    $('state-notice').hidden=!state.invalidCategory;$('state-notice').textContent=t.invalid;
    const chips=[];
    const add=(key,label)=>chips.push(`<button data-clear="${e(key)}" data-focus="clear-${e(key)}" aria-label="${t.clear}: ${e(label)}">${e(label)} ×</button>`);
    if(state.category)add('category',name(focused));if(state.query)add('query',state.query);
    if(state.kind)add('kind',t.kindNames[state.kind]);
    state.topics.forEach(k=>add('topic:'+k,local(data.topics[k])));if(state.representatives)add('representatives',t.representatives);
    $('active-filters').innerHTML=chips.join('');
  }
  function tags(p){return (p.display_tags||[]).map(tag=>`<span>${e(local(tag))}</span>`).join('');}
  function chip(p){return `<article class="paper"><div class="paper-top"><a class="paper-name" href="${e(p.links.paper)}" target="_blank" rel="noopener noreferrer">${e(p.short_name)} ↗</a><button class="paper-details" data-paper="${e(p.slug)}" data-focus="paper-${e(p.slug)}" aria-label="${e(p.short_name)}: ${w().details}">ⓘ</button></div><div class="paper-tags">${tags(p)}</div></article>`;}
  function emptyHtml(){
    const focused=cat(state.category), total=focused?data.papers.filter(p=>focused.codes.includes(p.category)).length:data.papers.length;
    return `<div class="empty"><strong>${total?w().noResults:w().empty}</strong><p>${total?w().noResultsHint:''}</p><button data-reset>${w().reset}</button></div>`;
  }
  function mapView(){
    const t=w(), sx=$('timeline').scrollLeft,sy=$('timeline').scrollTop;
    if(!matches.length && (state.category||state.query||state.topics.length||state.kind||state.representatives)){$('timeline').innerHTML=emptyHtml();return;}
    const cols=M.columns(data.papers.filter(p=>M.inWindow(p,M.bounds(data.papers,state.range))),years,newest);
    if(!cols.length){$('timeline').innerHTML=emptyHtml();return;}
    const tree=M.buildTree(data.taxonomy,matches),rows=[];
    let focusedNode=null;walk(tree,n=>{if(n.key===state.category)focusedNode=n;});
    const visit=(nodes,depth=0,branch='')=>nodes.forEach(n=>{
      const expanded=n.children.length>0&&open.has(n.key), branchKey=depth===0?n.key:branch;
      rows.push({n,depth,expanded,branchKey});if(expanded)visit(n.children,depth+1,branchKey);
    });visit(focusedNode?[focusedNode]:tree);
    let html=`<div class="grid" style="--columns:${cols.length}"><div class="corner">${t.category}<small>${t.countHint}</small></div>`;
    for(const c of cols){
      const label=c.type==='month'?c.key.replace('-',' / '):c.type==='unknown'?`${c.year} · ${t.unknown}`:c.year;
      html+=`<div class="month"><strong>${e(label)}</strong>${c.type==='year'||years.has(c.year)?`<button data-year="${c.year}" data-focus="year-${c.key}">${c.type==='year'?t.expandYear:t.foldYear}</button>`:''}</div>`;
    }
    for(const {n,depth,expanded,branchKey}of rows){
      const total=data.papers.filter(p=>n.codes.includes(p.category)).length, tint=color(branchKey);
      const desc=(state.lang==='zh'?n.description_zh:n.description)||'';
      html+=`<div class="row-label ${expanded?'expanded-label':''}" style="--depth:${depth};--branch:${tint}"><div class="row-heading">${n.children.length?`<button class="node-name" data-node="${e(n.key)}" data-focus="node-${e(n.key)}" aria-expanded="${expanded}"><span class="caret">${expanded?'▾':'▸'}</span>${e(name(n))}</button>`:`<span class="node-name">${e(name(n))}</span>`}<span class="count" title="${t.countHint}">${n.papers.length}/${total}</span></div><div class="row-tools"><button data-category="${e(n.key)}" data-focus="focus-${e(n.key)}">${t.focus}</button>${desc?`<details><summary>${state.lang==='zh'?'说明':'About'}</summary><p>${e(desc)}</p></details>`:''}</div>${!total?`<small>${t.empty}</small>`:!n.papers.length?`<small>${t.noCategoryMatch}</small>`:''}</div>`;
      const ordered=M.sortPapers(n.papers);
      for(const c of cols){
        if(expanded){html+='<div class="cell group-cell"></div>';continue;}
        const ps=ordered.filter(p=>M.columnFor(p,cols)===c.key),cellKey=n.key+'|'+c.key,full=cells.has(cellKey),preview=M.preview(ps,full);
        html+=`<div class="cell ${ps.length?'':'empty-cell'}" style="--branch:${tint}">${preview.shown.map(chip).join('')}${ps.length>3?`<button class="more" data-cell="${e(cellKey)}" data-focus="cell-${e(cellKey)}" aria-expanded="${full}">${full?t.less:t.more(preview.remaining)}</button>`:''}</div>`;
      }
    }
    $('timeline').innerHTML=html+'</div>';$('timeline').scrollLeft=sx;$('timeline').scrollTop=sy;
    timeButtons();
  }
  function listView(){
    $('paper-list').innerHTML=matches.length?matches.slice(0,limit).map(p=>{
      const summary=p.benchmark?local(p.benchmark.highlight):local(p.tldr);
      return `<article class="list-paper"><div class="list-path">${e(path(p.category))}</div><div class="list-title"><a href="${e(p.links.paper)}" target="_blank" rel="noopener noreferrer">${e(p.short_name)} ↗</a><span>${e(M.stamp(p))} · ${e(w().kindNames[p.kind])}</span></div><div class="paper-tags">${tags(p)}</div><p>${M.formatText(summary)}</p><button data-paper="${e(p.slug)}" data-focus="paper-${e(p.slug)}">${w().details}</button></article>`;
    }).join(''):emptyHtml();
    $('load-more').hidden=state.view!=='list'||limit>=matches.length;$('load-more').textContent=w().loadMore(Math.max(0,matches.length-limit));
  }
  function timeButtons(){const el=$('timeline');$('newer').disabled=el.scrollLeft<=1;$('earlier').disabled=el.scrollLeft+el.clientWidth>=el.scrollWidth-2;}
  function render(){
    const focus=focusToken();matches=M.sortPapers(M.filterPapers(data,state),state.view==='map'?'newest':state.sort);
    controls();$('result-count').textContent=w().result(matches.length,data.papers.length);
    if(state.view==='map'){mapView();$('load-more').hidden=true;}else listView();
    for(const button of document.querySelectorAll('[data-export]'))button.disabled=!matches.length;
    renderDetail();restoreFocus(focus);
  }
  function renderDetail(){
    const p=data.papers.find(p=>p.slug===state.paper), dialog=$('detail');
    if(!p){if(dialog.open)dialog.close();return;}
    const t=w(),position=matches.findIndex(x=>x.slug===p.slug);
    const facts=p.benchmark?Object.entries(t.facts).map(([k,label])=>`<div class="fact"><strong>${label}</strong><p>${M.formatText(local(p.benchmark[k]))}</p></div>`).join(''):`<p>${M.formatText(local(p.tldr))}</p>`;
    const links=Object.entries(p.links).map(([k,url])=>resource(t.links[k]||k,url));links.push(resource(t.entry,p.catalog_urls[state.lang]));
    if(p.notes_urls?.[state.lang])links.push(resource(t.notes,p.notes_urls[state.lang]));
    $('detail-content').innerHTML=`<p class="detail-path">${e(path(p.category))}</p><div class="detail-name">${e(p.short_name)} · ${e(t.kindNames[p.kind])}</div><h2 id="detail-title" class="detail-title">${resource(p.title,p.links.paper)}</h2><p class="detail-authors">${e(p.authors)}</p><div class="detail-links">${links.join('')}</div><div class="detail-tags">${tags(p)}</div>${position<0?`<p class="notice">${t.outside}</p>`:''}<div class="detail-provenance">${e(p.venue)} · ${e(M.stamp(p))}<br>${e(t.basis[p.publication_date.basis])}${p.publication_date.source?' · '+resource(t.source,p.publication_date.source):''}</div><section class="detail-block"><h3>${t.summary}</h3>${facts}</section>${p.evaluation_scope?`<section class="detail-block"><h3>${t.scope}</h3><p>${M.formatText(local(p.evaluation_scope))}</p></section>`:''}<div class="detail-tags">${p.tags.map(tag=>`<span>${e(tag)}</span>`).join('')}</div><div class="detail-provenance">${t.verified}: ${e(p.verified_on)} · ${e(t.statuses[p.reading_status])}</div><div class="detail-toolbar"><button id="previous-paper" ${position<=0?'disabled':''}>${t.previous}</button><span>${position<0?'—':`${position+1} / ${matches.length}`}</span><button id="next-paper" ${position<0||position===matches.length-1?'disabled':''}>${t.next}</button></div><div class="detail-toolbar"><button data-category="${e(p.category)}">${t.locate}</button><button id="share-paper">${t.sharePaper}</button></div>`;
    if(!dialog.open)dialog.showModal();
  }
  function closeDetail(){change({paper:''});restoreFocus(lastDetailTrigger);}
  let toastTimer;
  function toast(text){$('toast').textContent=text;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').textContent='',3500);}
  async function share(){
    const url=new URL(location.href);url.search=M.stateQuery(state);url.hash='';
    try{await navigator.clipboard.writeText(url.href);toast(w().copied);}catch(_){$('share-value').value=url.href;$('share-dialog').showModal();$('share-value').focus();$('share-value').select();}
  }
  function download(format){
    const exportState={...state,sort:state.view==='map'?'newest':state.sort};
    const content=M.exportResults(data,exportState,format),blob=new Blob([format==='csv'?'\uFEFF':'',content],{type:format==='csv'?'text/csv;charset=utf-8':'application/json;charset=utf-8'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`research-map-${matches.length}.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(w().exported(matches.length));
  }
  function reset(){open.clear();years.clear();change({query:'',topics:[],category:'',kind:'',range:'all',representatives:false,invalidCategory:false});}
  $('search').addEventListener('input',event=>change({query:event.target.value},'replace'));
  $('category').addEventListener('change',event=>change({category:event.target.value}));
  $('kind').addEventListener('change',event=>change({kind:event.target.value}));
  $('sort').addEventListener('change',event=>change({sort:event.target.value}));
  $('representatives').addEventListener('change',event=>change({representatives:event.target.checked}));
  document.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||b.disabled)return;
    const d=b.dataset;
    if(d.view)change({view:d.view});
    else if(d.range)change({range:d.range});
    else if(d.topic)change({topics:state.topics.includes(d.topic)?state.topics.filter(x=>x!==d.topic):[...state.topics,d.topic]});
    else if(d.category)change({category:d.category});
    else if(d.node){open.has(d.node)?open.delete(d.node):open.add(d.node);remember('replace');render();}
    else if(d.cell){cells.has(d.cell)?cells.delete(d.cell):cells.add(d.cell);render();}
    else if(d.year){years.has(d.year)?years.delete(d.year):years.add(d.year);remember('replace');render();}
    else if(d.paper)change({paper:d.paper});
    else if(d.export)download(d.export);
    else if(d.clear){
      const key=d.clear;if(key.startsWith('topic:'))change({topics:state.topics.filter(x=>x!==key.slice(6))});
      else change({[key]:key==='range'?'all':key==='representatives'?false:''});
      if(!document.activeElement || document.activeElement===document.body)$('search').focus();
    }else if('reset' in d)reset();
    else switch(b.id){
      case 'reset':reset();break;
      case 'overview':change({category:''});break;
      case 'expand':M.expandedCategories(data.taxonomy,state.category).forEach(k=>open.add(k));remember('replace');render();break;
      case 'collapse':open.clear();cells.clear();remember('replace');render();break;
      case 'newer':case 'earlier':$('timeline').scrollBy({left:(b.id==='newer'?-1:1)*Math.max(200,$('timeline').clientWidth-300),behavior:'smooth'});break;
      case 'load-more':limit+=30;listView();break;
      case 'share':case 'share-paper':share();break;
      case 'close-share':$('share-dialog').close();break;
      case 'close-detail':closeDetail();break;
      case 'previous-paper':case 'next-paper':{const pos=matches.findIndex(p=>p.slug===state.paper),next=matches[pos+(b.id==='previous-paper'?-1:1)];if(next)change({paper:next.slug});break;}
      case 'language':state.lang=state.lang==='zh'?'en':'zh';save('research-map-lang',state.lang);remember('replace');render();break;
      case 'theme':theme=theme==='dark'?'light':'dark';save('research-map-theme',theme);document.documentElement.dataset.theme=theme;break;
    }
  });
  $('detail').addEventListener('cancel',event=>{event.preventDefault();closeDetail();});
  $('detail').addEventListener('click',event=>{if(event.target===$('detail')){const r=$('detail').getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDetail();}});
  $('timeline').addEventListener('scroll',timeButtons,{passive:true});window.addEventListener('resize',timeButtons);
  window.addEventListener('popstate',event=>{state=M.readState(location.search,data,defaults);open.clear();years.clear();cells.clear();limit=30;M.expandedCategories(data.taxonomy,state.category,event.state?.open).forEach(k=>open.add(k));(event.state?.years||[]).forEach(y=>years.add(y));render();});
  render();remember('replace');
})();
