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
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Keyboard,
  AsyncStorage,
  Animated,
  ToastAndroid
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import background from '../source/backgroundAcc.png';

const AccuraryScreen = ({ navigation }) => {
  const route = useRoute();
  const { username } = route.params;
  const { password } = route.params;
  const { email } = route.params;
  const { fullName } = route.params;
  const [typeCode, setTypeCode] = useState(1);
  const [codeMail, setCodeMail] = useState(1);
  const [timer, setTimer] = useState(300);
  const [isMounted, setIsMounted] = useState(false);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) {
      fetch('http://192.168.25.1:5000/api/v1/users/sendMail/' + email)
        .then(response => response.json())
        .then(data => {
          setCodeMail(data)
        })
        .catch(error => {
          console.log(error)
        });

      setIsMounted(true);
    }
  }, [isMounted]);

  const sendMail = async (email) => {
    fetch('http://192.168.25.1:5000/api/v1/users/sendMail/' + email)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setCodeMail(data)
    })
    .catch(error => {
        console.log(error)
    })
  };

  const signupHandler = async () => {
    try {
      if (typeCode != codeMail) {
        Alert.alert(
          'Thông báo!',
          'Mã xác nhận không hợp lệ!! Vui lòng kiểm tra lại!!',
          [{ text: 'OK' }]
        );
      } else {
        const res = await fetch('http://192.168.25.1:5000/api/v1/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password,
            email,
            fullName
          })
        });
        const data = await res.json();
        if (res.status === 201) {
          Alert.alert(
            'Thông báo!',
            'Tạo tài khoản thành công!!',
            [{ text: 'OK', onPress: () => handleReturnHomePage() }]
          );
          setTimer(-1)
        } else {
          const message = data.message.toString();
          console.log(message);
          Alert.alert(
            'Thông báo!',
            message,
            [{ text: 'OK', style: 'cancel' }]
          );
        }
      }
    } catch (error) {
      console.log('Tạo tài khoản không thành công!!');
    }
  };

  const handleReturnHomePage = () => {
    navigation.navigate('Home', { username: username });
  };

  const handlerReturnSignup = ( ) => {
    navigation.navigate("Signup")
  }

  useEffect(() => {
    if (timer === 0) {
      setTimer(0)
      navigation.navigate("Signup")
    }
  }, [timer, navigation]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={{ height: 300, width: '100%' }}>
        <ImageBackground style={{ height: '100%', width: '100%' }} source={background} />
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'white',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          marginTop: -50
        }}
      >
        <View style={{ width: '90%', height: 500, marginLeft: '5%', marginTop: 100, marginBottom: '5%' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'tomato', fontWeight: 'bold', marginBottom: 10 }}>
              Mã xác thực
            </Text>
            <TextInput
              maxLength={6}
              value={typeCode}
              onChangeText={setTypeCode}
              keyboardType="numeric"
              style={{
                textAlign: 'center',
                width: '60%',
                height: 50,
                borderWidth: 2,
                borderColor: 'tomato',
                borderRadius: 20,
                fontSize: 25
              }}
              placeholder="Nhập mã xác thực"
            />
            <TouchableOpacity onPress={() => sendMail(email)}>
              <Text style={{ marginTop: 10, fontSize: 20 }}>Gửi lại mã xác thực</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red', marginTop: 10 }}>
              Thời gian còn lại: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' + (timer % 60) : timer % 60}
            </Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 50,
              width: '100%'
            }}
          >
            <TouchableOpacity
              onPress={signupHandler}
              style={{ width: '60%', height: 50, backgroundColor: 'tomato', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Đăng ký tài khoản</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handlerReturnSignup}
              style={{
                width: '60%',
                height: 50,
                borderWidth: 2,
                borderColor: 'tomato',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10
              }}
            >
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', color: 'tomato' }}>Quay về trang đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AccuraryScreen;
