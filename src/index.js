import React from 'react'
import ReactDOM from 'react-dom'

import { ViewProvider } from "./context/ViewProvider"

import Home from './views/Home'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ViewProvider>
      <Home />
    </ViewProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
