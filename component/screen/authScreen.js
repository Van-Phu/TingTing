
import React, { useState } from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.43.49:5000/getByName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('authToken', data.token);
        
      } else {
        console.log('Faile')
      }
    } catch (error) {
      // Handle network errors
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Login" onPress={() => handleLogin} />
    </View>
  );
};

export default LoginScreen;