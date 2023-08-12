import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './loginScreen.js';
import Loading from './loadingScreen.js';
import Home from './mainNavigation.js'
import Signup from './signupScreen.js'
import InforProduct from './infoProductScreen.js'
import AccuraryScreen from './accuracyAccountScreen.js';
import GetSignupUserScreen from './getSignupUserScreen.js';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Home" component={Home}></Stack.Screen>
        <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
        <Stack.Screen name='Accurary' component={AccuraryScreen}></Stack.Screen>
        <Stack.Screen name='GetSignupUserScreen' component={GetSignupUserScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
