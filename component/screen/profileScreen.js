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
    Keyboard, FlatList
  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

function ProfileScreen() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('')
    const [background, setBackground] = useState('')
    const [post, setPost] = useState('')
    const [follow, setFollow] = useState('')
    const [follower, setFollower] = useState('')
    const [image, setImage] = useState('')
    const [type, setType] = useState('')

    const route = useRoute();
    const { username } = route.params;
    console.log(username)

    useEffect(() => {
        fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
        .then(response => response.json())
        .then(data => {
            setFullName(data.fullName);
            setEmail(data.email)
            setAvatar(data.avatar)
            setBackground(data.background)
            setPost(data.post)
            setFollow(data.follow)
            setFollower(data.follower)
            setImage(data.image)
                    })
        .catch(error => {
            console.error(error);
        });
    }, []);
        
    const renderItem = ({ item }) => (
        <View style={{height: 300, width: 200,marginRight: 20 ,backgroundColor: 'red', flex: 1, borderRadius: 20, overflow: 'hidden' }}>
          <Image source={{ uri: item }} style={{ height:'100%', width: '100%' }} />
        </View>
      );
    return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={{width: '100%', height: '100%'}}>
            <View style={{width: '100%', height: 400, backgroundColor: 'red'}}>
                <ImageBackground 
                    source={{uri: `${background}`}}
                    style={{width: '100%', height: '100%', flex: 1}}
                >
                </ImageBackground>
            </View>

            <View style={{width: '100%', height: '100%' ,backgroundColor: '#fff', borderTopLeftRadius: 50, borderTopRightRadius: 50, position: 'relative', marginTop: -50}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',width: '90%', height: 100, margin: '5%'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{width: 100, height: 100, borderRadius: 100, overflow: 'hidden'}}>
                            <ImageBackground
                                resizeMode='cover'
                            style={{width: '100%', height: '100%'}}
                            source={{uri: `${avatar}`}}
                            ></ImageBackground>
                            
                        </View>

                        <View style={{width: 200, height: 100, marginLeft: '5%', justifyContent: 'center'}}>
                            <Text style={{color: 'black', fontSize: 25, fontWeight: 'bold'}}>{fullName}</Text>
                            <Text style={{fontSize: 18}}>{email}</Text>
                        </View>
                    </View>
                    

                    <View style={{width: 150, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity style={{backgroundColor: 'tomato', width: 150, alignItems: 'center', justifyContent: 'center', height: 40, borderRadius: 20}}>
                            <Text style={{fontSize: 20, fontWeight:'bold', color: 'white'}}>Follow</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{height: 100, width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5%'}}>
                    <View style={{width: 150, height: 100, alignItems:'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '900'}}>{post}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'normal'}}>Post</Text>
                    </View>
                    <View style={{width: 150, height: 100, alignItems:'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '900'}}>{follow}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'normal'}}>Follow</Text>
                    </View>
                    <View style={{width: 150, height: 100, alignItems:'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: 'black', fontWeight: '900'}}>{follower}</Text>
                        <Text style={{fontSize: 18, fontWeight: 'normal'}}>Follower</Text>
                    </View>
                </View>

                <View style={{height: 400, width: '90%', marginLeft: '5%', marginRight: '5%'}}>
                    <Text style={{fontSize: 30, color: '#181818', fontWeight:'bold', marginBottom:'5%'}}>PHOTOS</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{width: '100%', flexDirection:'row'}}>
                        <FlatList
                            horizontal={true}
                            data={image}
                            renderItem={renderItem}
                            keyExtractor={(_, index) => index.toString()}
                        />
                    </ScrollView>
                </View>

                <View style={{width: '90%', height:200, margin:'5%'}}>
                    <Text style={{fontSize: 30, color: '#181818', fontWeight:'bold', marginBottom:'5%'}}>FRIENDS</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{width: '100%', flexDirection:'row'}}>
                        <TouchableOpacity style={{height: 150, width: 100,marginRight: 20 , flex: 1}}>
                            <View style={{height: 100, width: 100, borderRadius: 100, overflow:'hidden'}}>
                                <ImageBackground
                                    style={{height:'100%', width: '100%'}}
                                    source={{uri: 'https://lh3.googleusercontent.com/blogger_img_proxy/AByxGDRs41JHT1WxrVcref8kgCJQYU5ON9-OTEYlQtDeSOVW2gbR0jqXoc7ZOHmBz7c03ttXRgYXYylwk-s8cX8X2ZSAQT5xiXmp1K050H3SGRT3J6VkQS-kQJFNJD7GySniPlXMO0l0CjQx4U2cKgl5JelIcgL-0e90245SgPTxpg=w919-h516-p-k-no-nu'}}
                                >
                                </ImageBackground>
                            </View>
                            <Text style={{color:'black', fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:10}}>PHÚ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height: 150, width: 100,marginRight: 20 , flex: 1}}>
                            <View style={{height: 100, width: 100, borderRadius: 100, overflow:'hidden'}}>
                                <ImageBackground
                                    style={{height:'100%', width: '100%'}}
                                    source={{uri: 'https://lh3.googleusercontent.com/blogger_img_proxy/AByxGDRs41JHT1WxrVcref8kgCJQYU5ON9-OTEYlQtDeSOVW2gbR0jqXoc7ZOHmBz7c03ttXRgYXYylwk-s8cX8X2ZSAQT5xiXmp1K050H3SGRT3J6VkQS-kQJFNJD7GySniPlXMO0l0CjQx4U2cKgl5JelIcgL-0e90245SgPTxpg=w919-h516-p-k-no-nu'}}
                                >
                                </ImageBackground>
                            </View>
                            <Text style={{color:'black', fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:10}}>PHÚ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height: 150, width: 100,marginRight: 20 , flex: 1}}>
                            <View style={{height: 100, width: 100, borderRadius: 100, overflow:'hidden'}}>
                                <ImageBackground
                                    style={{height:'100%', width: '100%'}}
                                    source={{uri: 'https://lh3.googleusercontent.com/blogger_img_proxy/AByxGDRs41JHT1WxrVcref8kgCJQYU5ON9-OTEYlQtDeSOVW2gbR0jqXoc7ZOHmBz7c03ttXRgYXYylwk-s8cX8X2ZSAQT5xiXmp1K050H3SGRT3J6VkQS-kQJFNJD7GySniPlXMO0l0CjQx4U2cKgl5JelIcgL-0e90245SgPTxpg=w919-h516-p-k-no-nu'}}
                                >
                                </ImageBackground>
                            </View>
                            <Text style={{color:'black', fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:10}}>PHÚ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height: 150, width: 100,marginRight: 20 , flex: 1}}>
                            <View style={{height: 100, width: 100, borderRadius: 100, overflow:'hidden'}}>
                                <ImageBackground
                                    style={{height:'100%', width: '100%'}}
                                    source={{uri: 'https://lh3.googleusercontent.com/blogger_img_proxy/AByxGDRs41JHT1WxrVcref8kgCJQYU5ON9-OTEYlQtDeSOVW2gbR0jqXoc7ZOHmBz7c03ttXRgYXYylwk-s8cX8X2ZSAQT5xiXmp1K050H3SGRT3J6VkQS-kQJFNJD7GySniPlXMO0l0CjQx4U2cKgl5JelIcgL-0e90245SgPTxpg=w919-h516-p-k-no-nu'}}
                                >
                                </ImageBackground>
                            </View>
                            <Text style={{color:'black', fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:10}}>PHÚ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height: 150, width: 100,marginRight: 20 , flex: 1}}>
                            <View style={{height: 100, width: 100, borderRadius: 100, overflow:'hidden'}}>
                                <ImageBackground
                                    style={{height:'100%', width: '100%'}}
                                    source={{uri: 'https://lh3.googleusercontent.com/blogger_img_proxy/AByxGDRs41JHT1WxrVcref8kgCJQYU5ON9-OTEYlQtDeSOVW2gbR0jqXoc7ZOHmBz7c03ttXRgYXYylwk-s8cX8X2ZSAQT5xiXmp1K050H3SGRT3J6VkQS-kQJFNJD7GySniPlXMO0l0CjQx4U2cKgl5JelIcgL-0e90245SgPTxpg=w919-h516-p-k-no-nu'}}
                                >
                                </ImageBackground>
                            </View>
                            <Text style={{color:'black', fontSize: 20, fontWeight:'bold', textAlign: 'center', marginTop:10}}>PHÚ</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{height: 500, width: '90%', margin: '5%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                    <View style={{height: 70, width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={{height: 70, width: 70, borderRadius: 100, overflow: 'hidden'}}>
                            <ImageBackground 
                                source={{uri: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg'}}
                                style={{height: 70, width: 70}}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{marginLeft: '5%',width: 200,height: 100, alignItems:'flex-start', justifyContent: 'center'}}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>
                                Lương Văn Phú
                            </Text>
                            <Text style={{fontSize: 15}}>
                                2 giờ
                            </Text>
                        </View>
                    </View>
                    <View style={{marginTop: '5%'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            HAHAHA
                        </Text>
                        <View style={{height: '100%', width: '100%', backgroundColor:'red'}}>
                            {/* <Video
                                source={require('./../source/AV4-22-PBA-Group_6.mp4')}
                                style={{ width: '100%', height: 300 }}
                                resizeMode="contain"
                                poster="https://www.example.com/poster.jpg"
                                onError={(error) => console.log(error)}
                                onLoad={() => console.log('Video is loaded')}
                                onEnd={() => console.log('Video is ended')}
                                controls={true}
                                fullscreen={true}
                                /> */}
                            </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </ScrollView>
  );
}

export default ProfileScreen;