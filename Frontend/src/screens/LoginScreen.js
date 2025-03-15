import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';
import auth from '@react-native-firebase/auth'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleLogin = async () => {
    console.log('🔹 Attempting login for:', email);
  
    if (!email || !password) {
      console.log('❌ Error: Missing email or password.');
      Alert.alert('Error', 'Email and password are required.');
      return;
    }
  
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const user = userCredentials.user;
        console.log('✅ Login Successful!');
        console.log('👤 User Email:', user.email);
        console.log('🆔 User UID:', user.uid);
  
        // Save UID to AsyncStorage
        // Save UID to AsyncStorage
      try {
        await AsyncStorage.setItem('userUID', user.uid);
        console.log('💾 UID saved to AsyncStorage:', user.uid);
      } catch (error) {
        console.error('❌ Error saving UID to AsyncStorage:', error);
      }

  
        // Navigate to the Dashboard
        console.log('🔄 Navigating to Dashboard...');
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        console.log('❌ Login Error:', error.message);
        Alert.alert('Login Error', error.message);
      });
  };

  const navigateToSignUp = () => {
    console.log('🔄 Navigating to SignUp...');
    navigation.navigate('SignUp');
  };

  const navigateToForgotPW = () => {
    console.log('🔄 Navigating to Forgot Password...');
    navigation.navigate('FogotPassword');
  };

  return (
    <BackgroundFlex>
      <HeaderTextComponent title="Login Here" />

      <View style={{ margin: 20 }}>
        <ImageComponentAuth source={require('../../assets/Login.png')} />
      </View>

      <InputFieldCom
        placeholder={'Email'}
        keyboardType='email-address'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputFieldCom
        placeholder={'Password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.ForText} onPress={navigateToForgotPW}>
        <Text style={{ color: 'black' }}>Forgot Password?</Text>
      </TouchableOpacity>

      <ButtonComponentAuth title="Login" onPress={handleLogin} />

      <View style={styles.rowContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity style={styles.loginText} onPress={navigateToSignUp}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}> Create account</Text>
        </TouchableOpacity>
      </View>
    </BackgroundFlex>
  );
}


const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  footerText: {
    color: 'black',
    fontSize: 16,
  },
  loginText: {
    color: '#fbfafa',
    textColor: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ForText: {
    color: 'black',
    marginBottom: 30,
    marginRight: 20,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  },
});
