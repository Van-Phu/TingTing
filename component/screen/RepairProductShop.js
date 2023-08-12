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
    Keyboard, FlatList, LogBox,
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox'
import { useRoute } from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome5';

export default function RepairProductShop ({navigation}) {
  const [productImage, setImage] = React.useState([]);
  const [productName, setNameProduct] = React.useState('');
  const [describe, setDescribeProduct] = React.useState('');
  const [productAvatar, setAvataProduct] = React.useState('');
  const [idCollab, setIdCollab] = React.useState('');
  const [price, setPriceProduct] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [priceSale, setPriceSale] = React.useState('');

 
  //đỗi màu textinput
  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isFocusedPrice, setIsFocusedPrice] = useState(false);
  const [isFocusedDes, setIsFocusedDes] = useState(false);
  const [isFocusedPriceSale, setIsFocusedPriceSale] = useState(false);

  //checkbox cho giảm giá
  const [isSelected, setSelection] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);

  //lấy dữ liệu
  const route = useRoute();
  const {id} = route.params;
  const { username } = route.params;

  const [product, setProduct] = useState([])
  const [userCollab, setUserCollab] = useState([])

  function addDataToMongoDB(data) {
    // Thêm dữ liệu vào MongoDB ở đây
    setTimeout(() => {
      window.location.reload();
    }, 1000); // Làm mới trang sau 1 giây
  }
  

  const handleFocusName = () => {
    setIsFocusedName(true);
  };
  const handleFocusPrice = () => {
    setIsFocusedPrice(true);
  };
  const handleFocusDes = () => {
    setIsFocusedDes(true);
  };
  const handleFocusPriceSale = () => {
    setIsFocusedPriceSale(true);
  };

  const handleBlurName = () => {
    setIsFocusedName(false);
  };
  const handleBlurPrice = () => {
    setIsFocusedPrice(false);
  };
  const handleBlurDes = () => {
    setIsFocusedDes(false);
  };
  const handleBlurPriceSale = () => {
    setIsFocusedPriceSale(false);
  };

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
  
  // useEffect(() => {
  //   // Nếu status nhận từ cơ sở dữ liệu là 1, tự động check checkbox
  //   setSelection(status === 1);
  //   // Nếu checkbox không được chọn (status = 0), đặt giá giảm về 0
  //   if (status === 0) {
  //     setPriceSale(0);
  //   }
  // }, [status]);

  useEffect(() => {
    if (product) {
      setNameProduct(product.productName);
      setPriceProduct(product.price)
      setDescribeProduct(product.describe);
      setImage(product.productImage)
      setStatus(product.status)
      setPriceSale(product.priceSale)
    }
  }, [product]);

 
  
  const handleSelection = (value) => {
    setSelection(value);
    setStatus(value ? 1 : 0);
    // Nếu checkbox không được chọn, đặt giá giảm về 0
    if (!value) {
      setPriceSale(0);
    }
    
  };

  useEffect(() => {
    // Nếu status nhận từ cơ sở dữ liệu là 1, tự động check checkbox
    setSelection(status === 1);
    // Nếu checkbox không được chọn (status = 0), đặt giá giảm về 0
    if (status === 0) {
      setPriceSale(0);
    }
  }, [status]);
    
  const repairProduct = async () => {
    if(productName == ""  || price == "" || productImage == "" || describe == ""){
      Alert.alert(
        "Thông báo!",
        "Vui lòng nhập đầy đủ thông tin!!",
        [
            { text: 'OK'}
        ]
    )}else if (productImage.index < 2){
      Alert.alert(
        "Thông báo!",
        "Số ảnh phải nhiều hơn 2!!",
        [
            { text: 'OK'}
        ]
    )}else if (status === 1 && priceSale <= 0){
      Alert.alert(
        "Thông báo!",
        "Giá tiền giảm không được nhỏ hơn hoặc bằng 0",
        [
            { text: 'OK'}
        ]
      )
    }else if ( price <= 0){
      Alert.alert(
        "Thông báo!",
        "Giá tiền không được nhỏ hơn hoặc bằng 0",
        [
            { text: 'OK'}
        ]
      )
    }
    else{
      try{
        const res = await fetch('http://192.168.25.1:5000/api/v1/product/updateAllProducts/' + id,
          {
            method: "PATCH",
            headers:{
              "content-Type": 'application/json'
            },
            body: JSON.stringify({
              productName,
              price,
              describe,
              productImage,
              status,
              priceSale
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
            ]
        )
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

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage([...productImage,String(response.assets[0].uri)]);
        productImage.reverse()
        setAvataProduct(productImage[0])
      }
    });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...productImage];
    updatedImages.splice(index, 1);
    setImage(updatedImages);
  };

  const RenderImage = ({ item, index }) => {
    return (
      <View style={{ height: 200, width: 200, marginLeft: 20, overflow: "hidden", backgroundColor: 'black' }}>
        <Image style={{ height: '100%', width: '100%' }} source={{ uri: item }} />
        <View style={{ position: 'absolute', top: 5, right: 3 }}>
        <TouchableOpacity onPress={() => handleDeleteImage(index)}>
          <View style={{ backgroundColor: '#d5d5d5', padding: 2, borderRadius: 20 }}>
            <Icon name="clear" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
      </View>
    );
  };

    // Trong component của bạn
const handleCancelPress = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc là muốn hủy bỏ thay đổi?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate('Describe')
          },
        },
      ],
      { cancelable: true }
    );
  };




  return (
    <ScrollView style={{height: '100%', width: '100%'}}>
      <View style={{height: '100%', width: '90%', marginLeft:'5%'}}>
      <View style={{height: 300, width:'100%', marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Thêm ảnh sản phẩm *</Text>
          <FlatList
                        horizontal={true}
                        data={productImage}
                        renderItem={RenderImage}
                        keyExtractor={(_, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
          />
          <Button title='Chọn ảnh' onPress={handleChoosePhoto}></Button>
        </View>

        <View style={{height: 100, width: '100%', marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Tên sản phẩm * </Text>
          <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: isFocusedName ? 'tomato' : 'gray',
              padding: 10,}}
            onFocus={handleFocusName}
            onBlur={handleBlurName}
            value={productName} onChangeText={setNameProduct} placeholder='Nhập tên sản phẩm'  />
        </View>

        <View style={{height: 100, width: '100%', marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Giá sản phẩm *</Text>
          <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: isFocusedPrice ? 'tomato' : 'gray',
              padding: 10,}}
            onFocus={handleFocusPrice}
            onBlur={handleBlurPrice}
          value={price ? price.toString() : ''} onChangeText={setPriceProduct} placeholder='Nhập giá sản phẩm' />
        </View>

        <View style={{height: 100, width: '100%', marginTop: 20, marginBottom: 20}}>
          <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Mô tả sản phẩm</Text>
          <TextInput style={{borderRadius: 8, borderWidth: 2, borderColor: isFocusedDes ? 'tomato' : 'gray',
              padding: 10,}}
              onFocus={handleFocusDes}
              onBlur={handleBlurDes} 
              value={describe} onChangeText={setDescribeProduct} placeholder='Nhập giá sản phẩm'/>
        </View>

        <View>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <CheckBox
              
              value={isSelected}
              onValueChange={handleSelection}
              style={{ alignSelf: 'center'}}
            />
            <Text style={{ fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10 }}>Giảm giá</Text>
          </View>

          {isSelected ? (
            <View style={{ height: 150, width: '100%', marginTop: 20, marginBottom: 20 }}>
              <Text style={{ fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10 }}>Nhập giá giảm *</Text>
              <TextInput
                style={{
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: isFocusedDes ? 'tomato' : 'gray',
                  padding: 10,
                }}
                onFocus={handleFocusPriceSale}
                onBlur={handleBlurPriceSale}
                value={priceSale === 0 ?  '0' : priceSale.toString() } onChangeText={setPriceSale}
                placeholder='Nhập giá giảm'
              />
            </View>
          ) : null}

          {/* ... other elements ... */}
        </View>


        <View style = {{flexDirection: "row", justifyContent:"space-between"}}>
          <TouchableOpacity onPress={repairProduct} style={{height: 50, width: '48%',backgroundColor: '#2e8b57', borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelPress} style={{height: 50, width: '48%',backgroundColor: 'tomato', borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </ScrollView>
  )
}
