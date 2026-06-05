# Odin To‑Do List

A small single-page to‑do list application created while following The Odin Project. It demonstrates DOM-driven UI (no frameworks), modular JavaScript, and simple local persistence.

The app supports projects, tasks (with title, description, due date/time, priority), task completion, and editing. All UI is built programmatically from `src/template.html` and rendered inside the `#content` element.

## Features

- Create, edit, and delete projects
- Add tasks with: title, description, due date, time, priority, and optional project assignment
- Edit tasks and projects inline
- Mark tasks complete / view completed tasks
- "Lonely Tasks" view (tasks without projects) and Today view (tasks due today)
- Local persistence via the project's storage service (if enabled)

## Project structure

```
package.json
webpack.config.js
src/
  index.js            — app entry + wiring
  displayController.js— renders UI and handles user interactions
  Task.js, Project.js  — domain models
  *Factory.js, *Service.js — helpers and storage/service layers
  template.html       — minimal HTML shell (nav + #content)
  styles.css          — styles used by the app
public/               — static assets (images)
```

## Quick start (development)

Make sure you have Node.js (v14+) and npm installed.

Install deps and run dev server:

```bash
npm install
npm run dev
```

Open the site at http://localhost:8080 (or the port printed by the dev server).

Build for production:

```bash
npm run build
```

## Notes about the contenteditable task title and submit button

The task form uses a contenteditable `<p>` element for the task title. Browsers sometimes insert invisible characters (non‑breaking spaces or zero‑width characters) into contenteditable fields which makes naive `trim()` checks unreliable. There was an issue where the Create/Update submit button stayed disabled even when the user typed into the title field.

A small fix was implemented in `src/displayController.js`:

- The title text is normalized by removing `\u00A0` (non‑breaking space) and `\u200B` (zero‑width space) and then trimmed before checking for emptiness.
- The submit button state is recomputed on `input` and `blur` events so typing immediately enables the button when the title contains actual visible characters.

If you still see the button disabled after typing, try clearing the field and retyping, and inspect the element in DevTools to confirm the visible content. CSS can also make a button look disabled even when it's enabled, so check styles for `button[disabled]`.

## Development tips

- The app intentionally avoids frameworks to demonstrate DOM manipulation patterns. If you plan to refactor, consider isolating DOM creation to smaller components and adding tests.
- `displayController.js` is the main file to edit for UI changes. Keep business logic in service/model files where possible.

## Tests and linting

This repo doesn't include automated tests by default. Add your preferred test runner (Jest, Mocha) if you want unit tests for services/models.

## License

This project is provided for learning and demonstration purposes.
