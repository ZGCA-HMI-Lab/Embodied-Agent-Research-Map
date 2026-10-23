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
    return data.papers.filter(p => inWindow(p, window)
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
      return {...n, key, children, papers: [...(byCategory.get(n.code) || []), ...children.flatMap(c => c.papers)]};
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
  const api = {stamp, monthKey, bounds, inWindow, filterPapers, buildTree, columns, columnFor, escape, formatText};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.MapCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
