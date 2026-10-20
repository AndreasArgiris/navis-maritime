import { combineReducers, configureStore } from '@reduxjs/toolkit';
import vesselsReducer from '../features/fleet/vesselsSlice';
import cargoReducer from '../features/inventory/cargoSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import sparePartsReducer from '../features/spareParts/sparePartsSlice';
import invoicesReducer from '../features/invoices/invoicesSlice';
import crewReducer from '../features/crew/crewSlice';
import metricsReducer from '../features/vessel/metricsSlice';
import engineReducer from '../features/engine/engineSlice';
import voyagesReducer from '../features/voyages/voyagesSlice';
import uiReducer from './layout/uiSlice';

export const rootReducer = combineReducers({
  vessels: vesselsReducer,
  cargo: cargoReducer,
  inventory: inventoryReducer,
  spareParts: sparePartsReducer,
  invoices: invoicesReducer,
  crew: crewReducer,
  metrics: metricsReducer,
  engine: engineReducer,
  voyages: voyagesReducer,
  ui: uiReducer,
});

/** Factory so tests can create isolated stores with their own preloaded state. */
export function setupStore(preloadedState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}
