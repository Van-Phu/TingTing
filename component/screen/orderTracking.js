import React, { useState, useEffect } from 'react';
import { 
    View,  
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    ImageBackground,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    Keyboard,
    AsyncStorage ,
    Dimensions,
    LogBox,
    RefreshControl} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useRoute } from '@react-navigation/native';

function OrderTracking({navigation}) {
  const [cartItems, setCartItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [idUser, setIdUser] = useState('')
  const [pendingProduct, setPendingProduct] = useState([])
  const [deliveredProduct, setDeliveredProduct] = useState([])
  const [idOrderPending, setIdOrderPending] = useState([])
  const [productPending, setProductPending] = useState([])
  const [listIdProduct, setListIdProduct] = useState([])
  const[dataProduct, setDataProduct] = useState([])
  const [dataDeliveryID, setDataDeliveryID] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [cost, setCost] = useState()
  const [routes] = useState([
    { key: 'pending', title: 'Đang giao' },
    { key: 'delivered', title: 'Đã giao' },
  ]);
  const route = useRoute();
  const { username } = route.params; 



  const fetchData = async () => {
    try {
      const userResponse = await fetch('http://192.168.25.1:5000/api/v1/users/getUserByName/' + username);
      const userData = await userResponse.json();
      setIdUser(userData._id);
      setCost(userData.cost)
      if (userData._id !== '') {
        const pendingResponse = await fetch('http://192.168.25.1:5000/api/v1/delivery/getPending/' + userData._id);
        const pendingData = await pendingResponse.json();
        setPendingProduct(pendingData);
        console.log(pendingData)
      }
      if (userData._id !== '') {
        const deliveredResponse = await fetch('http://192.168.25.1:5000/api/v1/delivery/getDelivered/' + userData._id);
        const deliveredData = await deliveredResponse.json();
        setDeliveredProduct(deliveredData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchDeleteData = async (id) => {
    try {
      const response1 = await fetch("http://192.168.25.1:5000/api/v1/delivery/getDeliveryById/" + id);
      const data = await response1.json();
      console.log(data)
      if(data[0].typeOfPayment === "Thanh toán bằng tiền mặt"){
        const response2 = await fetch("http://192.168.25.1:5000/api/v1/delivery/deleteDelivery/" + id);
        console.log("Xoa thanh cong!!");
        fetchData(); 
      }else{
        await repairProduct(data[0].totalPrice, data[0].quantity); 
        const response2 = await fetch("http://192.168.25.1:5000/api/v1/delivery/deleteDelivery/" + id);
        console.log("Xoa thanh cong!!");
        fetchData(); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  const repairProduct = async (costRefund, quantity) => {
    try {
        const res = await fetch('http://192.168.25.1:5000/api/v1/users/updateCose/' + idUser, {
          method: "PATCH",
          headers: {
            "content-Type": 'application/json'
          },
          body: JSON.stringify({
            cost: Number(cost) + (costRefund * quantity) 
          })
        });
    } catch (error) {
      console.log('Thanh toán không thành công!!', error);
    }
  };

  const deleteOrder = async (id) => {
    fetchData();
    Alert.alert('Thông báo!!', 'Bạn có muốn hủy đơn hàng không?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK',  onPress: () => fetchDeleteData(id)},
    ]);
  }

 

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'OrderTracking' }] 
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderPendingItems = ({ item }) => (
    <View style={{height: 210, width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <View style={{ padding: 10, flexDirection:'row', height: 130, alignItems:'center', width:'100%' }}>
          <View style={{height: 100, width:'20%', backgroundColor:'red', borderRadius: 20}}>
            <ImageBackground style={{height: '100%', width:'100%', flex:1}} source={{uri: item.idProduct.productAvatar}}></ImageBackground>
          </View>
          <View style={{height: '100%', width:'50%', marginRight: 20, marginLeft:20, justifyContent:'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color:'black'}}>{item.idProduct.productName}</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:18}}>Số lượng: </Text>
              <Text style={{fontSize:18}}>{item.quantity}</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:18}}>Giá: </Text>
              <Text style={{fontSize:18, color:'tomato'}}>{item.totalPrice} đ</Text>
            </View>
          </View>
          <View style={{height: '100%', width:'20%', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={() => deleteOrder(item._id)} style={{width:'100%', height:50, alignItems:'center', backgroundColor:'tomato', justifyContent:'center', borderRadius:20}}>
              <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      
      <View style={{height:'100%', width:'100%',  paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20, color:'black', fontWeight: 'bold'}}>Địa chỉ: </Text>
          <Text style={{fontSize:20, color:'tomato', fontWeight: 'bold'}}>{item.address}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20, color:'black', fontWeight: 'bold'}}>Hình thứ thanh toán: </Text>
          <Text style={{fontSize:20, color:'black', fontWeight: 'bold', color:'tomato'}}>{item.typeOfPayment}</Text>
        </View>
      </View>
    </View>
    
  );

  const renderDeliveredItems = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection:'row', height: 150, alignItems:'center', width:'100%' }}>
      <View style={{height: 100, width:"20%", backgroundColor:'red', borderRadius: 20}}>
        <ImageBackground style={{height: '100%', width:'100%', flex:1}} source={{uri: item.idProduct.productAvatar}}></ImageBackground>
      </View>
      <View style={{height: '100%', width:'50%', marginRight: 20, marginLeft:20, justifyContent:'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:'black'}}>{item.idProduct.productName}</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18}}>Số lượng: </Text>
          <Text style={{fontSize:18}}>{item.quantity}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18}}>Giá: </Text>
          <Text style={{fontSize:18, color:'tomato'}}>{item.totalPrice} đ</Text>
        </View>
      </View>
      <View style={{height: '100%', width:'20%', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity style={{width:'100%', height:50, alignItems:'center', backgroundColor:'tomato', justifyContent:'center', borderRadius:20}}>
          <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    pending: () => (
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
        data={pendingProduct}
        renderItem={renderPendingItems}
        keyExtractor={(item) => item.id}
      />
    ),
    delivered: () => (
      <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
        data={deliveredProduct}
        renderItem={renderDeliveredItems}
        keyExtractor={(item) => item.id}
      />
    ),
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'tomato' }}
      style={{ backgroundColor: 'white' }}
      activeColor="tomato"
      inactiveColor="gray"
    />
  );

  return (
      <TabView
      onPress={() => fetchDeleteData(itemId)}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
    
  );
}

export default OrderTracking;
