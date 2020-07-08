// CSS Imports
import 'materialize-css/dist/css/materialize.min.css'
import '../css/style.css'

// Materialize JS
import 'materialize-css'

// Firebase SDK
import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Config file
import { firebaseConfig } from './config/firebase-config'

// React
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// Components
import { App } from './App'

firebase.initializeApp(firebaseConfig)

// DEV ONLY
// firebase.firestore().settings({ host: 'localhost:8080', ssl: false })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
