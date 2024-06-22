import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../constants/Button';
import app from '../firebaseConfig';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigation = useNavigation();

  const ShowToast = () => {
    ToastAndroid.show(
      "Successfully Logged In",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }

  const showIncorrect = () => {
    ToastAndroid.show(
      "Incorrect Credentials",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(firebaseAuth, email, password);
      ShowToast();
      navigation.navigate('Back');
    } catch (error) {
      console.error('Error logging in:', error);
      showIncorrect();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 'auto', gap:10 }}>
          <Image style={{ height: 80, width: 80 }} source={require('../assets/LOGO_2.png')} />
          <Text style={{ fontSize: 35, fontWeight: '700', paddingLeft:"10px", color:"#2583e5" }}>CRYPTIDE</Text>
        </View>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Hi Welcome Back ! 👋
          </Text>
          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Hello again you have been missed!</Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8
          }}>Email address</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              value={email}
              onChangeText={setEmail}
              style={{
                width: '100%'
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8
          }}>Password</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: '100%'
              }}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          marginVertical: 6
        }}>
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>Remember Me</Text>
        </View>
        <Button
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          onPress={handleLogin}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account?</Text>
          <Pressable
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;
