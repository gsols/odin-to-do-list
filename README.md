# The Steakhouse — Restaurant Page

A single-page application for a fictional steakhouse restaurant, built as part of [The Odin Project](https://www.theodinproject.com/) curriculum. The project focuses on practicing **DOM manipulation** and **webpack module bundling** without using any frontend framework.

## Purpose

This project demonstrates building a dynamic, multi-section website entirely through JavaScript DOM manipulation. All page content is generated programmatically — there is no static HTML beyond a minimal shell template. Navigation between pages clears and re-renders the content div, simulating a single-page app routing pattern.

## Pages

| Page | Description |
|------|-------------|
| **Home** | Landing section with a tagline, restaurant description, hero image, and a "Book a Table" CTA |
| **Menu** | Grid of menu items (Ribeye, Filet Mignon, New York Strip) with images, descriptions, and prices |
| **About** | Photo gallery with a brief restaurant backstory |
| **Book** | Reservation form collecting name, email, phone, date, time, and party size |

## Tech Stack

| Tool | Role |
|------|------|
| **Vanilla JavaScript (ES Modules)** | All UI logic and DOM manipulation |
| **CSS** | Styling and layout |
| **Webpack 5** | Module bundler — handles JS, CSS, and image assets |
| **webpack-dev-server** | Local dev server with live reload |
| **HtmlWebpackPlugin** | Generates `dist/index.html` from `src/template.html` |
| **css-loader / style-loader** | Imports CSS files as modules |
| **html-loader** | Processes HTML files as modules |
| **Asset modules** | Bundles images (PNG, JPG, JPEG, WEBP) with content hashing |

## Project Structure

```
src/
  index.js       — entry point; nav wiring, page-switch logic
  home.js        — Home page renderer
  menu.js        — Menu page renderer + menu item data
  about.js       — About page renderer
  book.js        — Booking form renderer
  styles.css     — Global styles
  template.html  — HTML shell (nav bar, #content mount point)
dist/            — webpack build output (gitignored)
webpack.config.js
```

## Getting Started

```bash
npm install
npm run dev      # starts webpack-dev-server (http://localhost:8080)
npm run build    # production build → dist/
```

> Add these scripts to `package.json` if not already present:
> ```json
> "scripts": {
>   "dev": "webpack serve",
>   "build": "webpack"
> }
> ```

## Key Concepts Practiced

- DOM manipulation with `createElement`, `appendChild`, `classList`, event listeners
- ES module imports (JS, CSS, images) via webpack
- Single-page navigation pattern without a framework or router library
- Webpack configuration: loaders, plugins, asset modules, dev server
