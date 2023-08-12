import React, { useState,useEffect } from 'react';
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
  FlatList,
   Dimensions
} from 'react-native';
import numeral from 'numeral';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
function Pay ({navigation}){

    const [person, setPerson] = useState([])
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('')
    const [background, setBackground] = useState('')
    const [post, setPost] = useState('')
    const [follow, setFollow] = useState('')
    const [follower, setFollower] = useState('')
    const [image, setImage] = useState('')
    const [password, setPassword] = useState('')
    const [costNew, setCostNew] = useState(0)
    const [cost, setCost] = useState(0)
    const [id, setId] = useState()
    const route = useRoute();
    const { username } = route.params;
    const [value, setValue] = useState('');
    
    useEffect(() => {
        fetch(`http://192.168.25.1:5000/api/v1/users/getUserByName/` + username)
        .then(response => response.json())
        .then(data => {
            setId(data._id)
            setCostNew(data.cost)
        })  
        .catch(error => {
            console.error(error);
        });
    }, []);


    const [colorBtnNganhangClick, setColorClick] = useState('#A6A6A6');

    const [checkedTop, setCheckedTop] = useState(false);
    const [checkedBottom, setCheckedBottom] = useState(false);

    const handlePressTop = () => {
        if(colorBtnNganhangClick ==='#A6A6A6')
        {
            
            setCheckedTop(previousState => !previousState);
            setCheckedBottom(setColorClick('#A6A6A6'));
        }
        else
            setCheckedTop(setColorClick('#A6A6A6'));
            
        
    };


    const handleTextChange = (value) => {
        // Lấy giá trị của cost dưới dạng số, nếu không có giá trị, gán mặc định là 0
        const costValue = parseFloat(cost) || 0;
        // Lấy giá trị của value dưới dạng số, nếu không có giá trị, gán mặc định là 0
        const valueNumber = parseFloat(value.replace(/[^\d.]/g, '')) || 0;
        // Tính tổng cost và value
        const totalCost = costValue + valueNumber;
        // Định dạng giá trị theo định dạng tiền tệ (ví dụ: 10000 -> 10,000)
        const formattedValuee = numeral(totalCost).format('0,0');
        // Set giá trị mới vào state value
        setValue(formattedValuee);
      };
  // ... phần code còn lại của component ...



        
    const handlePressBottom = () => {

        if(colorBtnNganhangClick ==='#A6A6A6')
        {
            
            setCheckedBottom(previousState => !previousState);
            setCheckedTop(setColorClick('#A6A6A6'));  
        }
        else
            setCheckedBottom(setColorClick('#A6A6A6'));   
        };

          const repairProduct = async () => {
            try{
              const res = await fetch('http://192.168.25.1:5000/api/v1/users/updateCose/' + id,
                {
                  method: "PATCH",
                  headers:{
                    "content-Type": 'application/json'
                  },
                  body: JSON.stringify({
                    cost: Number(cost) + Number(costNew)
                  })
                }
              ) 
             
              const data = await res.json()
              if(res.status == 200){
                Alert.alert(
                  "Thông báo!",
                  "Nạp tiền thành công!!",
                  [
                      { text: 'Ok'}
                  ]
              )
              navigation.navigate('Profile')
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
              console.log('Nạp tiền không thành công!!', error)
            }
          }
          console.log(cost)
          console.log(costNew)
        
    
  return (
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
    //   <Text style={{color:"red"}}>Hello world!</Text>
    // </View>
    <ScrollView>
        <View style={{width:"100%",height:"100%",alignItems:'center',backgroundColor:'#DEDEDE'}}>
            <View style={{width:"92%",height:280,backgroundColor:"white", borderRadius:10,marginTop:20,flexDirection:'column'}}>
                <View>
                    <Text style={{fontSize:25,padding:15,fontWeight:'bold'}}>Nạp tiền</Text>
                </View>
                <View style={{width:'92%',height:90,marginLeft:'4%',borderRadius:5,borderWidth:2,borderColor:'red',flexDirection:'row',paddingLeft:10}}>
                        <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                            <View style={{width: 50, height: 50,borderRadius:30,overflow:'hidden',borderWidth:1}}>
                                <Image style={{width:50, height: 50}} source={{uri: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210607143251-637586731710784420.jpg"}}></Image>
                                    
                            </View>

                        </View>
                        <View style={{width:300,height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                            <Text style={{fontSize:24,fontWeight:'bold'}}>
                                Ví của tôi
                            </Text>
                            <Text style={{fontWeight:'bold',fontSize:16,color:'black'}}>
                                {costNew}đ
                            </Text>

                        </View>

                        
                </View>
                <View style={{width:'92%',height:80,marginLeft:'4%',marginTop:20,flexDirection:'column'}}>
                    <View style={{marginLeft:'7%',width:120,backgroundColor:'white',zIndex:1}}>
                        <Text style={{fontSize:17}}>Số tiền cần nạp</Text>
                    </View>
                    <View style={{height:60,width:'100%',borderRadius:5,borderWidth:1,borderColor:'#828282',marginTop:-10,paddingLeft:10}}>
                        

                        
                        <TextInput
                            value={cost}
                            onChangeText={setCost} // Cập nhật giá trị cost khi người dùng nhập
                            keyboardType="numeric"
                            placeholder="0đ"
                            placeholderTextColor="#828282"
                            style={{ fontSize: 30, height: '100%', width: '100%' }}
                            />
                    
                    </View>
                </View>
                
            </View>
            <View style={{width:'92%',height:40,marginTop:30}}>
                <Text style={{fontWeight:'bold',fontSize:25,paddingLeft:10}}>
                    Từ nguồn tiền
                </Text>

            </View>
            <View style={{width:'92%',height:200,backgroundColor:'white',borderRadius:10,flexDirection:'column'}}>
                <View style={{width:'94%',height:70,backgroundColor:'white',marginLeft:'3%',borderRadius:10,borderWidth:1,borderColor:'#828282',flexDirection:'row',marginTop:20}}>
                        <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                            <View style={{width: 50, height: 50,borderRadius:30,overflow:'hidden'}}>
                                <Image style={{width: 50, height: 50}} source={{uri: "https://ipay.vietinbank.vn/logo.png"}}></Image>
                                    
                            </View>

                        </View>
                        <View style={{width:'75%',height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                            <Text style={{fontSize:24,color:'black',fontWeight:'bold'}}>
                                VietinBank
                            </Text>
                            <Text style={{fontSize:16,color:'#9C9C9C'}}>
                                Miễn phí thanh toán
                            </Text>
                        </View>

                        <View style={{justifyContent:'center',marginLeft:10}}>
                            <TouchableOpacity onPress={handlePressTop}>
                                <View style={{width:26,height:26,borderRadius:13,backgroundColor:checkedTop ? 'red' : colorBtnNganhangClick,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{width:10,height:10,borderRadius:5,backgroundColor:'white'}} ></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                </View>
                <View style={{width:'94%',height:70,backgroundColor:'white',marginLeft:'3%',borderRadius:10,borderWidth:1,borderColor:'#828282',flexDirection:'row',marginTop:20}}>
                        <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                            <View style={{width: 50, height: 50,borderRadius:30,overflow:'hidden'}}>
                                <Image style={{width: 50, height: 50}} source={{uri: "https://play-lh.googleusercontent.com/KBIgU6nz3hzia77BUj4FyVdL2azYvnttVkreRmc6c-asHof7ErHsY79G_yHdFkI83w"}}></Image>
                                    
                            </View>

                        </View>
                        <View style={{width:'75%',height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                            <Text style={{fontSize:24,color:'black',fontWeight:'bold'}}>
                                Vietcombank
                            </Text>
                            <Text style={{fontSize:16,color:'#9C9C9C'}}>
                                Miễn phí thanh toán
                            </Text>
                        </View>

                        <View style={{justifyContent:'center',marginLeft:10}}>
                            <TouchableOpacity onPress={handlePressBottom}>
                                <View style={{width:26,height:26,borderRadius:13,backgroundColor:checkedBottom ? 'red' : colorBtnNganhangClick,justifyContent:'center',alignItems:'center'}}>
                                    <View style={{width:10,height:10,borderRadius:5,backgroundColor:'white'}}></View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                </View>
            </View>
            
            <View style={{ height: 100, width: '92%', justifyContent: 'center',marginTop:10}}>
                <TouchableOpacity  onPress={repairProduct} >
                    <View style={{ height: 70, width: '100%', backgroundColor: '#0066CC' ,borderRadius:10,justifyContent:'center'}}>
                        <Text style={{textAlign:'center',fontSize:25,color:"white",fontWeight:'bold'}}>NẠP TIỀN</Text>

                            
                    </View>
                </TouchableOpacity>
            </View>

                
                
          
            <View style={{height:150,width:'92%',backgroundColor:'white',marginTop:10,borderRadius:10}}>
                <View style={{height:'100%',width:'100%',justifyContent:'center',paddingLeft:20}}>
                    <TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold',padding:5}}>
                            Liên kết ngân hàng
                        </Text>
                    </TouchableOpacity>
                        
                    <TouchableOpacity onPress={() => {
                                navigation.navigate('PaymentDetails')
                            }}>
                        <Text style={{fontSize:20,fontWeight:'bold',padding:5}}>
                            Xem thông tin thẻ
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity>
                        <Text style={{fontSize:20,fontWeight:'bold',padding:5}}>
                            Xóa liên kết
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={{height:50,width:'92%',marginTop:20,marginBottom:30,flexDirection:'row'}} >
                <View style={{height:'100%',width:'10%',justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width: 40, height: 40}} source={{uri: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png"}}></Image>
                </View>
                <View style={{height:'100%',width:'80%',justifyContent:'center',paddingLeft:20}}>
                    <TouchableOpacity></TouchableOpacity>
                    <Text style={{fontSize:17}}>Mọi thông tin khách hàng đều được mã hóa để bảo mật thông tin khách hàng.</Text>
                </View>
            </View>
        </View>
    </ScrollView>
        
          
  );
};  

export default Pay;
