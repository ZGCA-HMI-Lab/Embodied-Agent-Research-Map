/* Pure view helpers. Identity comes from category, never the historical paper ID. */
(function (root) {
  'use strict';
  const stamp = p => p.publication_date?.value || String(p.year);
  const monthKey = p => stamp(p).length >= 7 ? stamp(p).slice(0, 7) : `${stamp(p)}-unknown`;
  function bounds(papers, range = 'all') {
    const dates = papers.map(stamp).sort();
    if (!dates.length || range === 'all') return null;
    const newest = dates.at(-1);
    const end = newest.length >= 7 ? newest.slice(0, 7) : `${newest}-12`;
    const [year, month] = end.split('-').map(Number);
    const serial = year * 12 + month - 1 - (Number(range) - 1);
    return {start: `${Math.floor(serial / 12)}-${String(serial % 12 + 1).padStart(2, '0')}`, end};
  }
  function inWindow(p, window) {
    if (!window) return true;
    const d = stamp(p);
    return d.length === 4 ? `${d}-12` >= window.start && `${d}-01` <= window.end
      : d.slice(0, 7) >= window.start && d.slice(0, 7) <= window.end;
  }
  function filterPapers(data, state = {}) {
    const window = bounds(data.papers, state.range || 'all');
    const query = (state.query || '').trim().toLocaleLowerCase();
    const category = state.category && categoryIndex(data.taxonomy).find(n => n.key === state.category);
    return data.papers.filter(p => inWindow(p, window)
      && (!category || category.codes.includes(p.category))
      && (!state.kind || p.kind === state.kind)
      && (!state.representatives || p.show_on_map)
      && (state.topics || []).every(topic => (p.topics || []).includes(topic))
      && (!query || JSON.stringify([p.short_name,p.title,p.authors,p.tags,p.display_tags,p.tldr,p.benchmark,p.evaluation_scope]).toLocaleLowerCase().includes(query)));
  }
  function buildTree(taxonomy, papers) {
    const byCategory = new Map();
    papers.forEach(p => { if (!byCategory.has(p.category)) byCategory.set(p.category, []); byCategory.get(p.category).push(p); });
    const walk = (nodes, path = '') => nodes.map((n, index) => {
      const key = `${path}/${index}`;
      const children = walk(n.children || [], key);
      const codes = n.code ? [n.code] : children.flatMap(c => c.codes).sort();
      const stableKey = n.code || `group:${n.name}:${codes.join(',')}`;
      return {...n, key:stableKey, codes, children, papers: [...(byCategory.get(n.code) || []), ...children.flatMap(c => c.papers)]};
    });
    return walk(taxonomy.children);
  }
  function columns(papers, expandedYears = new Set(), latest = '') {
    const newestYear = (latest || papers.map(stamp).sort().at(-1) || '').slice(0, 4);
    const cols = new Map();
    papers.forEach(p => {
      const year = stamp(p).slice(0, 4);
      const collapsed = year < newestYear && !expandedYears.has(year);
      const key = collapsed ? year : monthKey(p);
      cols.set(key, {key, year, type: collapsed ? 'year' : key.endsWith('unknown') ? 'unknown' : 'month'});
    });
    return [...cols.values()].sort((a,b) => b.year.localeCompare(a.year)
      || (a.type === 'unknown' ? 1 : b.type === 'unknown' ? -1 : b.key.localeCompare(a.key)));
  }
  function columnFor(paper, cols) {
    const year = stamp(paper).slice(0,4);
    return cols.some(c => c.key === year) ? year : monthKey(paper);
  }
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function formatText(value) {
    return escape(value).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\n|&lt;br\s*\/?&gt;/gi,'<br>');
  }
  function categoryIndex(taxonomy) {
    const index = [];
    const visit = (nodes, path = []) => nodes.forEach(n => {
      index.push({...n, path:[...path,n], depth:path.length});
      visit(n.children,[...path,n]);
    });
    visit(buildTree(taxonomy || {children:[]}, []));
    return index;
  }
  function expandedCategories(taxonomy, category = '', restored) {
    const nodes = categoryIndex(taxonomy);
    const parents = nodes.filter(n => n.children.length);
    if (Array.isArray(restored))return new Set(restored.filter(key => parents.some(n => n.key === key)));
    const focused = nodes.find(n => n.key === category);
    return new Set(parents.filter(n => !focused || n.path.some(ancestor => ancestor.key === focused.key)).map(n => n.key));
  }
  function sortPapers(papers, sort = 'newest') {
    return [...papers].sort((a,b) => (sort === 'name' ? 0 :
      stamp(a).localeCompare(stamp(b)) * (sort === 'oldest' ? 1 : -1)) ||
      (a.short_name || '').localeCompare(b.short_name || '') || (a.slug || a.id || '').localeCompare(b.slug || b.id || ''));
  }
  function preview(papers, expanded = false) {
    return {shown:expanded ? papers : papers.slice(0,3), remaining:expanded ? 0 : Math.max(0,papers.length-3)};
  }
  function readState(search, data, defaults = {}) {
    const q = new URLSearchParams(search), pick = (key, allowed, fallback) => allowed.includes(q.get(key)) ? q.get(key) : fallback;
    const category = q.get('category') || '', validCategory = categoryIndex(data.taxonomy).some(n => n.key === category);
    return {query:q.get('q') || '', topics:[...new Set(q.getAll('topic'))].filter(t => Object.hasOwn(data.topics || {},t)),
      kind:pick('type',['model','benchmark','dataset','tool','survey'],''),
      range:pick('range',['6','12','all'],'12'), representatives:q.get('representatives') === '1',
      category:validCategory ? category : '', invalidCategory:!!category && !validCategory,
      view:pick('view',['map','list'],defaults.view || 'map'), sort:pick('sort',['newest','oldest','name'],'newest'),
      lang:pick('lang',['zh','en'],defaults.lang || 'zh'),
      paper:data.papers.some(p => p.slug === q.get('paper')) ? q.get('paper') : ''};
  }
  function stateQuery(state) {
    const q = new URLSearchParams();
    for (const [key,value] of Object.entries({q:state.query,type:state.kind,range:state.range,category:state.category,
      view:state.view,sort:state.sort,lang:state.lang,paper:state.paper,representatives:state.representatives ? '1' : ''}))
      if(value)q.set(key,value);
    (state.topics || []).forEach(t => q.append('topic',t));
    return '?' + q.toString();
  }
  function exportResults(data, state, format) {
    const papers = sortPapers(filterPapers(data,state),state.sort);
    if(format === 'json')return JSON.stringify({...data,papers},null,2) + '\n';
    const lang = state.lang === 'en' ? 'en' : 'zh', local = x => x?.[lang] || x?.en || x?.zh || '';
    const index = categoryIndex(data.taxonomy), quote = value => {
      let s = String(value ?? '');
      if (/^\s*[=+@-]|^[\t\r\n]/.test(s))s = "'" + s;
      return '"' + s.replace(/"/g,'""') + '"';
    };
    const header = ['slug','title','authors','publication_date','date_basis','category','category_path','tags','summary','evaluation_scope','paper','project','code','data'];
    const rows = papers.map(p => [p.slug,p.title,p.authors,stamp(p),p.publication_date?.basis || 'year-only',p.category,
      (index.find(n=>n.code===p.category)?.path || []).map(n=>lang==='zh'?n.name_zh:n.name).join(' → '),
      (p.tags || []).join('; '),p.benchmark ? Object.entries(p.benchmark).map(([k,v])=>k+': '+local(v)).join('\n') : local(p.tldr),
      local(p.evaluation_scope),p.links?.paper,p.links?.project,p.links?.code,p.links?.data]);
    return [header,...rows].map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n';
  }
  const api = {expandedCategories, categoryIndex, sortPapers, preview, readState, stateQuery, exportResults, stamp, monthKey, bounds, inWindow, filterPapers, buildTree, columns, columnFor, escape, formatText};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MapCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
