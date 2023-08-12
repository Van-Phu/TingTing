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
    FlatList,
    ActivityIndicator,
    Picker, 
    ToastAndroid
  } from 'react-native';
  import {launchImageLibrary} from 'react-native-image-picker'
  import React, { useState, useEffect } from 'react';
  import DropDownPicker from 'react-native-dropdown-picker';
  import { useRoute } from '@react-navigation/native';
  
  
  export default function AddAddress({navigation}) {
    // const [addAddress, setAddress] = useState(null)

    const route = useRoute();
    const { selectedOrders } = route.params;
    const { selectedProductIds } = route.params;
    const [openCity, setOpenCity] = useState(false);
    const [valueCity, setValueCity] = useState(null);
    const [openDist, setOpenDist] = useState(false);
    const [valueDist, setValueDist] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [addressDetail, setAddressDetail] = useState('')
  

    const cities = [
      { label: 'Hồ Chí Minh', value: 'hcm' },
      { label: 'Hà Nội', value: 'hanoi' },
      { label: 'Đà Nẵng', value: 'danang' },
    ];

    const hcmDistricts = [
      { label: 'Quận 1', value: 'q1' },
      { label: 'Quận 2', value: 'q2' },
    ];

    const hanoiDistricts = [
      { label: 'Quận Ba Đình', value: 'badinh' },
      { label: 'Quận Hai Bà Trưng', value: 'haibatrung' },
    ];

    const danangDistricts = [
      { label: 'Quận Sơn Trà', value: 'sontra' },
      { label: 'Quận Hải Châu', value: 'haichau' },
    ];
    

    const districtData = () => {
      switch (valueCity) {
        case 'hcm':
          return hcmDistricts;
        case 'hanoi':
          return hanoiDistricts;
        case 'danang':
          return danangDistricts;
        default:
          return [];
      }
    };

    // s[etSelectedCity("Hello")
    // console.log(addAddress)

    const returnPayment = () => {
      navigation.goBack();
    }

    const addAD = async() => {
      if(addressDetail == ""){
        ToastAndroid.show("Địa chỉ không được để rỗng!!", ToastAndroid.SHORT);
      }else{
        const address = selectedCity + ", " + valueDist + ", " + addressDetail
        navigation.navigate("Payment", {address: address, selectedOrders: selectedOrders, selectedProductIds: selectedProductIds})
      }
    }

    return(
      <View style={{height:80, width:'90%', marginTop:30, marginLeft: '5%', marginRight:'5%'}}>
        <View style={{height:'100%', width:'100%', marginBottom:20, position:'relative', zIndex:100}}>
          <Text style={{fontSize:20, color:'tomato', fontWeight:'bold'}}>Chọn thành phố*:</Text>
          <DropDownPicker
            value={valueCity}
            open = {openCity}
            setOpen={setOpenCity}
            setValue={setValueCity}
            items={cities}
            containerStyle={{ height: 40 }}
            onSelectItem={(item) => {
              setSelectedCity(item.label)
            }}
          />
        </View>
        <View style={{height:80, width:'100%', position:'relative', zIndex: 99}}>
          <Text style={{fontSize:20, color:'tomato', fontWeight:'bold'}}>Chọn quận*:</Text>
          <DropDownPicker
            value={valueDist}
            open = {openDist}
            setOpen={setOpenDist}
            setValue={setValueDist}
            items={districtData()}
            defaultValue={selectedDistrict}
            containerStyle={{ height: 40 }}
            onSelectItem={(item) => {
              setSelectedDistrict(item.label)
            }}
          />
        </View>

        <View style={{height:100, width:'100%', marginTop:30}}>
          <Text style={{fontSize:20, color:'tomato', fontWeight:'bold'}}>Địa chỉ chi tiết*:</Text>
          <TextInput style={{borderWidth:1, borderRadius:10}} value={addressDetail} onChangeText={setAddressDetail}/>
        </View>

        <View style={{width:'100%',height:50, alignItems:'center', justifyContent:'center', marginTop:30}}>
          <TouchableOpacity onPress={() => addAD()} style={{width:300, height:50, backgroundColor:'tomato', borderRadius:20, alignItems:'center', justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontSize: 25, color:'#fff'}}>Xác nhận địa chỉ</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => returnPayment()} style={{width:300, height:50, backgroundColor:'white',borderWidth: 4, borderColor:'tomato',borderRadius:20, alignItems:'center', justifyContent:'center', marginTop:20}}>
            <Text style={{textAlign:'center', fontSize: 25, color:'tomato'}}>Quay về trang mua hàng</Text>
          </TouchableOpacity>
        </View>
       
    </View>
    )
  }