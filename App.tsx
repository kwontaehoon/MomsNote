import React from 'react'
import Navigation from './component/Navigation/Main'
import { StatusBar  } from 'expo-status-bar'
import DefalutPage from './component/Default/Main'

const App = () => {
  
  return (
    <>
      <StatusBar backgroundColor="white" />
      <DefalutPage />
      {/* <Navigation /> */}
    </>
  )
}

export default App