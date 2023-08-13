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
  import Icon from 'react-native-vector-icons/Ionicons';
  import IconnMateri from 'react-native-vector-icons/MaterialCommunityIcons';

  import { useRoute } from '@react-navigation/native';
  import { NavigationContainer } from "@react-navigation/native";

export default function accountAndProtect({navigation}) {
    const [dataShop, setDataShop] = React.useState('');
    const [userCollab, setUserCollab] = React.useState('');

    const [idShop, setIdShop] = React.useState('');
    const [nameShop, setNameShop] = React.useState('');
    const [addressShop, setAddRessShop] = React.useState('');
    const [cccdShop, setCCCDShop] = React.useState('');
    const [sdtShop, setSDTShop] = React.useState('');

    const [showFullPhoneNumber, setShowFullPhoneNumber] = React.useState(false);
    const [showFullCCCD, setShowFullCCCD] = React.useState(false);
    const [isSDTFocused, setIsSDTFocused] = React.useState(false);
    const [isCCCDFocused, setIsCCCDFocused] = React.useState(false);


    
    const route = useRoute();
    const { username } = route.params;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username);
                const data = await response.json();
                setUserCollab(data._id);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchUserData();
    }, [username]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.25.1:5000/api/v1/supplier/getSuppliersByIdCollab/' + userCollab);
                const data = await response.json();
                setDataShop(data);
                if (data) {
                    setIdShop(data._id);
                    setNameShop(data.nameShop);
                    setAddRessShop(data.address);
                    setSDTShop(data.phoneNumber);
                    setCCCDShop(data.cccd);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userCollab]);


    const updateInfo = async () => {
        if(nameShop == ""){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập vào tên shop!!",
                [
                    { text: 'Ok'}
                ])
        }else if (addressShop == ""){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập vào địa chỉ!!",
                [
                    { text: 'Ok'}
                ])
        }
        else if (sdtShop == ""){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập vào số điện thoại!!",
                [
                    { text: 'Ok'}
                ])
        }
        else if (cccdShop == ""){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập vào căn cước công dân!!",
                [
                    { text: 'Ok'}
                ])
        }else if (cccdShop.length != 12){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập lại căn cước công dân!! \nCăn cước công dân gồm 12 số",
                
                [
                    { text: 'Ok'}
                ])
        }
        else if (sdtShop.length != 10){
            Alert.alert(
                "Thông báo!",
                "Vui lòng nhập lại số điện thoại!! \nsố điện thoại gồm 10 số",
                
                [
                    { text: 'Ok'}
                ])
        }
        else{
            try{
                const res = await fetch('http://192.168.25.1:5000/api/v1/supplier/updateSuppliersByIdCollab/' + idShop,
                  {
                    method: "PATCH",
                    headers:{
                      "content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                        nameShop: nameShop,
                        address: addressShop, 
                        phoneNumber: sdtShop,
                        cccd: cccdShop
                    })
                  }
                ) 
                
                const data = await res.json()
                if(res.status == 200){
                  Alert.alert(
                    "Thông báo!",
                    "Sửa sản phẩm thành công!!",
                    [
                        { text: 'Ok'}
                    ])
                navigation.navigate('ProductShop')
                }
                else{
                  const message = data.message.toString()
                  console.log(message)
                  Alert.alert(
                      "Thông báo!",
                      message,
                      [
                          { text: 'OK',style: 'cancel'}
                      ]
                  )
              }
              }catch(error){
                console.log('Thêm sản phẩm không thành công!!', error)
              }
            }
        }
        
  return (
    <SafeAreaView style={{ flex: 1, height: 700 }}>
        <ScrollView style={{ flex: 1, height: "100%" }}>
            <View style={{ height: 60, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "white"}}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('ProfileShop')}>
                        <Icon name='chevron-back' color="tomato" size={30}/>    
                    </TouchableOpacity>
                    <Text style={{ flex: 1, justifyContent: "center", textAlign: "center", color: "black", fontSize: 25, left: -20 }}>
                        Tài Khoản & Bảo mật
                    </Text>
                </View>
            </View>
            <View style={{ height: 600, width: "100%", backgroundColor: "#ededed" }}>
                <View>
                    <View  style={{height: 200 , width: "100%",
                     justifyContent: "center", alignItems: "center",flexDirection: "row" }}>
                        <ImageBackground style={{  width: "100%",  height: "100%"  }} source={{ uri: "https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-1-3.jpg" }}/>
                        <View style={{width: 300, height: 100,position: "absolute", justifyContent: "center", alignItems: "center"}}>
                            <View style={{width: 100, height: 100, borderRadius: 50, backgroundColor: "red", overflow:"hidden"}}>
                                <ImageBackground style={{  width: "100%",  height: "100%"  }} source={{ uri: "https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-nam-1-600x600.jpg" }}/>
                            </View>
                            <Text style={{color: "white", fontSize: 20, width: 300, marginTop: 10}}>ID: {idShop}</Text>
                        </View>
                        
                    </View>
                    <View>
                        {/*  */}
                        <View style={{height: 50, width: '100%', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>Tên Shop của bạn</Text>
                                <Text style={{fontSize: 18, color: 'red', marginBottom: 10}}>*</Text>
                            </View>
                            <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: "gray",
                                padding: 5, paddingLeft: 10 , fontSize: 20, textAlign: "center"}}
                                value={nameShop} onChangeText={setNameShop}
                                placeholder='Nhập vào tên shop của bạn' />
                        </View>
                        {/*  */}
                        <View style={{height: 50, width: '100%', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>Địa chỉ</Text>
                            </View>
                            <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: "gray",
                                padding: 5, paddingLeft: 10 , fontSize: 20, textAlign: "center"}}
                                value={addressShop} onChangeText={setAddRessShop}
                                placeholder='Nhập vào địa chỉ' />
                        </View>
                        {/*  */}
                        <View style={{height: 50, width: '100%', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>Số điện thoại</Text>
                                <Text style={{fontSize: 18, color: 'red', marginBottom: 10}}>*</Text>
                            </View>
                            <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: isSDTFocused ? "tomato" : "gray",
                                padding: 5, paddingLeft: 10, fontSize: 20, textAlign: "center"}}
                                value={showFullPhoneNumber ? sdtShop : `${sdtShop.slice(0, 1)}*******${sdtShop.slice(-2)}`}
                                onChangeText={setSDTShop}
                                onFocus={() => {
                                    setShowFullPhoneNumber(true);
                                    setIsSDTFocused(true);
                                }}
                                onBlur={() => {
                                    setShowFullPhoneNumber(false);
                                    setIsSDTFocused(false);
                                }}
                                placeholder='Nhập vào SĐT' />
                        </View>
                        {/*  */}
                        <View style={{height: 50, width: '100%', marginTop: 20, marginBottom: 20, paddingLeft: 20, paddingRight: 20}}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={{fontSize: 18, color: 'black', marginBottom: 10}}>CCCD</Text>
                                <Text style={{fontSize: 18, color: 'red', marginBottom: 10}}>*</Text>
                            </View>
                            <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: isCCCDFocused ? "tomato" : "gray",
                                padding: 5, paddingLeft: 10, fontSize: 20, textAlign: "center"}}
                                value={showFullCCCD ? cccdShop : `${cccdShop.slice(0, 1)}*********${cccdShop.slice(-2)}`}
                                onFocus={() => {
                                    setShowFullCCCD(true);
                                    setIsCCCDFocused(true);
                                }}
                                onBlur={() => {
                                    setShowFullCCCD(false);
                                    setIsCCCDFocused(false);
                                }}
                                onChangeText={setCCCDShop}
                                placeholder='Nhập vào CCCD' />
                        </View>
                    </View>
                </View>     
            </View>
            <View style = {{justifyContent:"center", alignItems: "center"}}>
                <TouchableOpacity  
                onPress={updateInfo}
                style={{height: 50, width: '48%',backgroundColor: '#2e8b57', borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})