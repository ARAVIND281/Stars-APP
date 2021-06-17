import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import StarScreen from './screens/StarScreen';

export default function App() {
  return (

      <AppContainer />      
    
  );
}
//host.exp.exponent
const switchNavigator = createSwitchNavigator({
  HomeScreen: { screen: HomeScreen },
  StarScreen: { screen: StarScreen },
})

const AppContainer = createAppContainer(switchNavigator);