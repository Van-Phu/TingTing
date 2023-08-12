import { NavigationContainer } from "@react-navigation/native";
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
    Keyboard, FlatList, LogBox, ToastAndroid
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { TabView, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatScreen from "./chatScreen";

function InfoProductScreen({navigation}){
    
    const [product, setProduct] = useState([])
    const [userId, setUserId] = useState('')
    const [userCollab, setUserCollab] = useState([])
    const [productMore, setProductMore] = useState([])
    const [selectedOrders, setSendBuyNow] = useState([]);
    const [shop, setShop] = useState([])
    // const [idCollab, setIdCollab] = useState('')    
    // console.disableYellowBox = true;


    const route = useRoute();
    const {id} = route.params;
    const { username } = route.params;



    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        LogBox.ignoreAllLogs()
      }, [])

      const fetchData = async () => {
        try {
          const productResponse = await fetch('http://192.168.25.1:5000/api/v1/product/getProductByID/' + id);
          const productData = await productResponse.json();
          setProduct(productData);
          setSendBuyNow([productData._id]);
    
  
          if (productData) {
            const userCollabResponse = await fetch('http://192.168.25.1:5000/api/v1/users/getUserByID/' + productData.idCollab);
            const userCollabData = await userCollabResponse.json();
            setUserCollab(userCollabData);
          }
    
          const userResponse = await fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username);
          const userData = await userResponse.json();
          setUserId(userData._id);
    
          const shopResponse = await fetch('http://192.168.25.1:5000/api/v1/supplier/getSuppliersByIdCollab/' + productData.idCollab);
          const shopData = await shopResponse.json();
          setShop(shopData);
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);


    const addToCart = async () => {
      if(username == "unknown"){

      }else{ 
        if(product.status === 0){
          if(userId == product.idCollab){
            ToastAndroid.show("Không thể mua sản phẩm của shop bạn!", ToastAndroid.SHORT)
          }else{
            try{
              const res = await fetch('http://192.168.25.1:5000/api/v1/order/addNewOrder',
                {
                  method: "POST",
                  headers:{
                    "content-Type": 'application/json'
                  },
                  body: JSON.stringify({
                    "customer": userId,
                    "items": 
                    {
                    "product": product._id,
                    "quantity": 1,
                    "price": product.price
                    },
                    "total":product.price * 1,
                    "status":"pending"
                  })
                }
              ) 
              
              const data = await res.json()
              if(res.status == 200){
                Alert.alert(
                  "Thông báo!",
                  "Thêm sản phẩm thành công!!",
                  [
                      { text: 'OK'}
                  ]
              )
              }
              else{
                const message = data.message.toString()
                Alert.alert(
                    "Thông báo!",
                    message,
                    [
                        { text: 'OK',style: 'cancel'}
                    ]
                )
            }
            }catch(error){
              console.log('Thêm sản phẩm không thành công!!')
            }
          }
        }else{
            try{
              if(userId == product.idCollab){
                ToastAndroid.show("Không thể mua sản phẩm của shop bạn!", ToastAndroid.SHORT)
              }else{
                const res = await fetch('http://192.168.25.1:5000/api/v1/order/addNewOrder',
                  {
                    method: "POST",
                    headers:{
                      "content-Type": 'application/json'
                    },
                    body: JSON.stringify({
                      "customer": userId,
                      "items": 
                      {
                      "product": product._id,
                      "quantity": 1,
                      "price": product.priceSale
                      },
                      "total":product.priceSale * 1,
                      "status":"pending"
                    })
                  }
                ) 
                
                const data = await res.json()
                if(res.status == 200){
                  Alert.alert(
                    "Thông báo!",
                    "Thêm sản phẩm thành công!!",
                    [
                        { text: 'OK'}
                    ]
                )
                }
                else{
                  const message = data.message.toString()
                  Alert.alert(
                      "Thông báo!",
                      message,
                      [
                          { text: 'OK',style: 'cancel'}
                      ]
                  )
              }
            }
              }catch(error){
                console.log('Thêm sản phẩm không thành công!!')
              }
        }
      }
    }

    const handleChatScreen = () => {
        navigation.navigate('ChatScreen', {
            username: username,
            shop: product.idCollab
        })
        console.log("Clicked")
    }

    const renderImageProduct = ({item}) =>{
        return(
            <Swiper style={{height: 300, width: '100%', backgroundColor:'#fff'}} showsButtons={true}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <Image
                    style={{width: '100%',height: '100%',resizeMode: 'contain'}}
                    source={{uri: item}}
                />
                </View>
            </Swiper>
        )
    }
    if(product.status === 0){
        return(
            <View style={{flex: 1, backgroundColor:'white'}}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} 
                style={{position: 'relative',width: '100%', backgroundColor: 'white', height:'100%'}}>
                    <View style={{position: 'relative',width: '100%'}}>
                        <FlatList
                            horizontal={true}
                            data={product.productImage}
                            renderItem={renderImageProduct}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{width: '100%', height: 100, marginTop: 20,backgroundColor:'white', justifyContent:'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopColor:'gray', borderTopWidth:0.5}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>{product.productName}</Text>
                            </View>
                        </View>

                        <View style={{width: '100%', maxHeight: 300, backgroundColor:'white', justifyContent:'center', marginTop:20, marginBottom: 20}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>Mô tả</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>{product.describe} VND</Text>
                                </View>
                            </View>
                        </View>
                    </View>        

                    <View style={{width: '100%', height: 100, backgroundColor:'white', justifyContent:'center'}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <View style={{height: 70, width: 70, backgroundColor:'black', borderRadius: 100, flexDirection:'row'}}>
                                    <ImageBackground style={{width:'100%', height:'100%'}} source={{uri: userCollab.avatar}}></ImageBackground>
                                    <View style={{height:'100%', width:300, justifyContent:'center', marginLeft: 20}}>
                                        <Text style={{fontSize:18, color:'black', fontWeight:'bold'}}>{shop.nameShop}</Text>
                                        <Text style={{fontSize:18, color:'black', fontWeight:'bold'}}>{shop.address}</Text>
                                    </View>
                                    <TouchableOpacity onPress={handleChatScreen} style={{height: 70, width: 100, backgroundColor:'tomato', alignItems:'center', justifyContent:'center', borderRadius: 20}}>
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Nhắn tin</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                </ScrollView >
                <View style={{height: 50, width:'90%', bottom: 20, position: 'absolute', flexDirection:'row', marginLeft:"5%", marginRight:"5%", justifyContent:'space-between'}}>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize: 20}}>Price</Text>
                    <Text style={{fontSize: 30, color:'black', fontWeight:'bold'}}>${product.price}</Text>
                  </View>
                  <TouchableOpacity onPress={() => addToCart()} style={{width: 300, height:'100%', backgroundColor:'tomato', alignItems:'center', justifyContent:'center', borderRadius: 10}}>
                      <Text style={{color: 'tomato', fontSize: 20, fontWeight: 'bold', width: 300, color:'white', alignItems:'center',justifyContent:'center', textAlign:'center'}}>Mua Ngay</Text>
                  </TouchableOpacity>
                </View>
                
              
            </View>
        )
    }else{
    return(
      <View style={{flex: 1, backgroundColor:'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} 
      style={{position: 'relative',width: '100%', backgroundColor: 'white', height:'100%'}}>
          <View style={{position: 'relative',width: '100%'}}>
              <FlatList
                  horizontal={true}
                  data={product.productImage}
                  renderItem={renderImageProduct}
                  keyExtractor={(_, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
              />
              <View style={{width: '100%', height: 100, marginTop: 20,backgroundColor:'white', justifyContent:'center', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopColor:'gray', borderTopWidth:0.5}}>
                  <View style={{width:'90%', left: '5%', right:'5%'}}>
                      <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>{product.productName}</Text>
                  </View>
              </View>

              <View style={{width: '100%', maxHeight: 300, backgroundColor:'white', justifyContent:'center', marginTop:20, marginBottom: 20}}>
                  <View style={{width:'90%', left: '5%', right:'5%'}}>
                      <Text style={{color: 'black', fontSize: 22, fontWeight: '600'}}>Mô tả</Text>
                      <View style={{flexDirection:'row'}}>
                          <Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>{product.describe}</Text>
                      </View>
                  </View>
              </View>
          </View>        

          <View style={{width: '100%', height: 100, backgroundColor:'white', justifyContent:'center'}}>
                  <View style={{width:'90%', left: '5%', right:'5%'}}>
                      <View style={{height: 70, width: 70, backgroundColor:'black', borderRadius: 100, flexDirection:'row'}}>
                          <ImageBackground style={{width:'100%', height:'100%'}} source={{uri: userCollab.avatar}}></ImageBackground>
                          <View style={{height:'100%', width:300, justifyContent:'center', marginLeft: 20}}>
                            <Text style={{fontSize:25, color:'black', fontWeight:'bold', fontFamily:"Roboto"}}>{shop.nameShop}</Text>
                            <View style={{flexDirection:'row'}}>
                              <Text style={{fontSize:18, fontWeight:'bold'}}>Địa chỉ: </Text>
                              <Text style={{fontSize:18, color:'black', fontWeight:'bold'}}>{shop.address}</Text>
                            </View>
                            
                          </View>
                          <TouchableOpacity onPress={handleChatScreen} style={{height: 70, width: 100, backgroundColor:'tomato', alignItems:'center', justifyContent:'center', borderRadius: 20}}>
                              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Nhắn tin</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
              </ScrollView >
              <View style={{height: 50, width:'90%', bottom: 20, position: 'absolute', flexDirection:'row', marginLeft:"5%", marginRight:"5%", justifyContent:'space-between'}}>
                <View style={{justifyContent:'center'}}>
                  <Text style={{fontSize: 20}}>Price</Text>

                  <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize: 30, color:'black', fontWeight:'bold', color:'tomato'}}>${product.priceSale}</Text>
                  <Text style={{fontSize: 20, color:'black', fontWeight:'bold',textDecorationLine:'line-through', marginLeft: 5}}>{product.price}</Text>
                  </View>
                 
                </View>
                <TouchableOpacity onPress={() => addToCart()} style={{width: 300, height:'100%', backgroundColor:'tomato', alignItems:'center', justifyContent:'center', borderRadius: 10}}>
                    <Text style={{color: 'tomato', fontSize: 20, fontWeight: 'bold', width: 300, color:'white', alignItems:'center',justifyContent:'center', textAlign:'center'}}>Mua Ngay</Text>
                </TouchableOpacity>
              </View>
              
            
          </View>
        )
        
    }
    

}

export default InfoProductScreen