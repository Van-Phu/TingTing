import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Dimensions, Image, ScrollView  } from 'react-native';
import YouTube from 'react-native-youtube';
import { WebView } from 'react-native-webview';


const ShortVideoScreen = () => {
  const [videos, setVideos] = useState([]);
  const { height } = Dimensions.get('window');

  useEffect(() => {
    fetch('http://192.168.25.1:5000/api/v1/shortVideo/videos')
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error(error));
  },[]);

  return (
    
    <View>
      <FlatList
        data={videos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => 
        <View style={{height, width:'100%'}}>
          <WebView style={{height: "100%", flex: 1, width: '100%'}}  source={{uri: item.url}} />
          <Text style={{marginLeft: '5%',fontSize: 25 ,color:'white', height: 100, marginTop: -300, position: 'relative'}}>{item.title}</Text>
          <Text style={{marginLeft: '5%',fontSize: 20,color: "white", height: 100, marginTop: -50}}>{item.description}</Text>
        </View>
        
      }
      />
    </View>
  );
};

export default ShortVideoScreen;