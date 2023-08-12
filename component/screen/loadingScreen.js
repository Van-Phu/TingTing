import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';


export default function Loading() {
  const navigation = useNavigation();
  setTimeout(
    (checkLoad = () => {
      navigation.navigate('Login', {username: "unknown"});
    }),
    2500,
  );

  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%'}}>
        <Image style={{height: '100%', width: '100%'}} source={require('../source/loadingScreen.png')}></Image>
      </View>
    </SafeAreaView>
  );
}
