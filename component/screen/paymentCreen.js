import React, {useState, useEffect} from 'react';
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
  LogBox,
  ToastAndroid,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

function PaymentScreen({navigation}) {
  const [orderPayment, setOrderPayment] = useState([]);
  const route = useRoute();
  const {selectedOrders} = route.params;
  const {selectedProductIds} = route.params;
  const {address} = route.params;
  const [selectedOption, setSelectedOption] = useState('option1');
  let totalPrice = 0;
  const [typeOfPayment, setTypeOfPayment] = useState('');
  const idOrder = [];
  const [customer, setIdUser] = useState('');
  const [delivery, setDelivery] = useState('Flash Pro');

  const [person, setPerson] = useState([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  const [post, setPost] = useState('');
  const [follow, setFollow] = useState('');
  const [follower, setFollower] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [cost, setCost] = useState();
  const [id, setId] = useState();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const {username} = route.params;

  useEffect(() => {
    fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
      .then(response => response.json())
      .then(data => {
        setFullName(data.fullName);
        setEmail(data.email);
        setAvatar(data.avatar);
        setBackground(data.background);
        setPost(data.post);
        setFollow(data.follow);
        setFollower(data.follower);
        setImage(data.image);
        setCost(data.cost);
        setId(data._id);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  console.log(orderPayment)
  const PaymentHandler = async () => {
    try {
      if(cost < totalPrice && typeOfPayment === "Thanh toán bằng ví"){
        ToastAndroid.show("Tài khoản hiện tại không đủ!!", ToastAndroid.SHORT)
      }else{
        for (const data of orderPayment) {
          const res = await fetch('http://192.168.25.1:5000/api/v1/delivery/addNewDelivery', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              idProduct: data[0].items.product,
              customer: data[0].customer,
              totalPrice: data[0].items.price,
              address: address,
              typeOfPayment: typeOfPayment,
              delivery: delivery,
              status: data[0].status,
              quantity: data[0].items.quantity
            })
            }
          );
    
          const responseData = await res.json();
          if (res.status === 200) {
            await repairProduct();
            handlerPaid();
          } else {
            const message = responseData.message.toString();
            console.log(message);
            Alert.alert(
              'Thông báo!',
              message,
              [{ text: 'OK', style: 'cancel' }]
            );
          }
        }
      }
      
    } catch (error) {
      console.log('Mua hàng không thành công!!', error);
    }
  };


  orderPayment.forEach(group => {
    group.forEach(order => {
      totalPrice += order.items.quantity * order.items.price;
    });
  });

  const addAddres = () => {
    navigation.navigate('AddAdScreen', {
      selectedOrders: selectedOrders,
      selectedProductIds: selectedProductIds,
    });
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      if (selectedOrders.length > 0) {
        try {
          const orderPromises = selectedOrders.map(async orderId => {
            const response = await fetch(
              'http://192.168.25.1:5000/api/v1/order/getAllOrderSelectedByID/' +
                orderId,
            );
            const data = await response.json();
            setIdUser(data[0].customer);
            console.log(customer);
            return data;
          });

          const orderData = await Promise.all(orderPromises);
          setOrderPayment(orderData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchOrderData();
  }, [selectedOrders]);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (selectedOrders.length > 0) {
        try {
          const orderPromises = selectedOrders.map(async orderId => {
            const response = await fetch(
              'http://192.168.25.1:5000/api/v1/order/getAllOrderSelectedByID/' +
                orderId,
            );
            const data = await response.json();
            setIdUser(data[0].customer);
            return data;
          });

          const orderData = await Promise.all(orderPromises);
          setOrderPayment(orderData);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchOrderData();
  }, [selectedOrders]);

  const getIdOrder = async () => {
    for (let i = 0; i < selectedOrders.length; i++) {
      idOrder.push(selectedOrders[i]);
    }
  };
  getIdOrder();

 

  const [colorBtnNganhangClick, setColorClick] = useState('#A6A6A6');

  const [checkedTop, setCheckedTop] = useState(false);
  const [checkedBottom, setCheckedBottom] = useState(false);

  const handlePressTop = () => {
    const currentColor = colorBtnNganhangClick;
    if (currentColor  === '#A6A6A6' || selectedPayment === "Thanh toán bằng ví") {
      setCheckedTop(previousState => !previousState);
      setCheckedBottom(setColorClick('#A6A6A6'));
      setSelectedPayment(null);
      setTypeOfPayment("Thanh toán bằng ví")
    } 
    else {
      setTypeOfPayment("Thanh toán bằng tiền mặt")
      setCheckedTop(setColorClick('black'));
     
    }
    
  };
  const handlePressBottom = () => {
    const currentColor = colorBtnNganhangClick;
    if (currentColor  === '#A6A6A6' || selectedPayment === "Thanh toán bằng tiền mặt") {
      setCheckedBottom(previousState => !previousState);
      setCheckedTop(setColorClick('#A6A6A6'));
      setSelectedPayment(null);
      setTypeOfPayment("Thanh toán bằng tiền mặt")

    } 
    else {
      setTypeOfPayment("Thanh toán bằng tiền mặt")
      setCheckedBottom(setColorClick('black'));
    }
      
  };

  console.log(typeOfPayment)

  const renderItemDetails = item => {
    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'white',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{width: '70%', flexDirection:'row'}}>
              <Text style={{fontSize: 20}}>
                {item.item[0].items.product.productName}: 
              </Text>
              <Text style={{fontSize: 20, color:'tomato'}}> X{item.item[0].items.quantity}</Text>
            </View>
         
         
          <View style={{right: 0, position: 'absolute'}}>
            <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
              {item.item[0].items.quantity * item.item[0].items.price}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const handlerPaid = () => {
    navigation.navigate('PaidScreen', {
      data: orderPayment,
      selectedOrders: selectedOrders,
    });
  };


  const repairProduct = async () => {
    try {
      if(totalPrice === 0){
        ToastAndroid.show("Lỗi!", ToastAndroid.SHORT)
      }else{
        const res = await fetch('http://192.168.25.1:5000/api/v1/users/updateCose/' + id, {
          method: "PATCH",
          headers: {
            "content-Type": 'application/json'
          },
          body: JSON.stringify({
            cost: Number(cost) - totalPrice
          })
        });
      }
  
    } catch (error) {
      console.log('Thanh toán không thành công!!', error);
    }
  };

  


  return (
    <View style={{backgroundColor: '#E3E3E3', width: '100%', height: '100%'}}>
      <View
        style={{
          height: 110,
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 5,
          marginTop: 5,
        }}>
        <TouchableOpacity
          onPress={() => addAddres()}
          style={{
            width: '90%',
            marginLeft: '5%',
            height: '100%',
            marginRight: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '80%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Icon
                  name="location-outline"
                  color={'tomato'}
                  size={30}
                  style={{}}
                />
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  Địa chỉ nhận hàng
                </Text>
              </View>
              <View>
                <Text
                  style={{fontSize: 20, marginLeft: '5%', marginRight: '5%'}}>
                  {address}
                </Text>
              </View>
            </View>

            <View>
              <Icon name="arrow-forward" size={30} style={{}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 110,
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            marginLeft: '5%',
            height: '100%',
            marginRight: '5%',
          }}>
          <View style={{}}>
            <View style={{width: '80%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Icon
                  name="airplane-outline"
                  color={'tomato'}
                  size={30}
                  style={{}}
                />
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  Đơn Vị Vận chuyển (đang phát triển)
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
                FLASH PRO
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 250,
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <View style={{width: '100%', height: '100%'}}>
          <View style={{}}>
            <View style={{width: '80%', marginLeft: '5%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Icon
                  name="md-journal-outline"
                  size={30}
                  color={'tomato'}
                  style={{}}
                />
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  Hình thức thanh toán
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                width: '90%',
                height: 90,
                backgroundColor: '#D71028',
                marginLeft: '5%',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#828282',
                flexDirection: 'row',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <View
                style={{
                  width: 70,
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{width: 50, height: 50}}
                    source={{
                      uri: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-210607143251-637586731710784420.jpg',
                    }}></Image>
                </View>
              </View>
              <View
                style={{
                  width: '75%',
                  height: '100%',
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'center',
                  paddingLeft: 10,
                }}>
                <Text
                  style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>
                  Ví của tôi
                </Text>
                <Text style={{fontSize: 16, color: 'white'}}>
                  {cost}
                </Text>
              </View>

              <View style={{justifyContent: 'center', marginLeft: 10}}>
                <TouchableOpacity onPress={handlePressTop}>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: checkedTop
                        ? 'red'
                        : colorBtnNganhangClick,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'white',
                      }}></View>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View
              style={{
                marginLeft: '5%',
                flexDirection: 'row',
                height: 40,
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={handlePressBottom}>
                <View
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    backgroundColor: checkedBottom
                      ? 'red'
                      : colorBtnNganhangClick,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'white',
                    }}></View>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  alignContent: 'center',
                  marginLeft: 15,
                  fontSize: 20,
                  color: checkedBottom ? 'red' : colorBtnNganhangClick,
                }}>
                Thanh toán khi nhận hàng
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            marginLeft: '5%',
            height: '100%',
            marginRight: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Icon
                  name="md-gift-outline"
                  size={30}
                  color={'tomato'}
                  style={{}}
                />
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  Mã giảm giá
                </Text>
              </View>
            </View>

            <Icon name="arrow-forward" size={30} color={'tomato'} style={{}} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          maxHeight: '100%',
          width: '100%',
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            width: '90%',
            marginLeft: '5%',
            height: '100%',
            marginRight: '5%',
          }}>
          <View style={{}}>
            <View style={{}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Icon
                  name="md-gift-outline"
                  size={30}
                  color={'tomato'}
                  style={{}}
                />
                <Text
                  style={{marginLeft: 10, fontSize: 20, fontWeight: 'bold'}}>
                  Chi tiết đơn hàng
                </Text>
              </View>
            </View>
            <View style={{maxHeight: '100%', width: '100%'}}>
              <FlatList
                style={{maxHeight: '100%', width: '100%'}}
                data={orderPayment}
                renderItem={renderItemDetails}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 100,
          width: '100%',
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            marginLeft: '5%',
            width: '90%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'green'}}>{totalPrice}</Text>
          <TouchableOpacity
            onPress={() => PaymentHandler()}
            style={{
              width: 200,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'red',
              borderRadius: 20,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PaymentScreen;

