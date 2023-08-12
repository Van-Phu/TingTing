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
    Keyboard, FlatList
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome5';


export default function DescribeProductShop({ navigation }) {
    const [product, setProduct] = useState([])
    const [userId, setUserId] = useState('')
    const [userCollab, setUserCollab] = useState([])

   

    const route = useRoute();
    const {id} = route.params;
    const { username } = route.params;


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://192.168.25.1:5000/api/v1/product/getProductByID/' + id);
            const data = await response.json();
            setProduct(data);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, []);
 

      useEffect(() => {
        const fetchUserCollab = async () => {
          try {
            if (product) {
              const response = await fetch('http://192.168.25.1:5000/api/v1/users/getUserByID/' + product.idCollab);
              const data = await response.json();
              setUserCollab(data);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchUserCollab();
      }, [product]);
       
    
      const getValueId = ()  => {
        navigation.navigate('Repair', {id, username: username})
      }
    
      const deleteProduct = async () => {
          try{
            const res = await fetch('http://192.168.25.1:5000/api/v1/product/deleteProductById/' + id,
              {
                method: "DELETE",
                headers:{
                  "content-Type": 'application/json'
                }
                
              }
            ) 
            const data = await res.json()
            if(res.status == 200){
              Alert.alert(
                "Thông báo!",
                "Xóa sản phẩm thành công!!",
                [
                    { text: 'Ok'}
                ]
            )
            returnShopScreen()
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
            console.log('Xóa sản phẩm không thành công!!')
          }
        }

    const renderAllDescribeProduct = ({item}) =>{
        return(
            <View style={{height: 500, width: 500, overflow: "hidden", backgroundColor:'black'}}>
                <ImageBackground style={{height: '100%', width: '100%'}} source={{uri: item}} ></ImageBackground>
            </View>
        )
    }
    const handleCancelPress = () => {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc là muốn hủy bỏ sản phẩm này không?",
          [
            {
              text: "No",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                deleteProduct();
                navigation.navigate('ProductShop'); // Trở về trang trước đó
              },
            },
          ],
          { cancelable: true }
        );
      };
    if (product.status == 1){
      return(
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} 
                style={{position: 'relative',width: '100%', backgroundColor: '#E3E3E3'}}>
                    <View style={{position: 'relative',width: '100%'}}>
                        <FlatList
                            horizontal={true}
                            data={product.productImage}
                            renderItem={renderAllDescribeProduct}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{width: '100%', marginTop: 10, height: 100, backgroundColor:'white', justifyContent:'center'}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>{product.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10, marginRight: 10, textDecorationLine: "line-through"}}>{product.price}</Text> 
                                    <Text style={{color: 'tomato', fontSize: 20, fontWeight: '500', marginTop: 10, marginRight: 10}}>{product.priceSale}</Text>                                    
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:100,width: '100%', marginTop: 10, height: 100, backgroundColor:'white', justifyContent:'center'}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>Mô tả sản phẩm</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10}}>{product.describe}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{width: "100%", height: 100, flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity style={{width: "50%", height: 100, backgroundColor: "#2e8b57", alignItems: "center", justifyContent: "center", flexDirection: "row"}}
                    onPress={() => 
                        getValueId()}>
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Sửa Sản Phẩm</Text>
                        <IconFont name="exchange-alt" size={50} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: "50%", height: 100, backgroundColor: "tomato", alignItems: "center", justifyContent: "center", flexDirection: "row"}} 
                    onPress={handleCancelPress}
                    >
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Xóa Sản Phẩm</Text>
                        <Icon  name="delete" size={45} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </View>
    )
    }
    else {
      return(
        <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} 
                style={{position: 'relative',width: '100%', backgroundColor: '#E3E3E3'}}>
                    <View style={{position: 'relative',width: '100%'}}>
                        <FlatList
                            horizontal={true}
                            data={product.productImage}
                            renderItem={renderAllDescribeProduct}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        />
                        <View style={{width: '100%', marginTop: 10, height: 100, backgroundColor:'white', justifyContent:'center'}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>{product.productName}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10, marginRight: 10}}>{product.price}</Text>                                    
                                </View>
                            </View>
                        </View>
                        <View style={{marginBottom:100,width: '100%', marginTop: 10, height: 100, backgroundColor:'white', justifyContent:'center'}}>
                            <View style={{width:'90%', left: '5%', right:'5%'}}>
                                <Text style={{color: 'black', fontSize: 25, fontWeight: '500'}}>Mô tả sản phẩm</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color: 'black', fontSize: 20, fontWeight: '500', marginTop: 10}}>{product.describe}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{width: "100%", height: 100, flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity style={{width: "50%", height: 100, backgroundColor: "#2e8b57", alignItems: "center", justifyContent: "center", flexDirection: "row"}}
                    onPress={() => 
                        getValueId()}>
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Sửa Sản Phẩm</Text>
                        <IconFont name="exchange-alt" size={50} color={"white"}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: "50%", height: 100, backgroundColor: "tomato", alignItems: "center", justifyContent: "center", flexDirection: "row"}} 
                    onPress={handleCancelPress}
                    >
                        <Text style={{color: "white", fontSize: 20, fontWeight: "bold", marginRight: 10}}>Xóa Sản Phẩm</Text>
                        <Icon  name="delete" size={45} color={"white"}/>
                    </TouchableOpacity>
                </View>
            </View>
    )
    }
   
        
}
    