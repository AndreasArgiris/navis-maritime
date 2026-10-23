<p align="center">
  <img src="src/assets/navis-logo.svg" alt="Navis Fleet" height="72" />
</p>

<h1 align="center">Navis Fleet</h1>

<p align="center"><strong>Your whole fleet, in one simple app.</strong></p>

---

A repair on the main engine that takes ten emails to approve. A crew change arranged over phone calls, spreadsheets and forwarded tickets. Invoices in someone's inbox. Spare parts counted on paper. Checking the weather for one vessel means opening yet another website.

**Navis Fleet puts all of it in one place.** It is a complete maritime solution in a single application. No more paperwork, and no more endless chains of communication just to fix an engine, change a crew member or check the weather around one of your vessels. Open the app, and it's there.

## What you can manage in Navis Fleet

- **🗺️ Fleet map:** every vessel on a live world map. Hover over a ship to see its position, status and the weather around it.
- **🚢 Vessel dashboard:** all the general information for each vessel on one screen.
- **⚙️ Engine:** main engine, cylinders, generators, tank levels and oil analysis, with alerts when a reading is out of range.
- **👥 Crew:** the full crew list, and a profile for every member with schedule & tickets, medical records, certificates and reviews.
- **📦 Inventory:** everything on board, organised into tabs by category.
- **🔧 Spare parts:** a register of critical spares, where you can record every part you use.
- **🧾 Invoices:** supplier invoices for each vessel, kept together.
- **🧭 Routes:** voyage tracks on a live map.

## Why Navis Fleet

- **One place for everything.** Engine, crew, stock, invoices and routes in one app, not spread across email, paper and phone calls.
- **Fewer messages, faster decisions.** The information you need to approve a repair or a crew change is already on screen.
- **The whole fleet at a glance.** See where every vessel is and what conditions it's sailing in.
- **Simple.** Clear screens and no clutter.

## Run it locally

You need [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev
```

The app runs on generated sample data, so you can see how everything looks right away.

| Command              | Description                       |
| -------------------- | --------------------------------- |
| `npm run dev`        | Start the app for development     |
| `npm run build`      | Build for production into `dist/` |
| `npm run preview`    | Preview the production build      |
| `npm test`           | Run the tests                     |
| `npm run test:watch` | Run the tests in watch mode       |
| `npm run coverage`   | Run the tests with coverage       |

## Built with

React 18, React-Bootstrap, Redux Toolkit, React Router, React-Leaflet, Recharts and Framer Motion. Tested with Vitest and React Testing Library.
