// Login page

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';
import auth from '@react-native-firebase/auth'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle user login
  const handleLogin = () => {
    // Validate input fields
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        // Navigate to the Dashboard after successful login
        navigation.navigate('Dashboard');
      })
      .catch(error => {
        Alert.alert('Login Error', error.message);
      });
  };

  const navigateToSignUp = () => {
    // Redirect to Sign Up screen
    navigation.navigate('SignUp');
  };

  const navigateToForgotPW = () => {
    // Redirect to Forgot Password screen
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
