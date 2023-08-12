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
    Keyboard, FlatList, RefreshControl, LogBox
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function ChatScreen(){
    const route = useRoute();
    const { username } = route.params;
    const [userData, setUserData] = useState([])
    const [shopData, setShopData] = useState([])
    const {shop} = route.params;

    console.log(shop)

    useEffect(() => {
        fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
        .then(response => response.json())
        .then(data => {
            setUserData(data)
                    })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        fetch(`http://192.168.25.1:5000/api/v1/users/getUserByID/` + shop)
        .then(response => response.json())
        .then(data => {
            setShopData(data)
                    })
        .catch(error => {
            console.error(error);
        });
    }, []);

    console.log("shopData" + shopData.username)
    console.log(shopData._id)

    console.log("userData" + userData._id)
    console.log(userData.username)
    return(
        <View><Text>Chat</Text></View>
    )
}