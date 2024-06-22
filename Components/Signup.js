import { View, Text, Image, Pressable, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Button from '../constants/Button';
import { app } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from 'firebase/auth';
import { collection, addDoc, doc, setDoc, getFirestore } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const SignupPage = () => {
  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [PhoneNumber, SetNumber] = useState('');
  const [Wallet, setWallet] = useState(0);

  const firebaseAuth = getAuth(app);
  const firestore = getFirestore(app);

  const ShowToast = () => {
    ToastAndroid.show(
      "Successfully Signed Up",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }

  const showIncorrect = () => {
    ToastAndroid.show(
      "Not able to sign up",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  }

  const handleSignup = async () => {
    try {
      // Create user account using email and password
      const response = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      // Obtain the UID of the newly created user
      const userId = response.user.uid;
    
      // Create user data object
      const userData = {
        Email: email,
        Name: name,
        Number: PhoneNumber,
        Password: password,
        Wallet: 0
      };
      // Set the user document in Firestore with the UID as the document ID
      const userDocRef = doc(firestore, 'users', userId);
      await setDoc(userDocRef, userData);
      await sendEmailVerification(response.user);
      console.log('User signed up successfully!');
      ShowToast()
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error signing up:', error);
      showIncorrect()
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginVertical: 12,
            color: COLORS.black
          }}>
            Create Account
          </Text>
          <Text style={{
            fontSize: 16,
            color: COLORS.black
          }}>Start your trading journey today!</Text>
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8
          }}>Name</Text>
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
              placeholder='Enter your name'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              value={name}
              onChangeText={setName}
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
          }}>Mobile Number</Text>
          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 22
          }}>
            <TextInput
              placeholder='+91'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              value={PhoneNumber}
              onChangeText={SetNumber}
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: '100%'
              }}
            />
            <TextInput
              placeholder='Enter your phone number'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{
                width: '80%'
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
          <Text>I agree to the terms and conditions</Text>
        </View>
        <Button
          title="Sign Up"
          filled
          onPress={handleSignup}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Already have an account</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: 'bold',
              marginLeft: 6
            }}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignupPage;
