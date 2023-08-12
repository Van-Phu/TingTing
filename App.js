import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './component/screen/navigation';
import BottomTabNavigator from "./component/screen/mainNavigation";


const App = () => {
  return (
    <AppNavigator>
      <BottomTabNavigator />
    </AppNavigator>
  );
};

export default App;