import React from 'react'
import Navigation from './src/component/Navigation/Main'
import { StatusBar  } from 'expo-status-bar'
import DefalutPage from './src/component/Default/Login'
import { store } from './src/Redux/Store/Store'
import { Provider } from 'react-redux'
// import { Counter } from './Redux/slices/Counter'

const App = () => {
  
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="white" />
      {/* <DefalutPage /> */}
      <Navigation />
    </Provider>
  )
}

export default App