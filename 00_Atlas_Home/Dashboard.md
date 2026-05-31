> [!info] Welcome to the Cat Family Atlas
> A living, modular knowledge base exploring every wild and domestic species of the Felidae.

## 🐾 Species Database

Below is a dynamic, sortable table of all cats currently in the atlas, automatically querying their YAML properties via `dataviewjs`.

```dataviewjs
dv.table(
    ["Species Profile", "Scientific Name", "Biome", "Conservation Status"],
    dv.pages("#species")
      .sort(p => p.file.name)
      .map(p => [
          p.file.link,
          p.scientific_name,
          p.biome,
          p.iucn_status
      ])
)
```

## 🖼️ Visual Exhibits

- **[Interactive Teaching Canvas](../Teaching_Map.canvas)** - Explore the evolutionary tree of the Felidae on an infinite whiteboard.
- **[[../04_Visual_Production/README.md|Visual Production Studio]]** - View high-resolution posters and artwork.
