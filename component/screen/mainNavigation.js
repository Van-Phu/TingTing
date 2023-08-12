import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import IconMete from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeScreen from './homeScreen';
import ProfileScreen from './profileScreen';
import ChatScreen from './chatScreen';
import BuyScreen from './shopScreen';
import infoProductScreen from './infoProductScreen'
import AddNewProductScreen from './addNewProduct'
import orderScreen from './orderScreen'
import PaymentScreen from './paymentCreen'
import SearchScreen from './searchScreen';
import FlashSaleScreen from './productFSScreen'
import PaidScreen from './paidScreen'
import AddADScreen from './addAddress'
import OrderTracking from './orderTracking'
import AddProductByShop from './addProductByShop';
import DescribeProductShop from './describeProductShop';
import RepairProductShop from './RepairProductShop';
import Profile from './profile_layout';
import Pay from './pay_layout';
import PaymentDetails from './chiTietVi_layout';
import GetSignupScreen from './getSignupShopScreen'
import SignupSupplier from './sigupSupplier';
import GetSignupUserSceen from './getSignupUserScreen'
import Login from './loginScreen'
import { useRoute } from '@react-navigation/native';
import {
  KeyboardAvoidingView
} from 'react-native';

const Tab = createBottomTabNavigator();
import { createStackNavigator } from '@react-navigation/stack';
const ShopStack = createStackNavigator();
const HomeStack = createStackNavigator();


export default function App() {
  const route = useRoute();
  const { username } = route.params; 

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator screenOptions={{headerShown: false}}>
          {/* <Tab.Screen 
              name="Chat" component={ChatScreen} 
              options={{
                  tabBarIcon: ({ color, size }) => (
                  <Icon name="message1" size={size} color={color} />
                  ),
              }}/> */}
          <Tab.Screen 
            name="Home" 
            component={HomeStackScreen} 
            initialParams={{ username: username }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
              name="Buying" 
              component={ShopStackScreen}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="shoppingcart" size={size} color={color} />
                ),
          }}/>
          <Tab.Screen 
              name="OrderTracking" 
              component={OrderTracking}
              initialParams={{ username: username }}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <IconMete name="truck-fast-outline" size={size} color={color} />
                ),
          }}/>
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          initialParams={{ username: username }}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconMete name="account-circle-outline" size={size} color={color} />
            ),
          }}
          listeners={({ navigation }) => ({
            focus: () => {
              if (username != "unknown") {
                navigation.navigate('Cá nhân', { screen: 'Home' });
              }
            },
          })}
        />
          
        </Tab.Navigator>
    </NavigationContainer>
  );
}

function ShopStackScreen({ route }) {
  const { username } = route.params;
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="Shopping"
        component={BuyScreen}
        options={{ headerShown: false }}
        initialParams={{ username }}
      />
      <ShopStack.Screen
        name="InfoProduct"
        component={infoProductScreen}
        options={{ title: "Chi Tiết Sản Phẩm" }}
        initialParams={{username}}
      />
      <ShopStack.Screen
        name="AddNewProduct"
        component={AddNewProductScreen}
        options={{ title: "Thêm Sản Phẩm" }}
        initialParams={{ username }}
      />
      <ShopStack.Screen
        name="Order"
        component={orderScreen}
        options={{ title: "Giỏ hàng" }}
      />
      <ShopStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Thanh toán" }}
      />
      <ShopStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Tìm kiếm sản phẩm" }}
      />
      <ShopStack.Screen
        name="FlashSaleScreen"
        component={FlashSaleScreen}
        options={{ title: "Tìm kiếm sản phẩm" }}
      />
      <ShopStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
      <ShopStack.Screen
        name="PaidScreen"
        component={PaidScreen}
        options={{ title: "Chat", headerShown: false }}
      />
        <ShopStack.Screen
        name="Pay"
        component={Pay}
        initialParams={{ username}}
        options={{ title: "Mô tả sản phẩm" }}
      />
    </ShopStack.Navigator>
  );
}

function HomeStackScreen({ route }) {
  const { username } = route.params;
  console.log(username)
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ username }}
      />
      <HomeStack.Screen
        name="App"
        component={App}
        options={{ headerShown: false }}
        initialParams={{ username }}
      />
      <ShopStack.Screen
        name="Shopping"
        component={BuyScreen}
        options={{ headerShown: false }}
        initialParams={{ username }}
      />
      <HomeStack.Screen
        name="InfoProduct"
        component={infoProductScreen}
        options={{ title: "Chi Tiết Sản Phẩm" }}
        // initialParams={{username}}
      />
      <HomeStack.Screen
        name="AddNewProduct"
        component={AddNewProductScreen}
        options={{ title: "Thêm Sản Phẩm" }}
        initialParams={{ username }}
      />
      <HomeStack.Screen
        name="Order"
        component={orderScreen}
        options={{ title: "Giỏ hàng" }}
      />
      <HomeStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Thanh toán" }}
      />
      <HomeStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: "Tìm kiếm sản phẩm" }}
      />
      <HomeStack.Screen
        name="FlashSaleScreen"
        component={FlashSaleScreen}
        options={{ title: "Tìm kiếm sản phẩm" }}
      />
      <HomeStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ title: "Chat" }}
      />
      <HomeStack.Screen
        name="PaidScreen"
        component={PaidScreen}
        options={{ title: "Chat", headerShown: false }}
      />
      <HomeStack.Screen
        name="AddAdScreen"
        component={AddADScreen}
        options={{ title: "Thêm địa chỉ", headerShown: false }}
      />
      <HomeStack.Screen
        name="OrderTracking"
        component={OrderTracking}
        options={{ title: "Theo dõi đơn hàng"}}
      />
      <ShopStack.Screen
        name="ProductShop"
        component={AddProductByShop}
        initialParams={{username}}
        options={{ title: "Sản phẩm nhà cung cấp" }}
      />
      <ShopStack.Screen
        name="Describe"
        component={DescribeProductShop}
        initialParams={{ username}}
        options={{ title: "Mô tả sản phẩm" }}
      />

      <ShopStack.Screen
        name="Repair"
        component={RepairProductShop}
        initialParams={{ username }}
        options={{ title: "Sửa sản phẩm" }}
      />
      <ShopStack.Screen
        name="Profile"
        component={Profile}
        initialParams={{username}}
        options={{ title: "Sản phẩm nhà cung cấp" }}
      />
      <ShopStack.Screen
        name="Pay"
        component={Pay}
        initialParams={{ username}}
        options={{ title: "Mô tả sản phẩm" }}
      />

      <ShopStack.Screen
        name="PaymentDetails"
        component={PaymentDetails}
        initialParams={{ username }}
        options={{ title: "Sửa sản phẩm" }}
      />

      <ShopStack.Screen
        name="GetSignupScreen"
        component={GetSignupScreen}
        initialParams={{ username }}
        options={{headerShown: false  }}
      />

      <ShopStack.Screen
        name="SignupSupplier"
        component={SignupSupplier}
        initialParams={{ username }}
        options={{headerShown: false  }}
      />

      <ShopStack.Screen
        name="GetSignupUserScreen"
        component={GetSignupUserSceen}
        initialParams={{ username }}
        options={{headerShown: false  }}
      />

      <ShopStack.Screen
        name="Login"
        component={Login}
        initialParams={{ username }}
        options={{headerShown: false  }}
      />

      <ShopStack.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        initialParams={{ username }}
        options={{headerShown: false  }}
      />
    
    </HomeStack.Navigator>
  );
}
