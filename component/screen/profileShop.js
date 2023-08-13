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


export default function profileShop({navigation}) {
    const handleBankAccountPress = () => {
        Alert.alert(
            "Thông báo!",
            "Tính năng chưa phát triển!!",
            [
                { text: 'Ok'}
            ]
        )
    };
  return ( 
    <SafeAreaView style={{ flex: 1, height: 700 }}>
        <ScrollView style={{ flex: 1, height: "100%" }}>
            <View style={{ height: 60, width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('ProductShop')}>
                        <Icon name='chevron-back' color="tomato" size={30}/>    
                    </TouchableOpacity>
                    <Text style={{ flex: 1, justifyContent: "center", textAlign: "center", color: "black", fontSize: 25, left: -20 }}>
                        Thiết Lập Tài Khoản Shop
                    </Text>
                </View>
            </View>
            <View style={{ height: 750, width: "100%", backgroundColor: "#ededed" }}>
                <View>
                    <View style={{ height: 40, width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "100%",justifyContent: "center", paddingLeft: 15}}>
                            <Text style={{ fontSize: 16, color: "black"}}>
                                Tài khoản của tôi
                            </Text>
                        </View>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row" }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={() => navigation.navigate('AccountAndProtectShop')}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Tài Khoản &  bảo mật </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                       
                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                        onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Địa Chỉ </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}>
                             <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Tài Khoản / Thẻ ngân hàng </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*2*/}
                <View>
                    <View style={{ height: 40, width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "100%",justifyContent: "center", paddingLeft: 15}}>
                            <Text style={{ fontSize: 16, color: "black"}}>
                                Cài Đặt
                            </Text>
                        </View>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row" }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Cài đặt chat </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Cài đặt thông báo </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                       
                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Người dùng đã bị chặn </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                             <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Ngôn Ngữ / Language </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                 {/*3*/}
                <View>
                    <View style={{ height: 40, width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <View style={{width: "100%",justifyContent: "center", paddingLeft: 15}}>
                            <Text style={{ fontSize: 16, color: "black"}}>
                                Hỗ Trợ
                            </Text>
                        </View>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row" }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Trung tâm hỗ trợ </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Tiêu chuẩn cộng đồng </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    {/*  */}
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Điều khoản TingApp </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                            <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}>Giới Thiệu </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View  style={{height: 50 , width: "100%", backgroundColor: "white", justifyContent: "center",
                    alignItems: "center",flexDirection: "row", marginTop: 2 }}>
                        <TouchableOpacity style={{width: "100%",justifyContent: "center", paddingLeft: 15 }}
                         onPress={handleBankAccountPress}
                        >
                             <View style={{flexDirection: "row", width: "95%"}} >
                                <Text style={{ fontSize: 18, color: "black", width: "95%"}}> Yêu cầu yêu tài khoản </Text>
                                <IconnMateri name='chevron-right' size={30} color={"black"} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                
                
                
                
            </View>
        </ScrollView>
    </SafeAreaView>


    
  )
}

const styles = StyleSheet.create({})