import React, {useState, useEffect} from 'react';
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
   Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

function SearchScreen({navigation}) {
    const route = useRoute();
    const { inputText } = route.params;
    const {username} = route.params;
    const [product, setProduct] = useState([])
 

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('http://192.168.25.1:5000/api/v1/product/findProduct?query=' + inputText);
              const data = await response.json();
              setProduct(data);
            } catch (error) {
              console.log(error);
            }
        };
      
        fetchData();
      }, []);
    
    const getValueId = (id) => {
        navigation.navigate('InfoProduct', {id, username: username})
        console.log(id)
    }
    const renderAllItem = ({ item }) => {
      if(item.status === 0){
          return (
              <TouchableOpacity onPress={() => 
                getValueId(item._id)} 
                style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                    <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}>
                    </Image>
                </View>
                <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato'}}>{item.price}</Text>
                </View>            
              </TouchableOpacity>
            );
      }
      else{
          return (
              <TouchableOpacity onPress={() => 
                getValueId(item._id)} 
                style={{height: 300, width: 220, marginLeft: 10, marginRight: 20, marginBottom: 20, backgroundColor:'white', borderRadius: 10, left: -6}}>
                <View style={{width: '100%', height: 200, overflow: 'hidden', marginBottom: 10, borderRadius: 20}}>
                    <Image style={{height: '100%', width: '100%'}} source={{uri: item.productAvatar}}>
                    </Image>
                </View>
                <View style={{width: '100%', flexDirection: 'row', justifyContent:'space-between', flexDirection:'column', marginLeft: '5%', marginTop: 20}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{item.productName}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold', color:'tomato', marginRight: 10}}>{item.priceSale}</Text>
                      <Text style={{fontSize: 12, fontWeight: 'bold', color:'black', textDecorationLine:'line-through'}}>{item.price}</Text>
                      
                    </View>
               
                </View>            
              </TouchableOpacity>
            );
      }
      
    };
      return(
        <View style={{width:'100%', height:'100%', backgroundColor:'#E3E3E3'}}>
          <View style={{height: '100%', width: '90%',  marginLeft:'5%'}}>
            <FlatList
              style={{marginTop:20, width: "100%", height:'100%'}}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={product}
                renderItem={renderAllItem}
                keyExtractor={(_, index) => index.toString()}
            />
       </View>
        </View>
       
    )
}

export default SearchScreen;