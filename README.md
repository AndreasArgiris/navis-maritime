# Navis Fleet

A fleet-management dashboard for vessels: a live world map of the fleet, plus a per-vessel
dashboard with inventory, spare parts, invoices and crew.

## Stack

| Concern      | Library                                      |
| ------------ | -------------------------------------------- |
| UI           | React 18, React-Bootstrap / Bootstrap 5 (Sass theme) |
| State        | Redux Toolkit + React-Redux                  |
| Routing      | React Router 6                               |
| Animation    | Framer Motion                                |
| Charts       | Recharts                                     |
| Map          | Leaflet + React-Leaflet (Esri light-gray tiles) |
| Tests        | Vitest, Testing Library               |

## Scripts

```bash
npm install
npm run dev       
npm test        
npm run test:watch
npm run build
```

## Routes

| Path                              | Page                                   |
| --------------------------------- | -------------------------------------- |
| `/`                               | Fleet world map (hover = tooltip with position & weather, click = vessel) |
| `/vessels/:id`                    | Vessel dashboard (KPIs, charts, top spare parts, position & weather) |
| `/vessels/:id/inventory`          | Tabs: **Cargo** manifest (matched to vessel type) · **Living supplies** (`?tab=living`) |
| `/vessels/:id/spare-parts`        | Critical spares register, record usage |
| `/vessels/:id/invoices`           | Supplier invoices, mark as paid        |
| `/vessels/:id/crew`               | Crew list; click a row to open a profile |
| `/vessels/:id/crew/:crewId`       | Crew profile. Tabs: overview · schedule & tickets · medical · certificates · reviews (`?tab=…`) |
| `/vessels/:id/engine`             | Main engine, cylinders, generators, oil analysis and tank levels; out-of-range readings in red |
| `/vessels/:id/routes`             | Route history: voyage tracks on a map plus a 12-month voyage log |


## Project layout

Code is organised **by feature**: each folder owns its pages, components, hooks, Redux
slice and tests.

```
src/
  app/                 App routes, store, navigation paths, NotFoundPage
    layout/            AppLayout, Sidebar, Topbar, useSidebar, uiSlice
    vesselRoutes.jsx   every /vessels/:vesselId page (shared by App and page tests)
  features/
    fleet/             fleet map, vessel register (vesselsSlice), search, ship icon
    vessel/            vessel shell + dashboard (header, tabs, charts, metricsSlice)
    inventory/         cargo, living supplies, ship stores
    spareParts/        spare parts register
    invoices/          supplier invoices
    crew/              crew list; member/ holds the profile page and its tabs
    engine/            engine readings, alerts, generators, oils, tanks
    voyages/           route history: map, voyage log, local port times
    weather/           generated sea conditions + display
  shared/
    ui/                Panel, DataTable (+ dataTable/ hooks), StatCardRow, FilterPills, …
    charts/            chart theme + HorizontalBarChart
    map/               tiles, zoom limit, fit-to-path and line-draw hooks
    hooks/             useFilters, useTabParam, useDismissOnScrollOrResize
    utils/             format, dates, geo, random
  data/                mock data source: fleet, trade routes, seed
    generators/        one deterministic generator per domain (crew/ and engine/ split further)
  test/                setup, fixtures, render helpers, react-leaflet mock
```
