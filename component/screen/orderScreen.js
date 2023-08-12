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
  Checkbox,
  RefreshControl,ToastAndroid
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';



function OrderScreen({navigation}) {
  const [order, setOrder] = useState([]);
  const [idUser, setIduser] = useState(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const[checkSelected, setCheckSelected] = useState(false)
  const [countItem, setCoutItem] = useState(0)
  const [totalPrice, setTotalPrice] = useState()
  const route = useRoute();
  const { username } = route.params;



  const mergeOrderData = (data1, data2) => {
    const orderMap = new Map();
    data1.forEach((order) => {
      orderMap.set(order._id, { ...order });
    });

    data2.forEach((order) => {
      const existingOrder = orderMap.get(order._id);
      if (existingOrder) {
        const mergedOrder = { ...existingOrder, ...order };
        orderMap.set(order._id, mergedOrder);
      } else {
        orderMap.set(order._id, { ...order });
      }
    });
    const mergedData = Array.from(orderMap.values());
    return mergedData;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.25.1:5000/api/v1/users/getUserByName/' + username);
        const data = await response.json();
        setIduser(data._id);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response1 = await fetch("http://192.168.25.1:5000/api/v1/order/getOrderByCusID/" + idUser);
        const data1 = await response1.json();
  
        const response2 = await fetch('http://192.168.25.1:5000/api/v1/order/getAllOrderByCus/' + idUser);
        const data2 = await response2.json();

        const mergedData = mergeOrderData(data1, data2);
  
        setOrder(mergedData);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    if (idUser !== null) {
      fetchOrderData();
    }
  }, [idUser]);


  const fetchOrderData = async () => {
    try {
      const response1 = await fetch("http://192.168.25.1:5000/api/v1/order/getOrderByCusID/" + idUser);
      const data1 = await response1.json();

      const response2 = await fetch('http://192.168.25.1:5000/api/v1/order/getAllOrderByCus/' + idUser);
      const data2 = await response2.json();

      const mergedData = mergeOrderData(data1, data2);

      setOrder(mergedData);
      
    } catch (error) {
      console.log(error);
    }finally{
      setRefreshing(false)
    }
  };

  const fetchDeleteData = async (id) => {
    try {
      const response = await fetch("http://192.168.25.1:5000/api/v1/order/deleteOrderById/" + id);
      console.log("Xoa thanh cong!!");
      fetchOrderData(); 
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleToggleCheck = (itemId) => {
    setOrder((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item._id === itemId) {
          const updatedItem = { ...item, checked: !item.checked };
          if (updatedItem.checked) {
            setSelectedOrderIds((prevIds) => [...prevIds, updatedItem._id]);
            setSelectedProductIds((prevIds) => [...prevIds, updatedItem.items.product]);
          } else {
            setSelectedOrderIds((prevIds) => prevIds.filter((id) => id !== updatedItem._id));
            setSelectedProductIds((prevIds) => prevIds.filter((id) => id !== updatedItem.items.product));
          }
          return updatedItem;
        }
        return item;
      });
      
      const checkedItemsCount = updatedData.filter((item) => item.checked).length;
      setCoutItem(checkedItemsCount);
  
      return updatedData;
    });
  };
  

  const payment = () => {
    if(countItem <= 0){
      ToastAndroid.show("Không có đơn hàng nào được chọn!!", ToastAndroid.SHORT, );
    }else{
      navigation.navigate("Payment", { selectedOrders: selectedOrderIds, selectedProductIds: selectedProductIds, username: username });
    }
  };

  // console.log(selectedOrderIds)
  // console.log(selectedProductIds)



  const handleDeleteSelected = () => {
    const selectedIds = selectedOrderIds;
    selectedIds.forEach((id) => {
      fetchDeleteData(id);
    });
    setSelectedOrderIds([]);
  };
  

  const renderRightActions = (itemId) => {
    return (
      <TouchableOpacity
        style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'flex-end', marginBottom:10}}
        onPress={() => fetchDeleteData(itemId)}
      >
        <View style={{height: '100%', width:100, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
          <AntDesign name="delete" size={30} color="white" />
        </View>
      </TouchableOpacity>
    );
  };

  const increaseQuantity = async (id) => {
    try {
      await fetch(`http://192.168.25.1:5000/api/v1/order/addQuantity/${id}`, {
        method: "PUT"
      });
      fetchOrderData(); 
    } catch (error) {
      console.log(error);
    }
  };
  
  const decreaseQuantity = async (id) => {
    try {
      const response = await fetch(`http://192.168.25.1:5000/api/v1/order/decreaseQuantity/${id}`, {
        method: "PUT"
      });
      const data = await response.json();
      const status = response.status
      if(status === 201){
        console.log(id)
        Alert.alert('Thông báo!!', 'Bạn có muốn xóa đơn hàng khỏi giỏ hàng không?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => fetchDeleteData(id)},
        ]);
      }
      fetchOrderData();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(order.length)
  
  const renderItem = ({ item }) => {
    if(1 == 0){
      <Text>Không có sản phẩm nào trong giỏ hàng</Text>
    }else{
      if(item.items.product.status === 0){
        return (
          <Swipeable renderRightActions={() => renderRightActions(item._id)}>
            <View style={{ height: 200, width: '100%', flexDirection: 'row', marginBottom: 10, backgroundColor: 'white'}}>
              <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => handleToggleCheck(item._id)}
              >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: item.checked ? 'red' : 'gray',
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20
                }}
              >
                {item.checked && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'tomato',
                    }}
                  />
                )}
              </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', paddingRight: '5%' }}>
                <View style={{ height: 100, width: 100, marginLeft: 20, borderRadius: 20, overflow: 'hidden' }}>
                  <ImageBackground
                    style={{ width: '100%', height: '100%', flex: 1 }}
                    source={{ uri: item.items.product.productAvatar }} />
                </View>
              </View>
    
              <View style={{ width: '100%', height: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center' }}>
                <View style={{ height: '50%', flexDirection: 'column', justifyContent: 'space-between', width: 340, marginRight: 20 }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{item.items.product.productName}</Text>
    
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>{item.items.product.price}</Text>
    
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ borderRadius: 10, width: 30, height: 30, backgroundColor: '#e3eeff', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item._id)}
                      style={{
                        borderRadius: 10,
                        width: 30,
                        height: 30,
                        backgroundColor: '#e3eeff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      // onPress={handleDecrement}
                    >
                    <Text>-</Text>
                  </TouchableOpacity>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>{item.items.quantity} item</Text>
                    <TouchableOpacity style={{ borderRadius: 10, width: 30, height: 30, backgroundColor: '#e3eeff', alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity
                        onPress={() => increaseQuantity(item._id)}
                        style={{
                          borderRadius: 10,
                          width: 30,
                          height: 30,
                          backgroundColor: '#e3eeff',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        // onPress={handleIncrement}
                      >
                      <Text>+</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Swipeable>
        )
      }else if(item.items.product.status === 1){
        return (
          <Swipeable renderRightActions={() => renderRightActions(item._id)}>
            <View style={{ height: 200, width: '100%', flexDirection: 'row', marginBottom: 10, backgroundColor: 'white'}}>
              <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => handleToggleCheck(item._id)}
              >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: item.checked ? 'red' : 'gray',
                  marginRight: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 20
                }}
              >
                {item.checked && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: 'tomato',
                    }}
                  />
                )}
              </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', paddingRight: '5%' }}>
                <View style={{ height: 100, width: 100, marginLeft: 20, borderRadius: 20, overflow: 'hidden' }}>
                  <ImageBackground
                    style={{ width: '100%', height: '100%', flex: 1 }}
                    source={{ uri: item.items.product.productAvatar }} />
                </View>
              </View>
    
              <View style={{ width: '100%', height: '100%', flexDirection: 'column', display: 'flex', justifyContent: 'center' }}>
                <View style={{ height: '50%', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{item.items.product.productName}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'tomato', marginRight: 10 }}>{item.items.product.priceSale}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', textDecorationLine:'line-through' }}>{item.items.product.price}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ borderRadius: 10, width: 30, height: 30, backgroundColor: '#e3eeff', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item._id)}
                      style={{
                        borderRadius: 10,
                        width: 30,
                        height: 30,
                        backgroundColor: '#e3eeff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      // onPress={handleDecrement}
                    >
                    <Text>-</Text>
                  </TouchableOpacity>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, marginLeft: 10, marginRight: 10, color: 'black' }}>{item.items.quantity} item</Text>
                    <TouchableOpacity style={{ borderRadius: 10, width: 30, height: 30, backgroundColor: '#e3eeff', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(item._id)}
                      style={{
                        borderRadius: 10,
                        width: 30,
                        height: 30,
                        backgroundColor: '#e3eeff',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                    <Text>+</Text>
                  </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Swipeable>
        )
    }
    }
    
  }

  return (
    <View>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#e3eeff', position: 'relative', paddingBottom: 100 }}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
          data={order}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchOrderData}/>
          }
        />
      </View>
      <View>
     
      </View>
      <View style={{ height: 150, width: '100%', position: 'absolute', bottom: 0, alignItems: 'center', backgroundColor:'white' }}>
        <View style={{width: '90%', height: 80, marginTop: 20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text></Text>
          <TouchableOpacity onPress={() => handleDeleteSelected()}>
            <Icon name="trash-bin-outline" size={50} color={"tomato"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => payment()} style={{ width: '100%', height: 50, backgroundColor: 'tomato', bottom: 0,position:'absolute',borderRadius: 20, flexDirection: 'column', justifyContent: 'center', right: 0 }}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: 'white' }}>Tiến hành thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>


  )
}

export default OrderScreen;
