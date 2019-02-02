import React from 'react'
import ReactDOM from 'react-dom'

import FractionForm from './FractionForm.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App" style={{ paddingTop: '3rem' }}>
      <FractionForm />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
