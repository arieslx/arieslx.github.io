# Spec: Bilingual Portfolio Homepage

## Objective

Turn the Hexo home page into a bilingual introduction and portfolio while preserving the existing Cactus theme and keeping `/about/` as a separate biography page.

The first release contains one project, Luna Body Tracker. Project cards link to the platform where each work is published. The data model must support more projects without template edits.

## Tech Stack

- Hexo 6.3
- Cactus theme with EJS templates and Stylus styles
- Existing jQuery runtime for progressive enhancement
- YAML for portfolio content

## Commands

- Install: `npm install`
- Develop: `npm run server`
- Build: `npm run build`
- Clean: `npm run clean`

## Project Structure

- `source/_data/portfolio.yml`: bilingual portfolio data
- `source/images/portfolio/`: project cover images
- `themes/cactus/layout/index.ejs`: portfolio homepage markup
- `themes/cactus/source/css/_partial/index.styl`: homepage and portfolio styles
- `themes/cactus/source/js/portfolio.js`: category filtering

## Code Style

Use semantic HTML, BEM-style `portfolio-*` class names, two-space indentation in EJS/YAML, and the existing indented Stylus syntax.

```ejs
<article class="portfolio-card" data-category="<%= project.category.slug %>">
  <h2><%= project.title.zh %></h2>
</article>
```

## Testing Strategy

- Run `npm run build` and confirm Hexo generates `/index.html` and `/about/index.html`.
- Verify the homepage at desktop and mobile widths.
- Verify category controls work with mouse and keyboard.
- Verify the card and article link destinations.
- Confirm the full project list remains visible when JavaScript is unavailable.

## Boundaries

- Always: preserve the Cactus visual language, support responsive layouts, keep external links safe, and make project content data-driven.
- Ask first: add dependencies, change the global theme, change project content, or remove existing pages.
- Never: remove `/about/`, alter article permalinks, or introduce a frontend framework.

## Success Criteria

- `/` shows a bilingual introduction, social links, filters, one portfolio card, and an Articles link.
- `/about/` remains available and unchanged.
- Luna Body Tracker displays the supplied cover, bilingual copy, date, category, and approved tags.
- The project card links to `https://github.com/arieslx/luna-body-tracker`.
- The layout is single-column on small screens and supports a masonry-style multi-column list as projects are added.
- The site builds successfully without new dependencies.

## Confirmed Content

- Chinese name: 女性身体节律
- English name: Luna Body Tracker
- Chinese summary: 温和无感地记录身体数据
- English summary: Gentle self care tracker
- Category: 开发 / Development
- Tags: Health Tech, Body Tracking, Open Source
- Date: 2026-06-15
- Platform: GitHub

