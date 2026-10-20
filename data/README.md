# Canonical Research Records / 统一数据源

- `papers/<slug>.json`：每篇一个记录；这是标题、分类、双语短摘要、资源与核验信息的唯一数据源。
- `templates/model.json`：非基准工作模板；支持 model / dataset / tool / survey。
- `templates/benchmark.json`：基准模板，必须填写手型、任务、跨手复用、开放状态、核心特点五项双语事实。
- `retired_ids.json`：已删除记录的旧编号，禁止重复使用。

模板目录不参与收录或计数。不要把模板原样放进 papers；须先替换示例、确认来源和分类。详细规则见 [CONTRIBUTING.md](../CONTRIBUTING.md)。

维护数据后运行 `python3 scripts/build_catalog.py`，自动更新 [分类索引](../catalog/README_cn.md)、首页入口与导图；`--check` 只验证，不修改文件。

One file per paper in `papers/` is canonical. Templates are excluded from indexing. Detailed notes are optional and referenced by path. Run the complete builder after editing data; use `--check` for read-only validation.
