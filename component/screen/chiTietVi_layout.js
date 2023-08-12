import React from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentDetails = () => {
  return (
    <ScrollView>
        <View style={{width:'100%',height:'100%',alignItems:'center',backgroundColor:'#EAEAEA'}}>
            <View style={{height:70,width:'92%',marginTop:40}}>
                <View style={{height:60,width:'100%'}}>
                    <Text style={{fontSize:22,fontWeight:'bold',marginLeft:20,color:'black'}}>
                        Tài khoản/Thẻ
                    </Text>
                    <Text style={{fontSize:18,marginLeft:20}}>
                        Sử dụng thanh toán chuyển tiền trực tiếp
                    </Text>
                </View>
            </View>
            <View style={{height:150,width:'100%',alignItems:'center'}}>
                <View style={{height:150,width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity>
                        <View style={{width:'100%',height:'100%',backgroundColor:'#D71028',borderRadius:30,borderWidth:15,borderColor:'#EAEAEA',flexDirection:'row',paddingBottom:40,paddingLeft:10}}>
                                <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                                    <View style={{width: 50, height: 50,borderRadius:30,borderWidth:2,borderColor:'white',overflow:'hidden'}}>
                                        <Image style={{width: 50, height: 50}} source={{uri: "https://homepage.momocdn.net/blogscontents/momo-upload-api-210607143251-637586731710784420.jpg"}}></Image>
                                            
                                    </View>

                                </View>
                                <View style={{width:'75%',height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                                    <Text style={{fontSize:24,color:'white',fontWeight:'bold'}}>
                                        Ví của tôi
                                    </Text>
                                    <Text style={{fontSize:16,color:'white'}}>
                                        Số dư: 1.323.000đ
                                    </Text>
                                </View>     
                        </View>
                    </TouchableOpacity>
                        
                </View>
                    
            </View>
            <View style={{height:150,width:'100%',alignItems:'center',marginTop:-50}}>
                <View style={{height:150,width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity>
                        <View style={{width:'100%',height:'100%',backgroundColor:'#00DC3F',borderRadius:30,borderWidth:15,borderColor:'#EAEAEA',flexDirection:'row',paddingBottom:40,paddingLeft:10}}>
                                <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                                    <View style={{width: 50, height: 50,borderRadius:30,overflow:'hidden'}}>
                                        <Image style={{width: 50, height: 50}} source={{uri: "https://play-lh.googleusercontent.com/KBIgU6nz3hzia77BUj4FyVdL2azYvnttVkreRmc6c-asHof7ErHsY79G_yHdFkI83w"}}></Image>
                                            
                                    </View>

                                </View>
                                <View style={{width:'75%',height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                                    <Text style={{fontSize:24,color:'white',fontWeight:'bold'}}>
                                        Vietcombank
                                    </Text>
                                    <Text style={{fontSize:16,color:'white'}}>
                                        Miễn phí thanh toán
                                    </Text>
                                </View>     
                        </View>
                    </TouchableOpacity>
                        
                </View>
                    
            </View>

            <View style={{height:150,width:'100%',alignItems:'center',marginTop:-50}}>
                <View style={{height:150,width:'100%',alignItems:'center',justifyContent:'center'}}>
                    
                    <TouchableOpacity>
                        <View style={{width:'100%',height:'100%',backgroundColor:'#026EB2',borderRadius:30,borderWidth:15,borderColor:'#EAEAEA',flexDirection:'row',paddingBottom:40,paddingLeft:10}}>
                                <View style={{width: 70, height: '100%',justifyContent:"center",alignItems:'center'}}>
                                    <View style={{width: 50, height: 50,borderRadius:30,overflow:'hidden',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
                                        <Image style={{width: 40, height: 40}} source={{uri: "https://ipay.vietinbank.vn/logo.png"}}></Image>
                                            
                                    </View>

                                </View>
                                <View style={{width:'75%',height:'100%',flexDirection:'column',alignContent:'center',justifyContent:'center',paddingLeft:10}}>
                                    <Text style={{fontSize:24,color:'white',fontWeight:'bold'}}>
                                        VietinBank
                                    </Text>
                                    <Text style={{fontSize:16,color:'white'}}>
                                        Miễn phí thanh toán
                                    </Text>
                                </View>     
                        </View>
                    </TouchableOpacity>    
                </View>
                    
            </View>
            <View style={{height:170,width:'92%',alignItems:'center',marginTop:-50}}>
                <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:'100%',height:'100%',backgroundColor:'#D1DCF2',borderRadius:30,borderWidth:15,borderColor:'#EAEAEA'}}>
                            <View style={{width:'100%',height:'100%',borderRadius:15,borderWidth: 2,borderColor: '#026EB2',borderStyle: 'dashed',flexDirection:'column',paddingBottom:40}}>
                                <View style={{width:'100%',height:50,marginTop:10,alignItems:'center'}}>
                                    <TouchableOpacity>
                                        <View style={{height:'90%',width:200,backgroundColor:'#E07A41',borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>Thêm ngân hàng</Text>
                                        </View>
                                    </TouchableOpacity>    
                                </View>
                                
                                <View style={{width:'60%',height:40,marginLeft:'20%',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize:16,textAlign:'center',color:'black'}}>Liên kết với ngân hàng có sẵn hoặc tạo tài khoản mới</Text>
                                </View>
                            </View>
                                    
                    </View>
                </View>
                    
            </View>
            <View style={{height:100,width:'92%',backgroundColor:'white',marginTop:-40}}>
                
            </View>
         
        </View>
    </ScrollView>
      
          
  );
};

export default PaymentDetails;
