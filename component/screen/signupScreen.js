import React, { useState, useRef } from 'react';
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

import signupBackground from '../source/signupScreen.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { text } from 'stream/consumers';

const SignupScreen = ({navigation}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isNextVisible, setIsNextVisible] = useState(false);
    const [visibleSignup, setVisibleSignup] = useState(true);
    const [visibleCountinute, setVisibleCountinute] = useState(true);

    const slideUpAnimation1 = useRef(new Animated.Value(500)).current;
    const slideUpAnimation2 = useRef(new Animated.Value(500)).current;

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [codeMail, setCodeMail] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showReapetPassword, setShowReapetPassword] = useState(false)

    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        ToastAndroid.show("Email không hợp lệ vui lòng nhập lại!!", ToastAndroid.SHORT)
        return false;
      } else {
        return true;
      }
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
      }
    const handleShowRePeatPassword = () => {
      setShowReapetPassword(!showReapetPassword)
    }

    const checkUsername = async (username) => {
      try {
        const response = await fetch(`http://192.168.25.1:5000/api/v1/users/checkUsername/${username}`);
        const data = await response.json();
        return data.message === "Tài khoản đã có trong hệ thống!!";
      } catch (error) {
        console.log('Error:', error);
        return false;
      }
    };

    const checkMail = async (email) => {
      try {
        const response = await fetch(`http://192.168.25.1:5000/api/v1/users/checkEmail/${email}`);
        const data = await response.json();
        return data.message === "Email đã có trong hệ thống!!";
      } catch (error) {
        console.log('Error:', error);
        return false;
      }
    };

    const sendMail = async (email) => {
      try {
        const response = await fetch(`http://192.168.25.1:5000/api/v1/users/sendMail/${email}`);
        const data = await response.json();
        setCodeMail(data)
      } catch (error) {
        console.log('Error:', error);
        return false;
      }
    };
    
    const handleReturnAccuraryPage = async () => {
      if(repeatPassword != password){
        ToastAndroid.show("Mật khẩu xác nhận không giống!!", ToastAndroid.SHORT)
      }else{
        const isUsernameExists = await checkUsername(username);
        if (isUsernameExists) {
          ToastAndroid.show("Tài khoản đã tồn tại trong hệ thống!", ToastAndroid.SHORT);
        } else {
          sendMail(email)
          navigation.navigate("Accurary", {
            username: username,
            password: password,
            email: email,
            fullName: fullName,
            codeMail: codeMail
          });
        }
      }
    };
    
  const handleButtonClick = () => {
        setIsVisible(true);
        setVisibleSignup(false);
        Animated.timing(slideUpAnimation1, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();    
  };

  const handleNextButton = async() => {
    if(validateEmail() === false){
    
    }else{
      if(fullName.length == 0 || email.length == 0){
        ToastAndroid.show("Vui lòng nhập đầy đủ thông tin!!", ToastAndroid.SHORT)
      }else{
        const isEmailExists = await checkMail(email);
        if (isEmailExists) {
          ToastAndroid.show("Email đã tồn tại trong hệ thống!", ToastAndroid.SHORT);
        } else{
          setIsNextVisible(true);
          setVisibleCountinute(false);
          Animated.timing(slideUpAnimation2, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      }
    }
  };


  const handleReturnPageName = () => {
    setIsNextVisible(true);
    setVisibleCountinute(true);
    Animated.timing(slideUpAnimation2, {
      toValue: 600,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleReturnLoginPage = () =>{
    navigation.navigate("Login")
  }

  const handleReturnHomePage = () =>{
    navigation.navigate("Home", {username: username})
  }

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <View style={{ height: '100%', width: '100%', flex: 1 }} />
      <ImageBackground style={{ height: '100%', width: '100%' }} source={signupBackground}></ImageBackground>
      <View style={{ flex: 1, alignItems: 'center', bottom: 0, position: 'absolute', width: '100%' }}>
        {visibleSignup && (
          <TouchableOpacity
            style={{
              height: 50,
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}
            onPress={handleButtonClick}
          >
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'tomato' }}>Đăng ký ngay</Text>
          </TouchableOpacity>
        )}

        {isVisible && (
          <Animated.View
            style={{
              transform: [
                {
                  translateY: slideUpAnimation1,
                },
              ],
              backgroundColor: 'white',
              width: '100%',
              height: 500,
              marginTop: 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View style={{ height: '100%', width: '100%' }}>
              <View style={{ marginLeft: '5%', marginTop: '5%', width: '90%' }}>
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ marginBottom: 5, fontSize: 30, fontWeight: 'bold', color: 'tomato' }}>Bạn Tên Gì?</Text>
                  <View
                    style={{
                      height: 50,
                      width: '100%',
                      borderWidth: 2,
                      borderColor: 'tomato',
                      borderRadius: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Icon style={{ paddingLeft: 20 }} name="happy-outline" size={30} color={'tomato'} />
                    <TextInput value={fullName} onChangeText={setFullName} style={{ fontSize: 20, width: 400 }} placeholderTextColor={'tomato'} placeholder="Nhập tên của bạn"></TextInput>
                  </View>
                </View>
                <View>
                  <Text style={{ marginBottom: 5, fontSize: 30, fontWeight: 'bold', color: 'tomato' }}>Email của bạn?</Text>
                  <View
                    style={{
                      height: 50,
                      width: '100%',
                      borderWidth: 2,
                      borderColor: 'tomato',
                      borderRadius: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Icon style={{ paddingLeft: 20 }} name="mail-outline" size={30} color={'tomato'} />
                    <TextInput keyboardType="email-address" value={email} onChangeText={(text) => setEmail(text)} style={{ fontSize: 20, width: 400}} placeholderTextColor={'tomato'} placeholder="Nhập email của bạn"></TextInput>
                  </View>
                </View>
              </View>

              <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: 50 }}>
              <TouchableOpacity onPress={handleReturnLoginPage} style={{borderWidth:2, borderColor: 'tomato',alignItems:'center', justifyContent:'center',borderRadius: 20, width: '50%', height: 50, backgroundColor:'white', position:'absolute', bottom: 100}}>
                    <Text style={{color:'tomato', fontSize: 25, fontWeight: 'bold'}}>Quay về đăng Nhập</Text>
              </TouchableOpacity>
                {visibleCountinute && (
                  <TouchableOpacity
                    onPress={handleNextButton}
                    style={{position:'absolute', width: '50%', height: 50, backgroundColor: 'tomato', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', bottom: 20
                    }}
                  >
                    <Text style={{ fontSize: 25, color: '#fff', fontWeight: 'bold' }}>Tiếp theo</Text>
                    <Icon name="chevron-forward" size={30} color={'white'} />
                  </TouchableOpacity>
                  
                )}
                {isNextVisible && (
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateY: slideUpAnimation2,
                        },
                      ],
                      backgroundColor: 'white',
                      width: '100%',
                      height: 500,
                      marginTop: 20,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                  >
                    
                    <View style={{ width: '100%', height: '100%' }}>
                      <TouchableOpacity
                        onPress={handleReturnPageName}
                        style={{ height: 50, width: 50, borderRadius: 100, backgroundColor: 'tomato', alignItems: 'center', justifyContent: 'center', marginTop: 5, marginLeft: 5 }}
                      >
                        <Icon name="md-arrow-back" color={'#fff'} size={30} />
                      </TouchableOpacity>
                      <View style={{ width: '90%', height: '90%', marginLeft: '5%', marginTop: '2%' }}>
                        <View style={{ marginBottom: 20 }}>
                          <Text style={{ marginBottom: 5, fontSize: 30, fontWeight: 'bold', color: 'tomato' }}>Tài khoản</Text>
                          <View
                            style={{width: '100%',borderWidth: 2,borderColor: 'tomato',borderRadius: 20,flexDirection: 'row',alignItems: 'center',
                            }}
                          >
                            <Icon style={{ paddingLeft: 20 }} name="md-person-circle-outline" size={30} color={'tomato'} />
                            <TextInput value={username} onChangeText={setUsername} style={{ fontSize: 20 }} placeholderTextColor={'tomato'} placeholder="Nhập tên tài khoản"></TextInput>
                          </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                          <Text style={{ marginBottom: 5, fontSize: 30, fontWeight: 'bold', color: 'tomato' }}>Mật khẩu</Text>
                          <View
                            style={{height: 50,width: '100%',borderWidth: 2,borderColor: 'tomato',borderRadius: 20,flexDirection: 'row',alignItems: 'center',
                            }}
                          >
                            <Icon style={{ paddingLeft: 20 }} name="md-key-outline" size={30} color={'tomato'} />
                            <TextInput secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ fontSize: 20 }} placeholderTextColor={'tomato'} placeholder="Nhập mật khẩu"></TextInput>
                            <Icon onPress={handleShowPassword} name={showPassword? "md-glasses-outline":"md-glasses"} size={30} color={'tomato'} style={{position:'absolute', right: 0, width: 50, alignItems:'center'}}/>
                          </View>
                        </View>
                        <View style={{ marginBottom: 20 }}>
                          <Text style={{ marginBottom: 5, fontSize: 30, fontWeight: 'bold', color: 'tomato' }}>Nhập lại mật khẩu</Text>
                          <View
                            style={{height: 50,width: '100%',borderWidth: 2,borderColor: 'tomato',borderRadius: 20,flexDirection: 'row',alignItems: 'center',
                            }}
                          >
                            <Icon style={{ paddingLeft: 20 }} name="md-key-sharp" size={30} color={'tomato'} />
                            <TextInput
                                secureTextEntry={!showReapetPassword}
                                value={repeatPassword} 
                                onChangeText={setRepeatPassword}
                                style={{ fontSize: 20 }}
                                placeholderTextColor={'tomato'}
                                placeholder="Nhập lại mật khẩu"
                            ></TextInput>
                            <Icon onPress={handleShowRePeatPassword} name={showReapetPassword? "md-glasses-outline":"md-glasses"} size={30} color={'tomato'} style={{position:'absolute', right: 0, width: 50, alignItems:'center'}}/>
                          </View>
                        </View>

                        <View style={{ width: '100%', height: 50, position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                          <TouchableOpacity
                            onPress={handleReturnAccuraryPage}
                            style={{
                              width: '70%',
                              height: 50,
                              backgroundColor: 'tomato',
                              borderRadius: 20,
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}
                          >
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#fff' }}>Tiến hành xác thực</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                )}
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default SignupScreen;
