import React, {useState, useEffect} from 'react';
// const React = require('react');
// const useState = React.useState;
import signupBackground from '../source/signupScreen.png';
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
  AsyncStorage 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
function SignupSupplier({navigation}){
  const returnHome = () => {
    navigation.navigate('Home')
  }
  const route = useRoute();
  const { username } = route.params;
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cccd, setCccd] = useState('');
  const [nameShop, setNameShop] = useState('');
  const [idCollab,setIdCollab] = useState('')

  useEffect(() => {
    fetch('http://192.168.25.1:5000/api/v1/users/getUserByName/' + username)
    .then(response => response.json())
    .then(data => {
      setIdCollab(data._id)
    })
    .catch(error => {
        console.log(error)
    })
  }, [])

  console.log(idCollab)

  const signupHandler = async () => {
    try {
  
      if (!phoneNumber || !cccd || !nameShop || !address) {
        Alert.alert('Thông báo!', 'Vui lòng điền đầy đủ thông tin.');
        return; 
      }
  
      // Validate phone number format (only digits)
      if (!/^\d{10}$/.test(phoneNumber)) {
        Alert.alert('Thông báo!', 'Số điện thoại phải chứa đúng 10 chữ số.');
        return; 
      }
  
      
      if (!/^\d{11}$/.test(cccd)) {
        Alert.alert('Thông báo!', 'CCCD phải chứa đúng 11 chữ số.');
        return; 
      }
  
      
      const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (specialCharsRegex.test(nameShop) || specialCharsRegex.test(address)) {
        Alert.alert('Thông báo!', 'Tên cửa hàng và địa chỉ không được chứa ký tự đặc biệt.');
        return; 
      }
  
      const res = await fetch(
        'http://192.168.25.1:5000/api/v1/providers/sigupDrawn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            phoneNumber,
            cccd,
            nameShop,
            idCollab,
          }),
        }
      );
  
      const data = await res.json();
      if (res.status === 201) {
        Alert.alert('Thông báo!', 'Tạo tài khoản thành công!!', [
          { text: 'OK', onPress: () => returnHome() },
        ]);
      } else {
        const message = data.message.toString();
        console.log(message);
        Alert.alert('Thông báo!', message, [{ text: 'OK', style: 'cancel' }]);
      }
  
    } catch (error) {
      console.log('Error during signup:', error.message);
      Alert.alert('Thông báo!', 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
    }
  };
    return(
      <ScrollView scrollEnabled={false} style={{ flex: 1 }}>
      <View style={{ height: 200, width: '100%', backgroundColor: 'tomato' }}>
        <ImageBackground
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          source={{uri: 'https://ee3v7pn43nm.exactdn.com/wp-content/uploads/2023/10/Top-10-Nen-Tang-Tao-App-Ban-Hang-Hieu-Qua-Va-Chat-Luong-Trong-Nam-2022.png?strip=all&lossy=1&ssl=1'}}
        >
         
        </ImageBackground>
      </View>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: '-10%',
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          paddingVertical: 20,
          paddingHorizontal: '5%',
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'tomato', fontSize: 20, marginLeft: '5%' }}>Số điện thoại</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            textAlign="center"
            placeholder="Nhập số điện thoại"
            placeholderTextColor="tomato"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'tomato', fontSize: 20, marginLeft: '5%' }}>CCCD</Text>
          <TextInput
            value={cccd}
            onChangeText={setCccd}
            style={styles.input}
            textAlign="center"
            placeholder="Nhập CCCD"
            placeholderTextColor="tomato"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'tomato', fontSize: 20, marginLeft: '5%' }}>Tên cửa hàng</Text>
          <TextInput
            value={nameShop}
            onChangeText={setNameShop}
            style={styles.input}
            textAlign="center"
            placeholder="Nhập tên cửa hàng"
            placeholderTextColor="tomato"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: 'tomato', fontSize: 20, marginLeft: '5%' }}>Địa chỉ</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            textAlign="center"
            placeholder="Nhập địa chỉ"
            placeholderTextColor="tomato"
          />
        </View>
    
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <TouchableOpacity
            onPress={() => signupHandler()}
            style={styles.button}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Đăng ký tài khoản
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => returnHome()}
            style={[styles.button, { backgroundColor: 'white', borderColor: 'tomato' }]}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'tomato' }}>
              Quay về trang chủ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
      
  )}
  const styles = {
    input: {
      width: '100%',
      height: 50,
      borderRadius: 100,
      borderColor: 'tomato',
      borderWidth: 3,
      fontSize: 20,
      color: 'tomato',
      textAlign: 'center',
    },
    button: {
      width: '60%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'tomato',
      borderRadius: 100,
      marginBottom: 20,
    },
  };

    
export default SignupSupplier;