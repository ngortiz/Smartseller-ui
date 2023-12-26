import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import LeftNavigationBar from './components/LeftNavigationBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <NavBar />
      <LeftNavigationBar />
    </React.StrictMode>
  </BrowserRouter>
)
