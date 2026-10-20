import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import './styles/main.scss';
import App from './app/App';
import { setupStore } from './app/store';

const store = setupStore();
const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter future={ROUTER_FUTURE}>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
