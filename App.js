import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import AuthScreen from './screens/auth';
import WelcomeScreen from './screens/welcome';
import MapScreen from './screens/map';
import DeckScreen from './screens/deck';
import ReviewScreen from './screens/review';
import SettingsScreen from './screens/settings';

class App extends Component {
  render(){
    const MainNavigator = createAppContainer(createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: createBottomTabNavigator({
        map: MapScreen,
        deck: DeckScreen,
        review: createStackNavigator({
          review: {
            screen: ReviewScreen,
            navigationOptions: ({ navigation }) => ({
              headerTitle: 'Review Jobs',
              headerRight: <Button title='Settings' onPress={() => navigation.navigate('settings')} />
            })
          },
          settings: {
            screen: SettingsScreen
          }
        })
      })
    }));

    return (
      <MainNavigator />
    );
  }
}

export default App;
