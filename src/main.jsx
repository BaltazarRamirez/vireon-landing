import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import './index.css'
import App from './App.jsx'

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const navigationType = performance.getEntriesByType("navigation")[0]?.type;
if (navigationType === "reload" && window.location.hash) {
  window.history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );
}

window.scrollTo(0, 0);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
