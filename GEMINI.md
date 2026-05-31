# Cat Family Atlas

## Project Overview

The Cat Family Atlas is a comprehensive, museum-style, modular knowledge base covering all wild and domestic species of the _Felidae_ (cat) family. It combines taxonomy, ecology, conservation, and storytelling, with a future vision of being built into a modern interactive website.

## Tech Stack

- **Content Storage**: Local flat Markdown files organized into structured museum exhibits (Home, Taxonomy, Species Profiles, Exhibit Modules, Visual Production, Ecology Comparisons, Conservation).
- **Package Manager**: npm (configured for future website building and Playwright testing).
- **Testing**: Playwright (for automated frontend UI testing and markdown link/validity checking).
- **Formatting/Linting**: Prettier (for Markdown, JSON, and future JS/TS files).
- **External Data**: NCBI, Europe PMC, PubMed, and biological ontologies.

## Coding & Content Standards

- **Museum Modularity**: Maintain high modularity. Keep general summaries in `02_Species_Profiles` and detailed information in `03_Exhibit_Modules` subfolders.
- **Strict Template Compliance**: Create new species profiles and exhibit modules using the exact markdown files in `99_Templates` as blueprints.
- **Museum Placard Rule**: Every Museum Summary must start with a vivid, evocative storytelling hook — a nickname, a vivid scene, or a memorable metaphor — before introducing statistics.
- **Parenthetical Definition Rule**: Never drop scientific jargon without immediately explaining it in plain English in parentheses. E.g., _crepuscular (twilight-active, hunting at dawn and dusk)_.
- **Active Narrative Voice**: Describe what the cat _does_, not just what it _has_. Use active verbs that make the animal feel alive.
- **Relative Path References**: Always use relative paths (e.g., `../04_Visual_Production/...`) to link to assets and placeholders.
- **Git Commit Message Format**: Use Conventional Commits (`feat(species): ...`, `fix(links): ...`, `chore: ...`).

## Agent Configuration

### Active Skills

- `ncbi-sequence-fetch` (for taxonomic and CDS sequence checks)
- `embl-ebi-ols` (for ontology and biological terms resolution)
- `literature-search-europepmc` (for literature and fact verification)
- `pubmed-database` (for medical and bio research literature checks)
- `modern-web-guidance` (for future modern website design and UI components)

### Disabled Skills

- `alphafold-database-fetch-and-analyze`
- `alphagenome-single-variant-analysis`
- `chembl-database`
- `clinical-trials-database`
- `clinvar-database`
- `dbsnp-database`
- `encode-ccres-database`
- `ensembl-database`
- `foldseek-structural-search`
- `gnomad-database`
- `gtex-database`
- `human-protein-atlas-database`
- `interpro-database`
- `jaspar-database`
- `literature-search-arxiv`
- `literature-search-biorxiv`
- `literature-search-openalex`
- `openfda-database`
- `opentargets-database`
- `pdb-database`
- `protein-sequence-msa`
- `protein-sequence-similarity-search`
- `pubchem-database`
- `pymol`
- `quickgo-database`
- `reactome-database`
- `string-database`
- `ucsc-conservation-and-tfbs`
- `unibind-database`
- `uniprot-database`

### Safety Policy

- **Policy Level**: Standard (allow read operations, explicitly request user confirmation for modifying commands).
- **Subagents**: Read-only by default (subagents can perform background literature/fact searches, but cannot write files directly).

### Uncertainty Handling

- Use `/grill-me` to clarify complex architectural or structural decisions. For smaller content edits, make reasonable choices and explain.

## Never Do (Hard Rules)

- Never use generic or ad-hoc templates; always follow the formats in `99_Templates`.
- Never use inline CSS/styles inside markdown files.
- Never commit broken relative links or absolute file paths.
- Never use cryptic tether citation codes (e.g. ``) — these are unreadable and should be removed or replaced with plain inline attribution when editing.
- Never open a Museum Summary with a list of dry dimensions and weights — always lead with a narrative hook.

## Always Do (Mandatory Practices)

- Always verify taxonomic data, weights, sizes, and conservation statuses against trusted primary databases (IUCN, NCBI, Europe PMC).
- Always ensure new species profiles are linked within `00_Atlas_Home/Species_Index.md`.
- Always run link-checking scripts/Prettier format validation before finalizing changes.
- Always use relative markdown links (`[[relative-path|link-text]]` or `[link-text](relative-path)`) adhering to local conventions.
- Always define scientific jargon in parentheses immediately after using it.
- Always include a `Visual Production Notes` section with AI prompt ideas for each species profile.
