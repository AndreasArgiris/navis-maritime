# Navis Fleet

A modern fleet-management application for vessels: a live world map of the fleet, plus a per-vessel
dashboard with information and live metrics for every part of vessel like engine, inventory, spare parts, invoices , crew members and more.


## Routes

 `/`                                Fleet world map (hover = pin with position & weather etc.) 

 `/vessels/:id`                     Vessel dashboard (contains all the general vessel info) 

 `/vessels/:id/inventory`           Multiple tabs for each inventory category

 `/vessels/:id/spare-parts`         Critical spares register, record usage 

 `/vessels/:id/invoices`            Supplier invoices 

 `/vessels/:id/crew`                Crew list; click to crew member to open member's profile 

 `/vessels/:id/crew/:crewId`        Crew member profile. Tabs: overview · schedule & tickets · medical · certificates · reviews 

 `/vessels/:id/engine`              Main engine, cylinders, generators, oil analysis etc. 

 `/vessels/:id/routes`              Route history: voyage tracks on a map plus a 12-month voyage log 

## Tech Stack

 UI           : React 18, React-Bootstrap 

 State        : Redux Toolkit 
 
 Animation    : Framer Motion 

 Charts       : Recharts 

 Map          : React-Leaflet 

 Tests        : Vitest, Testing Library 

## If you want to run it locally

npm install

npm run dev 

## Other usefull commands

npm test     

npm run test:watch

npm run build


