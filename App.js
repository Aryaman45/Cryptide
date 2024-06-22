import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CryptoDetail from './Components/CryptoDetails';
import MyTabs from './Components/Watchlist'; // Assuming this is a valid component
import Profile from './Components/Profile';
import Portfolio from './Components/Portfolio';
import BuyScreen from './Components/BuyScreen';
import LoginPage from './Components/Login';
import Welcome from './Components/Welcome';
import SignupPage from './Components/Signup';
import WithdrawScreen from './Components/WithdrawScreen';
import SellScreen from './Components/SellScreen';
import UserDetail from './Components/UserDetails';


const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

// Define the bottom tab navigator
function MyBottomTabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen 
        name="Home" 
        component={Profile} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/home.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#6200ee' : '#828282'
              }}
            />
          )
        }}
      />
      <BottomTab.Screen 
        name="Watchlist" 
        component={MyTabs} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/market.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#6200ee' : '#828282'
              }}
            />
          )
        }}
      />
      <BottomTab.Screen 
        name="Portfolio" 
        component={Portfolio} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('./assets/portfolio.png')}
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#6200ee' : '#828282'
              }}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}



// Main app component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Back" component={MyBottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetail} />
        <Stack.Screen name="BUY" component={BuyScreen} />
        <Stack.Screen name="Sell" component={SellScreen} />


        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="KYC" component={UserDetail} />


        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupPage} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} /> */}





      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
