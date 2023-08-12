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
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconMater from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';


export default function BuyScreen({navigation}){
    const [product, setProduct] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const [inputText, setInputText] = useState('');
    const [productFlashSale, setProductFlashSale] = useState([])
    const [type, setType] = useState() 
    const route = useRoute();
    const { username } = route.params;
    console.log(username)

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    useEffect(() => {
        fetch('http://192.168.25.1:5000/api/v1/product/getAllProduct')
        .then(response => response.json())
        .then(data => {
            setProduct(data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        fetch('http://192.168.25.1:5000/api/v1/product/getProductFlashSale')
        .then(response => response.json())
        .then(data => {
            setProductFlashSale(data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        fetch('http://192.168.25.1:5000/api/v1/users/getUserByName/' + username)
        .then(response => response.json())
        .then(data => {
          setType(data.type)
        })
        .catch(error => {
            console.log(error)
        })
      }, [])
      
      useEffect(() => {
        fetch('http://192.168.25.1:5000/api/v1/users/getUserByName/' + username)
        .then(response => response.json())
        .then(data => {
          setType(data.type)
        })
        .catch(error => {
            console.log(error)
        })
      }, [])

    handleDeleteItem = (index) => {
        const newData = [...this.state.product];
        newData.splice(index, 1);
        this.setState({ data: newData });
      };

    const openAddProducts = () => {
        navigation.navigate('AddNewProduct', {
            username: username 
        })
    }
    const openOrderProduct = () => {
        navigation.navigate('Order', {username: username})
    }

   const getValueId = (id) => {
       navigation.navigate('InfoProduct', {id, username: username})
       console.log(id)
   }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Buying' }] 
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openShop = () => {
    if(type == 0){
      navigation.navigate('GetSignupScreen', {username: username})
    }else if(type == 1){
      navigation.navigate('ProductShop', {username: username})
    }
    
  }

  const handleTextInputChange = (text) => {
    setInputText(text);
  };

  const handleTextInputSubmit = () => {
    if(inputText === "") {

    }else{
        navigation.navigate('SearchScreen', {
            inputText: inputText,
            username: username
        });
        Keyboard.dismiss();
    }
  };

  const handleShirt = () => {
    navigation.navigate('SearchScreen', {
        inputText: "Áo",
        username: username
    })
  }


  const openFlashSaleScreen = () => {
    navigation.navigate('FlashSaleScreen', {
        username: username
    })
  }

const openOrderTracking = () => {
  navigation.navigate('OrderTracking', {username: username})
}

const openAddNewProduct = () => {
    if(type == 0){
      navigation.navigate('GetSignupScreen', {username: username})
    }else if(type == 1){
      navigation.navigate('AddNewProduct', {username: username})
    }
    
  }


  
 const renderItem = ({ item }) => {
        return (
          <TouchableOpacity onPress={() => getValueId(item._id)} style={{height: 300, width: 200, marginLeft: 20, left: -20, backgroundColor:'white', borderRadius: 20}}>
            <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}>
                </Image>
            </View>
            <View style={{width: '90%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginTop: 20, marginLeft: '5%'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato', marginRight: 10}}>{item.priceSale}</Text>
                  <Text style={{fontSize: 12, fontWeight: 'bold', color:'black', textDecorationLine:'line-through'}}>{item.price}</Text>
                </View>
                
            </View>         
          </TouchableOpacity>
        );
      };
      
    const renderAllItem = ({ item }) => {
        if(item.status === 0){
            return (
                <TouchableOpacity onPress={() => 
                  getValueId(item._id)} 
                  style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                  <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                      <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}>
                      </Image>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato'}}>{item.price}</Text>
                  </View>            
                </TouchableOpacity>
              );
        }
        else{
            return (
                <TouchableOpacity onPress={() => 
                  getValueId(item._id)} 
                  style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                  <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                      <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}>
                      </Image>
                  </View>
                  <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                      <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                      <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato', marginRight: 10}}>{item.priceSale}</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold', color:'black', textDecorationLine:'line-through'}}>{item.price}</Text>
                      </View>
                 
                  </View>            
                </TouchableOpacity>
              );
        }
        
      };

    return(
        <SafeAreaView>
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} 
            style={{width: '100%', backgroundColor:'#E3E3E3'}}>
                 <View style={{marginBottom: 20,height: 100, width: '100%', backgroundColor:'white'}}>
                    <View style={{width: '90%', justifyContent:'space-between', flexDirection:'row', marginTop: 10, marginLeft: '5%', alignItems:'center', height:40}}>
                        <TextInput
                            onSubmitEditing={handleTextInputSubmit}
                            onChangeText={handleTextInputChange}
                            returnKeyType='search'
                            placeholder="Tìm kiếm sản phẩm, quần áo..."
                            style={{ paddingLeft:20,height: 40, backgroundColor: '#DDDDDD', borderRadius: 50, justifyContent: 'center', width: '80%', alignItems:'center' }}
                            />
                            <Icon name="search" color={"tomato"} size={20} style={{ position: 'absolute', top: 10, right: 120 }} />
                        <View style={{height:'100%', width: '100%', flexDirection:'row', left: 30, alignItems:'center'}}>
                            <TouchableOpacity onPress={() => openOrderProduct()}>
                                <IconMater color={"tomato"} name="shopping-outline" size={30} style={{ right: 15 }} />   
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openOrderTracking()}>
                                <IconMater color={"tomato"} name="truck-delivery-outline" size={30} style={{right: 10}} />   
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openShop()}>
                                <IconMater color={"tomato"} name="basket-outline" size={30} style={{right: 5}} />   
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:10, width:'90%', marginLeft:'5%', flexDirection:'row',justifyContent:'space-around', marginRight: '5%'}}>
                        <TouchableOpacity 
                            onPress={handleShirt}
                            style={{maxWidth:90, alignItems:'center', height: 30, flexDirection:'row', justifyContent:'center', marginRight: 5, borderRadius: 10}}>
                            <Text style={{color:'black', fontWeight: '500', fontSize:18}}>Áo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                    
                            style={{maxWidth:90, alignItems:'center', height: 30, flexDirection:'row', justifyContent:'center', marginRight: 5, borderRadius: 10}}>
                            <Text style={{color:'black', fontWeight: '500', fontSize:18}}>Quần</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{maxWidth:90, alignItems:'center', height: 30, flexDirection:'row', justifyContent:'center', marginRight: 5, borderRadius: 10}}>
                            <Text style={{color:'black', fontWeight: '500', fontSize:18}}>Điện thoại</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{maxWidth:90, alignItems:'center', height: 30, flexDirection:'row', justifyContent:'center', marginRight: 5, borderRadius: 10}}>
                            <Text style={{color:'black', fontWeight: '500', fontSize:18}}>Thuốc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{maxWidth:90, alignItems:'center', height: 30, flexDirection:'row', justifyContent:'center', marginRight: 5, borderRadius: 10}}>
                            <Text style={{color:'black', fontWeight: '500', fontSize:18}}>Giày</Text>
                        </TouchableOpacity>
                    </View>          
                </View>
            <View style={{width: '90%', marginLeft:'5%'}}>
           
            <View style={{height: 50, width: '100%'}}>
                <ScrollView style={{ }} horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => openAddNewProduct()} style={{flexDirection:'row',height: '100%', width: 250, alignItems:'center', justifyContent: 'center', backgroundColor: 'tomato', borderRadius: 50}}>
                        <Icon name="search" size={20} color={'#fff'} style={{}} />
                        <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', marginLeft: 20}}>thêm sản phẩm mới</Text>
                    </TouchableOpacity>
                </ScrollView>
             </View>

            <View style={{height: 350, marginTop:20, marginBottom:20 }}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', height: 50}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Hot </Text>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30, color:'tomato'}}>Sale </Text>
                    </View>
                    
                    <TouchableOpacity onPress={openFlashSaleScreen}>
                        <Text style={{fontWeight: 'normal'}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                        <FlatList style={{width: '100%', flexDirection:'row'}}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={productFlashSale}
                            renderItem={renderItem}
                            keyExtractor={(_, index) => index.toString()}
                        />
                        
                </View>

            <View style={{height: "100%", width: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', height: 50, marginBottom: 20}}>
                <View style={{flexDirection:'row'}}>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30}}>Tất cả </Text>
                        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 30, color:'tomato'}}>Sản Phẩm </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{fontWeight: 'normal'}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', alignItems:'center', justifyContent:'center', height:'100%'}}>
                    <FlatList
                        numColumns={2}
                        data={product}
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