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
    AsyncStorage ,
    FlatList
  } from 'react-native';
  import {launchImageLibrary} from 'react-native-image-picker'
  import { useRoute } from '@react-navigation/native';
  import React, { useState, useEffect } from 'react';
  import Icon from 'react-native-vector-icons/AntDesign'
  import IconMatell from 'react-native-vector-icons/MaterialIcons'
  
  
  export default function AddNewProduct({navigation}) {
    const [productImage, setImage] = React.useState([]);
    const [productName, setNameProduct] = React.useState('')
    const [price, setPriceProduct] = React.useState('')
    const [describe, setDescribeProduct] = React.useState('')
    const [productAvatar, setAvataProduct] = React.useState('')
    const [idCollab, setIdCollab] = React.useState('')
  
    const route = useRoute();
    const { username } = route.params;
  
    // function addDataToMongoDB(data) {
    //   // Thêm dữ liệu vào MongoDB ở đây
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 1000); // Làm mới trang sau 1 giây
    // }
  
    const returnShopScreen = () => {
      navigation.navigate('Shopping')
    }
  
    //Get id by username
    useEffect(() => {
      fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
      .then(response => response.json())
      .then(data => {
         setIdCollab(data._id)
                  })
      .catch(error => {
          console.error(error);
      });
  }, []);
  
    const addNewProduct = async () => {
      if(productName == "" || productAvatar == "" || idCollab == "" || price == "" || productImage == ""){
        Alert.alert(
          "Thông báo!",
          "Vui lòng nhập đầy đủ thông tin!!",
          [
              { text: 'OK'}
          ]
      )
      }else if (productImage.index < 2){
        Alert.alert(
          "Thông báo!",
          "Số ảnh phải nhiều hơn 2!!",
          [
              { text: 'OK'}
          ]
      )
      }
      else{
        try{
          const res = await fetch('http://192.168.25.1:5000/api/v1/product/addProduct',
            {
              method: "POST",
              headers:{
                "content-Type": 'application/json'
              },
              body: JSON.stringify({
                productName,
                productAvatar,
                idCollab,
                price,
                describe,
                productImage
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
          console.log('Thêm sản phẩm không thành công!!')
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
              <IconMatell name="clear" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        </View>
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
            <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Tên sản phẩm *</Text>
            <TextInput style={{}} value={productName} onChangeText={setNameProduct} placeholder='Nhập tên sản phẩm'></TextInput>
          </View>
  
          <View style={{height: 100, width: '100%', marginTop: 20, marginBottom: 20}}>
            <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Giá sản phẩm</Text>
            <TextInput style={{}} value={price} onChangeText={setPriceProduct} placeholder='Nhập giá sản phẩm'></TextInput>
          </View>
  
          <View style={{height: 100, width: '100%', marginTop: 20, marginBottom: 20}}>
            <Text style={{fontSize: 20, color: 'tomato', fontWeight: 'bold', marginBottom: 10}}>Mô tả sản phẩm</Text>
            <TextInput style={{}} value={describe} onChangeText={setDescribeProduct} placeholder='Nhập giá sản phẩm'></TextInput>
          </View>
  
          <View>
            <TouchableOpacity onPress={addNewProduct} style={{height: 50, width: '100%',backgroundColor: 'tomato', borderRadius: 20, alignItems:'center', justifyContent: 'center'}}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>Hoàn Thành</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
    );
  }