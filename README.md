# Drone Strike Explorer

A web app for exploring US drone strike data. Built with Astro and Leaflet.js for my CSCI E-12 final project.

**Live Site:** [https://frankiem-4.github.io/drone-strike-explorer/](https://frankiem-4.github.io/drone-strike-explorer/)

---

## Installation and Running

You'll need Node.js 18 or higher.

```bash
# clone the repo
git clone https://github.com/cscie12/final-project-frankiem-4.git
cd final-project-frankiem-4

# install dependencies
npm install

# start dev server
npm run dev
```

Open http://localhost:4321 in your browser.

To build for production:

```bash
npm run build
npm run preview  # test the build locally
```

The site an be hosted on GitHub Pages.

---

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow that automatically builds and deploys the site. To set it up:

1. Push the code to GitHub (make sure the `.github/workflows/deploy.yml` file is included)
2. Go to your repo on GitHub
3. Click **Settings** → **Pages** (in the left sidebar)
4. Under "Build and deployment", set **Source** to **GitHub Actions**
5. That's it the workflow runs automatically on every push to `main`
6. Under the Settings, for the Repo, you'll need to go to Pages on the left menu
7. Then you will need to change the Source to Deploy from Branch
8. Select Main (or whevere you want to deploy from)
9. Save.
10. Push the site to Main, and it should build.

You can check the status of deployments in the **Actions** tab. The first build takes a couple minutes since it needs to fetch all the API data.

The site will be live at: `https://[username].github.io/[repo-name]/`
You will want to fill in your username and repo-name this has
---

## How Requirements Are Met

**Pages built through build process (at least 3)** — 5 pages total: Home, All Strikes, Strike Detail, Map Data, and Countries. All built with Astro at build time.

**Use of GitHub** — This repo, all code versioned here.

**Data that drives site generation** — The dronestre.am API provides all strike data. Astro fetches it at build time and generates ~600+ static pages from it.

**Automated deployment** — Using GitHub Pages with a GitHub Actions workflow that builds and deploys on every push to main.

**"Go deeper" aspect** — Leaflet.js interactive maps on every strike detail page (see below).

---

## "Go Deeper" — Interactive Maps with Leaflet.js

For my enhancement, I added interactive maps using Leaflet.js. Every strike that has coordinates gets a map on its detail page showing exactly where it happened.

**How it works:**
- The API includes `lat` and `lon` fields for most strikes
- On each `/strikes/[id]` page, I check if coords exist
- If they do, I render a Leaflet map centered on that location
- A marker shows the exact spot with a popup showing country/location

**Why I picked this:**
- I already had experience with Leaflet from the Massachusetts Parks assignment
- It adds real value — being able to see *where* these strikes happened makes the data more meaningful
- It was a good fit since the API already has coordinates

The map setup is in `src/pages/strikes/[id].astro` — uses a script that runs after the page loads to initialize Leaflet.

---

## 5-Planes Approach

### Strategy

**What's the goal?**  
Make drone strike data explorable and understandable. The raw API data is just JSON — this project turns it into something you can actually browse and learn from.

**Who's it for?**  
Researchers, students, journalists, or really anyone curious about this topic. The data is public, but not exactly user-friendly in its raw form.

### Scope

**What's in:**
- Homepage with stats overview (total strikes, countries, deaths, civilians)
- Full list of all strikes in a table
- Individual detail pages for each strike (with maps when coords are available)
- Map Data page that shows only strikes with coordinates
- Country breakdown page

**What's out (for now):**
- Client-side filtering/search
- Charts or graphs
- Timeline visualization

I kept the scope manageable — the core functionality is solid, and there's room to add more later.

### Structure

**Home (`/`)** — Project intro, stats cards showing totals, latest strike preview, and links to explore the data.

**All Strikes (`/strikes/`)** — Table listing all 600+ strikes with date, country, location, deaths, and links to detail pages.

**Strike Detail (`/strikes/[id]/`)** — Individual page for each strike showing date, location, country, casualty info, narrative/summary, Leaflet map (if coords exist), and source link.

**Map Data (`/map-data/`)** — Card grid showing only strikes that have coordinates, so you can browse the ones with maps.

**Countries (`/countries/`)** — Cards showing strike counts per country, sorted by most strikes.

Navigation is consistent across all pages — Home, All Strikes, Map Data, By Country.

### Skeleton

**Homepage:** Stats in a 4-column grid, latest strike in a card, two explore cards at the bottom.

**Strikes list:** Standard table layout with columns for #, date, country, location, deaths, civilians, and a link to details.

**Detail pages:** Info organized in small cards/grids. Narrative text in a styled blockquote. Map takes up full width below the text content.

**Countries page:** Simple card grid, sorted by most strikes.

### Surface

**Colors:**  
Dark blue background (`#0a1628`), orange accent (`#f59e0b`). Went for a darker theme since the subject matter is pretty heavy — didn't want it to feel too bright or casual.

**Typography:**  
System fonts (Segoe UI, etc.) — keeps it clean and loads fast.

**Visual touches:**
- Cards have borders that highlight orange on hover
- Buttons have a glow effect
- Nav links have an underline
- Everything scales down for mobile

---

## Tech Stack

- **Astro**              static site generation, handles all the build-time data fetching and page generation
- **Leaflet.js**         interactive maps on detail pages
- **OpenStreetMap**      tile provider for the maps
- **dronestre.am API**   source of all the strike data
- **CSS**                custom styles, no frameworks
- **GitHub Pages**       hosting

---

## Data Source

All strike data comes from the [dronestre.am API](https://api.dronestre.am/data), which compiles data originally gathered by [The Bureau of Investigative Journalism](https://www.thebureauinvestigates.com).

The API is public and doesn't require authentication — no API keys needed to run this project.

---

## File Structure

- `/public/styles/main.css` — all the styles
- `/src/data/strikes.js` — API fetch helpers
- `/src/layouts/BaseLayout.astro` — shared page wrapper
- `/src/pages/index.astro` — homepage
- `/src/pages/strikes/index.astro` — all strikes table
- `/src/pages/strikes/[id].astro` — detail page (dynamic)
- `/src/pages/map-data/index.astro` — strikes with coords
- `/src/pages/countries/index.astro` — country breakdown
- `/astro.config.mjs` — Astro config
- `/package.json` - Packages needed
- `/.github/workflows/deploy.yml` — GitHub Pages deployment

---

## Future Ideas

If I had more time, I'd add:
- Client-side filtering (by country, date range, etc.)
- Charts showing strikes over time
- A full-page map with all strikes plotted at once

But for now, the functionality is complete and working.

---


