/* Pure, scoped mind-map model and card layout; no second research data source. */
(function (root) {
  'use strict';
  const M=typeof module!=='undefined'&&module.exports?require('./map-core.js'):root.MapCore;
  function model(data,state={}) {
    const matches=M.filterPapers(data,state), index=M.categoryIndex(data.taxonomy);
    const totals=new Map();
    function count(nodes){for(const n of nodes){totals.set(n.key,n.papers.length);count(n.children);}}
    count(M.buildTree(data.taxonomy,data.papers));
    const convert=n=>({type:'category',key:n.key,code:n.code,name:n.name||n.code,name_zh:n.name_zh||n.name||n.code,
      matched:n.papers.length,total:totals.get(n.key)||0,
      children:[...n.children.map(convert),...(n.code?M.sortPapers(n.papers,state.sort).map(p=>({type:'paper',key:'paper:'+p.slug,paper:p,children:[]})):[])]});
    const overview={type:'category',key:'',name:data.taxonomy.title||'Research Map',name_zh:data.taxonomy.title_zh||data.taxonomy.title||'Research Map',
      matched:matches.length,total:data.papers.length,children:M.buildTree(data.taxonomy,matches).map(convert)};
    let selected=overview;
    function find(n){if(n.key===state.category)selected=n;for(const c of n.children)if(c.type==='category')find(c);}
    if(state.category)find(overview);
    const focus=index.find(n=>n.key===state.category);
    return {root:selected,breadcrumbs:[overview,...(focus?.path||[])],parentKey:focus?.path.at(-2)?.key||'',matched:selected.matched,total:selected.total};
  }
  const textWidth=(text,size)=>[...text].reduce((w,c)=>w+size*(c.codePointAt(0)>255?1.03:.64),0);
  function wrap(runs,width,size){
    const lines=[[]];let used=0;
    function append(text,bold){
      if(!used&&/^\s+$/.test(text))return;
      const w=textWidth(text,size);
      if(used&&used+w>width){lines.push([]);used=0;if(/^\s+$/.test(text))return;}
      const line=lines.at(-1),last=line.at(-1);
      if(last&&last.bold===bold)last.text+=text;else line.push({text,bold});
      used+=w;
    }
    for(const run of runs)for(const token of run.text.match(/\s+|[\u2e80-\uffff]|[^\s\u2e80-\uffff]+/gu)||[]){
      if(textWidth(token,size)>width)for(const char of token)append(char,!!run.bold);else append(token,!!run.bold);
    }
    return lines.filter(line=>line.length);
  }
  function layout(root,{lang='zh'}={}) {
    const nodes=[],edges=[],sizes=new Map(),labels=new Map(),gap=4,pad=10,columnGap=16;
    const local=n=>lang==='zh'?(n.name_zh||n.name||n.code||'研究地图'):(n.name||n.code||'Research Map');
    function label(n){
      const paper=n.type==='paper',title=paper?n.paper.short_name:local(n);
      const tags=paper?(n.paper.display_tags||[]).flatMap((t,i)=>[...(i?[{text:' · ',bold:false}]:[]),{text:t[lang]||t.en||t.zh||'',bold:t.bold===true}]):[];
      const count=!paper&&Number.isFinite(n.total)?`${n.matched} / ${n.total}${n.total===0?(lang==='zh'?' · 尚未收录':' · No papers yet'):''}`:'';
      const maxWidth=paper?330:180,minWidth=paper?60:48;
      const width=Math.ceil(Math.max(minWidth,Math.min(maxWidth,Math.max(textWidth(title,13)+(paper?24:8),textWidth(tags.map(t=>t.text).join(''),10.5)+8,textWidth(count,10.5)+8))));
      const titleLines=wrap([{text:title,bold:true}],width-(paper?24:8),13);
      const tagLines=wrap(tags,width-8,10.5),countLines=wrap(count?[{text:count,bold:false}]:[],width-8,10.5);
      return {title,titleLines,tagLines,countLines,width,height:4+titleLines.length*14+tagLines.length*12+countLines.length*12};
    }
    function measure(n){
      const l=label(n);labels.set(n,l);
      const h=Math.max(l.height,n.children.reduce((sum,c)=>sum+measure(c),0)+Math.max(0,n.children.length-1)*gap);sizes.set(n,h);return h;
    }
    measure(root);
    // Balance whole top-level branches by height; retain source order on each side.
    const sides=new Map(),weights=[0,0];
    [...root.children].sort((a,b)=>sizes.get(b)-sizes.get(a)).forEach(n=>{const side=weights[0]<=weights[1]?0:1;sides.set(n,side);weights[side]+=sizes.get(n)+gap;});
    const sideHeights=weights.map(h=>Math.max(0,h-gap)),height=Math.max(labels.get(root).height,...sideHeights);
    const rootLabel=labels.get(root),center={...root,...rootLabel,x:-rootLabel.width/2,y:(height-rootLabel.height)/2,parentKey:null,side:0};nodes.push(center);
    function place(n,side,top,parent){
      const l=labels.get(n),item={...n,...l,x:side>0?parent.x+parent.width+columnGap:parent.x-columnGap-l.width,y:top+(sizes.get(n)-l.height)/2,parentKey:parent.key,side};nodes.push(item);
      edges.push({from:parent.key,to:n.key,x1:side>0?parent.x+parent.width:parent.x,y1:parent.y+parent.height/2,x2:side>0?item.x:item.x+item.width,y2:item.y+item.height/2,side});
      let y=top;
      for(const c of n.children){place(c,side,y,item);y+=sizes.get(c)+gap;}
    }
    for(const [index,side]of [[0,-1],[1,1]]){
      let y=(height-sideHeights[index])/2;
      for(const n of root.children.filter(n=>sides.get(n)===index)){place(n,side,y,center);y+=sizes.get(n)+gap;}
    }
    const left=Math.min(...nodes.map(n=>n.x))-pad,top=Math.min(...nodes.map(n=>n.y))-pad;
    for(const n of nodes){n.x-=left;n.y-=top;}
    for(const edge of edges){edge.x1-=left;edge.x2-=left;edge.y1-=top;edge.y2-=top;}
    return {nodes,edges,lang,width:Math.ceil(Math.max(...nodes.map(n=>n.x+n.width))+pad),height:Math.ceil(Math.max(...nodes.map(n=>n.y+n.height))+pad)};
  }
  function edgePath(edge){const mid=(edge.x1+edge.x2)/2;return `M ${edge.x1} ${edge.y1} C ${mid} ${edge.y1}, ${mid} ${edge.y2}, ${edge.x2} ${edge.y2}`;}
  function svg(graph,{lang=graph.lang,state={},interactive=false,dark=false}={}){
    const e=M.escape,ink=dark?'#e6f0ef':'#203437',muted=dark?'#a3b9ba':'#64787b',bg=dark?'#18272c':'#ffffff',line=dark?'#426069':'#c9d8d9',accent=dark?'#77d7cb':'#087e82',tint=dark?'#203e40':'#edf7f5';
    const first=graph.nodes[0],name=first.title,parts=[`<svg xmlns="http://www.w3.org/2000/svg" width="${graph.width}" height="${graph.height}" viewBox="0 0 ${graph.width} ${graph.height}" role="${interactive?'group':'img'}" aria-label="${e(name)}" font-family="Arial, PingFang SC, Microsoft YaHei, sans-serif">`,
      `<title>${e(name)}</title><desc>${e(lang==='zh'?'当前分类与筛选条件下的完整子树；论文名称链接原文。':'Complete subtree under the current category and filters; paper names link to the original papers.')}</desc>`,
      `<rect width="100%" height="100%" fill="${bg}"/>`,
      `<g fill="none" stroke="${line}" stroke-width="1.3">${graph.edges.map(edge=>`<path d="${edgePath(edge)}"/>`).join('')}</g>`];
    function text(lines,x,y,size,color){return lines.map((runs,i)=>`<text x="${x}" y="${y+i*(size===13?14:12)}" font-size="${size}" fill="${color}">${runs.map(r=>`<tspan font-weight="${r.bold?700:400}">${e(r.text)}</tspan>`).join('')}</text>`).join('');}
    for(const n of graph.nodes){
      const paper=n.type==='paper',current=n.parentKey===null;
      parts.push(`<g transform="translate(${n.x} ${n.y})" data-tree-key="${e(n.key)}"${paper?` data-paper-slug="${e(n.paper.slug)}"`:''}>`);
      parts.push(`<rect width="${n.width}" height="${n.height}" rx="3" fill="${current?tint:bg}" stroke="${current?accent:line}" stroke-width="${current?1.6:0.7}"/>`);
      let title=text(n.titleLines,4,12,13,ink);
      if(paper)title=`<a href="${e(n.paper.links.paper)}" target="_blank" rel="noopener noreferrer" class="tree-paper-link">${title}</a>`;
      parts.push(paper?title:'');
      let body=(paper?'':title)+text(n.tagLines,4,12+n.titleLines.length*14,10.5,muted)+text(n.countLines,4,12+n.titleLines.length*14,10.5,muted);
      if(!paper&&interactive){const query=M.stateQuery({...state,view:'tree',category:n.key,paper:''});body=`<a href="${e(query)}" data-tree-category="${e(n.key)}" data-focus="tree-${e(n.key)}" class="tree-category-link" aria-label="${e(n.title)}"${current?' aria-current="page"':''}><rect width="${n.width}" height="${n.height}" fill="transparent"/>${body}</a>`;}
      parts.push(body);
      if(paper&&interactive){const query=M.stateQuery({...state,view:'tree',paper:n.paper.slug});parts.push(`<a href="${e(query)}" data-tree-paper="${e(n.paper.slug)}" data-focus="paper-${e(n.paper.slug)}" class="tree-info" aria-label="${e(n.paper.short_name)}: ${lang==='zh'?'简介与资源':'Summary & resources'}"><rect x="${n.width-20}" width="20" height="20" fill="transparent"/><text x="${n.width-14}" y="14" font-size="14" fill="${accent}" aria-hidden="true">ⓘ</text></a>`);}
      parts.push('</g>');
    }
    parts.push('</svg>');return parts.join('');
  }
  function rasterSize(graph){const scale=Math.min(2,8192/graph.width,8192/graph.height,Math.sqrt(16000000/(graph.width*graph.height)));return {width:Math.max(1,Math.floor(graph.width*scale)),height:Math.max(1,Math.floor(graph.height*scale))};}
  function fitScale(graph,width,height){return Math.min(1,Math.max(1,width)/graph.width,Math.max(1,height)/graph.height);}
  const api={model,layout,svg,rasterSize,fitScale};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.TreeView=api;
})(typeof globalThis!=='undefined'?globalThis:this);
