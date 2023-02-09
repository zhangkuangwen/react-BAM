import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter} from "react-router-dom"
import 'tdesign-react/es/style/index.css';
import "./main.less"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)