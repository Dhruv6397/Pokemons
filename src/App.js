import React from 'react'
import './App.css'
import CardContainer from './components/CardContainer'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <>
    <div className='container'>
    <Navbar/>
      <CardContainer/>
    </div>  
    </>
  )
}
