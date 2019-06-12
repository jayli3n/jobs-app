import React, { Component } from 'react';
import { Expo, Notifications } from 'expo';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { Icon } from 'react-native-elements';
import { createAppContainer, SafeAreaView, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import store from './store';
import AuthScreen from './screens/auth';
import WelcomeScreen from './screens/welcome';
import MapScreen from './screens/map';
import DeckScreen from './screens/deck';
import ReviewScreen from './screens/review';
import SettingsScreen from './screens/settings';
import registerForPush from './services/push';

class App extends Component {
  componentDidMount() {
    registerForPush();
    Notifications.addListener((notification) => {
      const text = notification.data.text;
      const origin = notification.origin;

      if(origin === 'received' && text){
        Alert.alert(
          'New Push Notification Msg',
          text,
          [{ text: 'OK.' }]
        );
      }
    })
  }

  render(){
    const MainNavigator = createAppContainer(createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: createBottomTabNavigator({
        map: {
          screen: MapScreen,
          navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor }) => {
              return <Icon name='my-location' size={25} color={tintColor} />
            }
          }
        },
        deck: {
          screen: DeckScreen,
          navigationOptions: {
            tabBarLabel: 'Deck',
            tabBarIcon: ({ tintColor }) => {
              return <Icon name='description' size={25} color={tintColor} />
            }
          }
        },
        review: createStackNavigator({
          review: {
            screen: ReviewScreen,
            tabBarLabel: 'Review',
            navigationOptions: ({ navigation }) => ({
              headerTitle: 'Review Jobs',
              headerRight: <Button title='Settings' onPress={() => navigation.navigate('settings')} />
            }),
            tabBarIcon: ({ tintColor }) => {
              return <Icon name='star' size={25} color={tintColor} />
            }
          },
          settings: {
            screen: SettingsScreen
          }
        })
      })
    }, {
      navigationOptions: {
        tabBarVisible: false
      }
    }));

    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1}}>
          <MainNavigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
