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
import { useRoute } from '@react-navigation/native';


export default function GetSignupShopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params;  

  const createShop = () => {
    navigation.navigate("SignupSupplier", {username: username})
  }


  return (
    <SafeAreaView>
      <View style={{width: '100%', height: '100%'}}>
        <ImageBackground style={{height: '100%', width: '100%'}} source={require('../source/createShop.png')}>
          <View style={{position:'absolute', marginTop:300, width: 300, height:'100%', alignItems:'center', marginLeft:'5%'}}>
            <TouchableOpacity onPress={() => createShop()} style={{height: 50, width:'100%',justifyContent:'center' ,backgroundColor:'tomato', marginLeft: '5%', borderRadius: 20}}>
              <Text style={{color:'white', fontSize: 30, textAlign:'center', fontWeight:'bold'}}>Mở cửa hàng</Text>
            </TouchableOpacity>
            <Text style={{marginLeft:'5%', color:'white'}}>Tingapp.com</Text>
          </View>
        
        </ImageBackground>
        
      </View>
    </SafeAreaView>
  );
}
