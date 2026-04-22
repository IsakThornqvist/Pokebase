/**
 * Application entry point.
 *
 * Initializes and renders the React application
 * into the root DOM element.
 *
 * Wraps the app in StrictMode for highlighting potential issues.
 *
 * @author Isak Thörnqvist
 * @version 1.0.0
 */

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Mounts the React app to the DOM.
 */
createRoot(document.getElementById('root')!).render(
    <App />
)
