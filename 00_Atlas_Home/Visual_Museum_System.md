# Visual Museum System

This atlas does more than list facts; it is designed as a **museum‑style visual system**.  Each species is treated like a hero exhibit, with multiple visual components that can be created later.  The structure allows you to plug in your own artwork, diagrams, maps and models while keeping the textual information organised.

### Hero exhibit

For each species the atlas expects a “hero poster” — a striking visual summarising the animal’s appearance and identity.  This poster might combine a photograph or illustration with key facts such as the species’ name, biome and an evocative tagline.  In the species profile you will see a placeholder for the hero poster (e.g. `![](../04_Visual_Production/Hero_Posters/siberian_tiger_hero.jpg)`).  Replace the placeholder file with your own image when you create the visual asset.

### Hotspot modules

Beyond the hero poster, each exhibit can have interactive hotspots leading to deeper modules:

- **Range & habitat** – a map or scene showing where the cat lives.  
- **Diet & hunting** – an illustration or collage of prey items and hunting techniques.  
- **Behaviour & ecology** – panels explaining social structure, activity patterns, and ecological roles.  
- **Build & scale** – diagrams comparing the animal’s size to humans or other cats.  
- **Signature traits** – close‑ups or diagrams of features like ears, claws or coat patterns.  
- **Conservation** – infographics about threats, population trends and protection efforts.

Each of these modules has a corresponding placeholder file in the **`03_Exhibit_Modules`** folder.  When you develop a module, create a new markdown file or image in the appropriate subfolder and link it from the species profile.

### Prompt templates

The **`04_Visual_Production/Prompt_Templates`** folder contains text prompts for AI image generation or guidance for illustrators.  For instance, a “range map prompt” might include the geographical extent and habitat colours.  Use these prompts to produce consistent visuals across species.

### 3D models

The atlas anticipates three‑dimensional models for each species.  The **`04_Visual_Production/3D_Model_Placeholders`** directory stores placeholder files (e.g. `.obj` or `.glb`) that you can replace with your own models.  A “Build & Scale” module may reference these models to allow viewers to rotate and examine the animal’s anatomy.

### Extending the system

If you create additional visual assets — such as videos of hunting behaviour or animations of ecological interactions — store them in the **`04_Visual_Production`** directory and update the species profile to reference them.  Keep file names descriptive and use relative paths so that the links remain valid if the directory structure is moved.

This modular visual approach makes it easy to evolve the atlas from a text‑based knowledge base into a rich, interactive resource.