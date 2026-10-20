import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { setupStore } from '../app/store';
import { createTestState } from './fixtures';

/** Renders the current pathname so tests can assert on navigation. */
export function LocationDisplay() {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
}

/**
 * Render with a fresh Redux store and a MemoryRouter.
 * Pass `path` (e.g. "/vessels/:vesselId/crew") to mount `ui` on a route with params.
 */
export function renderWithProviders(
  ui,
  { preloadedState = createTestState(), store = setupStore(preloadedState), route = '/', path } = {},
) {
  const content = path ? (
    <Routes>
      <Route path={path} element={ui} />
      <Route path="*" element={null} />
    </Routes>
  ) : (
    ui
  );

  return {
    store,
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {content}
          <LocationDisplay />
        </MemoryRouter>
      </Provider>,
    ),
  };
}
