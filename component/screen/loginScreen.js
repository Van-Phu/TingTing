import React, {useState} from 'react';
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
  Keyboard
} from 'react-native';

// import { AppRegistry } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"
import background from "../source/backgroundLogin.png"
// import AsyncStorage from '@react-native-async-storage/async-storage'



function Login() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)


  const signup = () => {
    navigation.navigate('Signup')
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.25.1:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        // handleLoginSuccess(username, password)
        navigation.navigate('Home', { username: username });
      } else {
        Alert.alert(
          'Thông báo!',
          'Tài khoản hoặc mật khẩu không hợp lệ!!',
          [
            { text: 'Cancel', style: 'cancel' }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log('err network')
    }
  };


  // const handleLoginSuccess = async (username, password) => {
  //   try {
  //     await AsyncStorage.setItem('username', username);
  //     await AsyncStorage.setItem('password', password);

  //   } catch (error) {
  //     console.log('Lỗi khi lưu mật khẩu:', error);
  //   }
  // };


// checkStoredCredentials()

  

  // const handleLoginSuccess = () => {
  //   props.handleLoginSuccess();
  // };

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  
  return (
        <ScrollView scrollEnabled={false} style={{height: '100%'}}>
            <View style={{height: 300, width: '100%', backgroundColor: 'tomato'}}>
                <ImageBackground 
                style={{flex: 1, alignItems: 'center'}}
                source={background}>
                </ImageBackground>
            </View>

            <View style={{height:800, backgroundColor: 'white', marginTop: '-10%', borderTopRightRadius: 50, borderTopLeftRadius: 50}}>
                <View style={{width: '90%', margin: '5%',  height: 250, marginTop: 50, alignItems:'center'}}>
                    <View style={{width: '80%', marginBottom: 20}}>
                        <Text style={{color: 'tomato', fontSize: 20, marginLeft: '5%'}}>Tài Khoản</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Icon name='person-circle-sharp' size={30} color={'tomato'} style={{position:'absolute', marginLeft: 20}}/>
                          <TextInput defaultValue='user' value={username} onChangeText={setUsername}
                          style={{paddingLeft: 70,width:'100%', height: 50, borderRadius: 100, borderColor: 'tomato', borderWidth: 3}} placeholder='Nhập tài khoản'></TextInput>
                        </View>
                    </View>

                    <View style={{width: '80%', marginBottom: 10}}>
                        <Text style={{color: 'tomato', fontSize: 20, marginLeft: '5%'}}>Mật khẩu</Text>
                        <View style={{alignItems:'center', flexDirection:'row'}}>
                          <Icon name='key-outline' size={30} color={'tomato'} style={{position:'absolute', marginLeft: 20}}/>
                          <TextInput secureTextEntry={!showPassword} value={password} onChangeText={setPassword}
                            style={{paddingLeft: 70,width:'100%', height: 50, borderRadius: 100, borderColor: 'tomato', borderWidth: 3}} placeholder='Nhập mật khẩu'></TextInput>
                          <TouchableOpacity style={{width: 50, height:'100%', position:'absolute', right: 0, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <Icon onPress={handleShowPassword} name={showPassword? "md-glasses-outline":"md-glasses"} size={30} color={'tomato'} style={{position:'absolute', right: 0, width: 50, alignItems:'center'}}/>
                          </TouchableOpacity>
                         
                        </View>  
                    </View>    

                    <View style={{height: 50, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {signup()}} style={{width: 300, height:50, alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold',}}>Bạn chưa có tài khoản?</Text>
                        </TouchableOpacity>
                  </View>
                </View>

                <View style={{height: 50, width: '100%', marginTop: 100, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {handleLogin()}} style={{width: 300, height:50, alignItems: 'center', textAlign: 'center', backgroundColor: 'tomato', justifyContent: 'center', borderRadius: 100}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>Đăng nhập</Text>
                        </TouchableOpacity>
                </View>
          </View>
        </ScrollView>
  );
}

const styles = StyleSheet.create({});

export default Login;
