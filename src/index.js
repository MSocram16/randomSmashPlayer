import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './router'
import {
  BrowserRouter as Router
} from "react-router-dom"

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)