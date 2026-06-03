# The Cat Family Atlas: A Vibe Coding Journey

This document serves as a retrospective and teaching moment for the "Cat Family Atlas" project. It breaks down the entire development process step-by-step, analyzing the workflows, decisions, and prompting styles ("vibe coding") used throughout.

---

## Step-by-Step Analysis

### Phase 1: Bootstrapping & Guidelines
**What happened:**
- Initialized the project with the `/init-agy` command.
- Set strict rules for the agent: use layman's terms, maintain a museum-style narrative, and completely ignore website development to focus solely on the Knowledge Base (KB).
- Delegated initial tasks to 3 specialized subagents (a researcher, a visual checker, and a planner).

**What went right:**
- **Excellent delegation.** Spinning up subagents to parallelize work and prevent context pollution in the main thread is a highly advanced agentic pattern.
- **Strong boundaries.** Setting firm rules (e.g., "no thinking on the website side") kept the AI focused and prevented scope creep.

**What went wrong (or could be improved):**
- **Architecture foresight.** The project was initialized directly in the root directory. Because the KB and the future website shared the same root, a major refactor was required at the very end of the project to separate them.

**Prompting Polish (Vibe Coding Guide):**
- ❌ **Bad Example (Loose Vibe Coding):** *"let's make the KB as our solo focus, no thinking on the website side"*
- ✅ **Good Example (Structured Vibe Coding):** 
  > **Goal**: Initialize the repository for the Cat Family Atlas.
  > **Architecture**: Set up a monorepo structure from the start. Place all markdown data in a `/kb` folder to leave room for a future `/app` folder.
  > **Action**: Run `/init-agy`, configure the rules for a museum-style narrative, and spin up subagents for data gathering.

---

### Phase 2: Content Generation & Asset Pipeline
**What happened:**
- Tested visual asset generation on a small batch of 5 species.
- Leveraged the `/goal` command to autonomously generate visual assets for the remaining species (06-24) overnight.
- Enforced a clean structure by keeping `02_Species_Profiles` neat and linking heavily to `03_Exhibit_Modules`.

**What went right:**
- **Smart scaling.** Testing a complex pipeline (image generation) on a small batch before looping over the rest is textbook engineering.
- **Clean data separation.** Using the profiles as a "hub" and the modules as "spokes" made the markdown highly modular and readable.

**What went wrong (or could be improved):**
- **Idling on limits.** The agent hit image generation API quotas during the overnight run and simply waited.
- **Manual validation.** Time and tokens were spent asking the agent to "do a final sweep" to check for broken links manually.

**Prompting Polish (Vibe Coding Guide):**
- ❌ **Bad Example (Loose Vibe Coding):** *"/goal Generate all remaining visual production images... If you hit an image generation quota limit, automatically wait for it to reset and resume."*
- ✅ **Good Example (Structured Vibe Coding):**
  > **Goal**: Generate all remaining visual assets for Species 06-24 without stopping.
  > **Quota Fallback**: If you hit an image generation limit, do not idle. Immediately switch context to researching missing species or writing text for `03_Exhibit_Modules` until the quota resets.
  > **Validation**: Do not sweep manually. Create a husky pre-commit hook to automatically run Playwright link-checking formatting on every commit.

---

### Phase 3: Web Development & UI Design
**What happened:**
- Bootstrapped a Next.js application to visualize the KB.
- Iterated aggressively on the UI: implemented dashboard layouts, added a sticky sidebar, swapped cropped hero posters for action-oriented hunting images, and designed an epic 16:9 entrance.

**What went right:**
- **Tooling mastery.** Leveraged `/modern-web-guidance` and Playwright tools effectively to build and test modern frontend paradigms.
- **Design intuition.** Moving away from simple rows to dashboards, and prioritizing action shots over portraits, showed a fantastic eye for user experience.

**What went wrong (or could be improved):**
- **Conversational bug reporting.** Prompts became highly conversational (*"check ti yourself"*, *"remove the uncessary three row"*). Relying on the AI to guess exact UI intent from loose descriptions can easily cause layout regressions or lead the AI down the wrong path.

**Prompting Polish (Vibe Coding Guide):**
- ❌ **Bad Example (Loose Vibe Coding):** *"check ti yourself, i think you still need to do the remove the uncessary three row in the main page... and make sure the image in the main is very epic"*
- ✅ **Good Example (Structured Vibe Coding):**
  > **Goal**: Fix the main page layout and the Explore Species sidebar.
  > **Current Issue 1**: The Explore Species sidebar is currently rendering empty.
  > **Action 1**: Debug the sidebar component and ensure it correctly pulls the species list.
  > **Current Issue 2**: The main page has three unnecessary text rows cluttering the entrance.
  > **Action 2**: Remove those rows and make the main entrance image span the full 16:9 screen for an epic feel.

---

### Phase 4: Refactoring & Presentation
**What happened:**
- Refactored the repository file structure to separate the website code from the markdown KB files.
- Updated path references across the codebase.
- Polished the `README.md` to create a "show off" presentation.

**What went right:**
- **Proactive cleanup.** Recognized that code and data were getting tangled and initiated a refactor before the project ended.
- **Focusing on presentation.** Ending a project by polishing the README is a hallmark of an experienced open-source contributor.

**What went wrong (or could be improved):**
- Moving large amounts of files and updating paths globally at the very end of a project is inherently risky. If automated CI/CD isn't in place, this is the most common way to introduce broken links.

**Prompting Polish (Vibe Coding Guide):**
- ❌ **Bad Example (Loose Vibe Coding):** *"I want you to check if the repo should be finalized by refactoring the file structure and remove unnecessary files"*
- ✅ **Good Example (Structured Vibe Coding):**
  > **Goal**: Decouple the website codebase from the knowledge base.
  > **Action**: Move all Next.js related files (`src/`, `package.json`, `next.config.mjs`, etc.) into a new `/app` directory. Leave the markdown folders in the root (or move them to `/kb`).
  > **Validation**: Run the automated link checker script to ensure no paths were broken during the directory move.

---

## General Comments & Summarization

This project serves as an incredible example of **Agentic Orchestration**. You are already treating the AI not just as a smart autocomplete, but as a junior development team. 

**Your super-strengths:**
1. **Division of Labor**: Using subagents to parallelize tasks early on.
2. **Scaling**: Testing small batches before using `/goal` to run massive, autonomous pipelines.
3. **Decoupling**: Maintaining a clean separation between data (Markdown KB) and visualization (Next.js).

**The Final Leap:**
To reach the absolute highest tier of AI-assisted engineering, the next steps are:
1. **Shift from "Vibe Coding" to Intent-Based Prompting**: Transitioning from conversational commands (*"make it epic"* or *"check it yourself"*) to structured prompts (*Goal -> Current Issue -> Action*) drastically reduces AI hallucinations and rework, especially in complex UI tasks.
2. **Automate the Labor**: Rely less on asking the agent to "do a final sweep" or check links manually. Instead, use your first prompts to have the AI write CI/CD pipelines, GitHub actions, or pre-commit hooks. Let the code police itself so you and the agent can focus purely on building.
