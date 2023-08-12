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
  import Icon from 'react-native-vector-icons/FontAwesome';
  import Iconnicon from 'react-native-vector-icons/Ionicons';
  import IconnMateri from 'react-native-vector-icons/MaterialCommunityIcons';
  import { useRoute } from '@react-navigation/native';
  import { NavigationContainer } from "@react-navigation/native";
  import { isUndefined, log } from 'util';
  
  export default function AddProductByShop ({navigation}){
      const [productShop, setProductShop] = useState([])
      const route = useRoute();
      const { username } = route.params;
      const [userCollab, setUserCollab] = useState([])
      const [keyword, setKeyword] = useState('')
  
    //   const [randomBackgroundColor, setRandomBackgroundColor] = useState(getRandomColor());
    //   const [colorArray, setColorArray] = useState([]);
  
    //   function getRandomColor() {
    //       const letters = '0123456789ABCDEF';
    //       let color = '#';
    //       for (let i = 0; i < 6; i++) {
    //           color += letters[Math.floor(Math.random() * 16)];
    //       }
    //       return color;
    //   }
  
    //   useEffect(() => {
    //       const colors = [];
    //       for (let i = 0; i < 5; i++) { 
    //           colors.push(getRandomColor());
    //       }
    //       setColorArray(colors);
    //   }, []);
  
    //   useEffect(() => {
    //       const interval = setInterval(() => {
    //           setRandomBackgroundColor(colorArray[Math.floor(Math.random() * colorArray.length)]);
    //       }, 2000); 
    //       return () => clearInterval(interval);
    //   }, [colorArray]);
  
  
      
      useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        const fetchData = async () => {
          try {
            const response = await fetch(
              'http://192.168.25.1:5000/api/v1/users/getUserByName/' + username
            );
            const data = await response.json();
            setUserCollab(data);
            if (productShop) {
              const productResponse = await fetch('http://192.168.25.1:5000/api/v1/product/getProductByShopId/' + data._id);
              const productData = await productResponse.json();
              setProductShop(productData);
              
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [productShop]);
  
      const getValueId = (id) => {
          navigation.navigate('Describe', {id, username: username})
      }
      
      const renderAllItem = ({ item }) => {
          if(item.status === 0){
              return (
                  <TouchableOpacity 
                  onPress={() => 
                    getValueId(item._id)} 
                  style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                  <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                      <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}></Image>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color:'black'}}>{item.price}</Text>
                  </View>            
                  </TouchableOpacity>
              );
          }
          else{
              return (
                  <TouchableOpacity 
                  onPress={() => getValueId(item._id)} 
                  style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                  <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                      <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}></Image>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: 15, fontWeight: 'bold', color:'black', marginRight: 10, textDecorationLine:'line-through'}}>{item.price}</Text>
                          <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato'}}>{item.priceSale}</Text>
                      </View>
                  
                  </View>            
                  </TouchableOpacity>
              );
          }
          
      };
  
      return(
          <SafeAreaView style={{ flex: 1, height: "100%"}}>
              <View style={{ width: '100%', height: 200, position: 'relative' }}>
                  {userCollab.background ? (
                  <ImageBackground style={{ width: '100%', height: 200 }} source={{ uri: userCollab.background }}>
                  </ImageBackground>
                  ) : (
                  <ImageBackground style={{ width: '100%', height: 200 }} source={{ uri: "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" }}>
                  </ImageBackground>
                  )}
  
              <View style={{ width: '100%', height: "100%", position: 'absolute', zIndex: 999, top: 10, left: 10, backgroundColor: ""}}>
                  <View style={{  width: "100%", height: "20%",flexDirection: "row"}}>
                      <TouchableOpacity style={{ top: 5, left: 10, width: "10%" }}>
                          <Iconnicon size={24} name='chevron-back' color={"white"} />
                      </TouchableOpacity>
                      <View style={{ width: '90%', height: "100%", flexDirection: 'row', alignItems: 'center' }}>
                          <TextInput
                              returnKeyType='search'
                              placeholder='Search for product, cloth...'
                              placeholderTextColor="#f3f3f3"
                              style={{
                                  paddingLeft: 20,
                                  height: 40,
                                  backgroundColor: 'transparent',
                                  borderRadius: 1,
                                  width: '80%',
                                  color: '#f3f3f3',
                                  paddingVertical: 5,
                                  borderWidth: 0.4,
                                  borderColor: "#f3f3f3"
                                  
                              }}
                              value={keyword}
                              onChangeText={(text) => setKeyword(text)}
                              >
                              
                              </TextInput>
                          <TouchableOpacity style={{ marginLeft: -30 }}>
                              <Iconnicon size={24} name='search' color={'#f3f3f3'} />
                          </TouchableOpacity>
                      </View>   
                      <TouchableOpacity style={{ right: 15, width: "10%", position: 'absolute' }}>
                          <IconnMateri size={35} name='dots-horizontal' color={'#f3f3f3'} />
                      </TouchableOpacity>
                  </View>
                  <View style={{width: "100%", height: "50%", marginTop: 40, marginLeft: 10, flexDirection: 'row'}}>
                      <View style={{ width: 80, height: 80, borderRadius: 50, overflow: 'hidden' }}>
                          {userCollab.avatar ? (
                          <ImageBackground style={{ width: "100%", height: "100%"  }} source={{ uri: userCollab.avatar }}>
                          </ImageBackground>
                          ) : (
                          <ImageBackground style={{  width: "100%",  height: "100%"  }} source={{ uri: "https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png" }}>
                          </ImageBackground>
                          )}   
                      </View>
                      <View style={{ with: "60%", height: "80%", marginLeft: 15, alignContent: 'center', justifyContent: 'center'}}>
                          <Text style={{color: "white", fontSize: 22, fontWeight: "bold"}}>{userCollab.username}</Text>
                          <View style={{flexDirection: 'row'}}>
                              <Icon name="star" size={24} color={"#ffdf00"}/>
                              <Text style={{color: "white", fontSize: 18}}>4.9/5.0 | </Text>
                              <Text style={{color: "white", fontSize: 18}}> {userCollab.follower} người theo dõi</Text>
                          </View>
                      </View>      
                                 
                  </View>
              </View>
          </View>
          <View style={{ width: "100%" , height: 50, flexDirection: 'row', justifyContent:'space-between', 
              alignItems:'center', backgroundColor: "#E3E3E3"}}>
              <View style={{with: "70%", flexDirection:'row', marginLeft: 20}}>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>All Product </Text>
                  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30, color:'tomato'}}>Shop</Text>
              </View>
              <TouchableOpacity style={{ width: "30%", height: 40, marginRight: 10, backgroundColor: "transparent", 
                   borderColor:"tomato" ,borderWidth: 3, alignItems: "center", justifyContent: "center"}}
                  onPress={() => navigation.navigate('AddNewProduct')}>
                  <Icon name='plus' size={20} color= {"tomato"}> Add product</Icon>
              </TouchableOpacity>     
          </View>
  
          <ScrollView
              style={{ width: '100%', backgroundColor: '#E3E3E3'}}>
              <View style={{marginTop:20, marginBottom:20 }}>
                  <View style={{height: "100%", width: '100%'}}>
                      
                      <View style={{width: '100%', alignItems:'center', justifyContent:'center', height:'100%'}}>
                          <FlatList
                              numColumns={2}
                              data={productShop.filter(item => item.productName.toLowerCase().includes(keyword.toLowerCase()))}
                              renderItem={renderAllItem}
                              keyExtractor={(_, index) => index.toString()}
                          />
                      </View>
                  </View>
                  </View> 
          </ScrollView>
          </SafeAreaView>
      )
      }
  
  
  const styles = StyleSheet.create({})