import React, { useState, useEffect } from 'react';
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
  Keyboard,
  AsyncStorage,
  FlatList,
  Dimensions,
  Pressable,
  Checkbox
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import background from '../source/buySucces.png'

function PaidScreen({navigation}){
    const route = useRoute();
    const {data, selectedOrders} = route.params
    const handlerReturnBuyingScreen = () => {
        navigation.navigate("Shopping")
    }
    console.log(data)
    const fetchDeleteData = async (id) => {
        try{
          const response = await fetch("http://192.168.25.1:5000/api/v1/order/deleteOrderById/" + id);
          const data = await response.json();
          console.log("Xoa thanh cong!!")
          setRefreshing(true);
          
        }catch(error){
          console.log(error)
        }
      }
    const handleDeleteSelected = () => {
        const selectedIds = selectedOrders;
        selectedIds.forEach((id) => {
          fetchDeleteData(id);
        });
      };
    
      handleDeleteSelected()
    return(
        <View style={{height: '100%', width:'100%',backgroundColor:'red'}}>
            <ImageBackground style={{height: '100%', width: '100%'}} source={background}>
                <TouchableOpacity onPress={handlerReturnBuyingScreen} style={{width: '90%', height: 50, backgroundColor:'white', marginTop: 700, marginLeft: '5%', borderRadius:20, alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: 'tomato'}}>Quay về mua hàng</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default PaidScreen;