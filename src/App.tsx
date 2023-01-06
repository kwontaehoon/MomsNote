import React from 'react'
import { AppRegistry } from 'react-native'
import Navigation from './component/Navigation/Main'
import { StatusBar  } from 'expo-status-bar'
import DefalutPage from './component/Default/Login'
import { store } from './Redux/Store/Store'
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