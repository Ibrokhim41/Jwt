import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { store } from './store/index'
import { Provider } from 'react-redux'
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root'))
axios.defaults.baseURL = 'localhost:5000/api'
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
