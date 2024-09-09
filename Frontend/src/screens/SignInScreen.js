import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';


export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    navigation.navigate('Dashboard');
  };
  
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <BackgroundFlex>
      <HeaderTextComponent title="Register Here" />
      
      <ImageComponentAuth source={require('../../assets/cover_signup.png')} />

      <InputFieldCom 
        placeholder="Name" 
        value={name} 
        onChangeText={setName} 
      />
      <InputFieldCom 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      <InputFieldCom 
        placeholder="Password" 
        secureTextEntry={true} 
        value={password} 
        onChangeText={setPassword} 
      />
      <InputFieldCom 
        placeholder="Confirm Password" 
        secureTextEntry={true} 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />

      <ButtonComponentAuth title="Register" onPress={handleRegister} />

      <View style={styles.rowContainer}>
        <Text style={styles.footerText}>
          If you have an account, please{' '}
        </Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginText}>Login here</Text>
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
