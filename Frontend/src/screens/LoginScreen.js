import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import InputFieldCom from '../components/inputField';

export default function LoginScreen({ navigation }) {
  const handleLogin = () => {
    // Button click will navigate to the Dashboard
    navigation.navigate('Dashboard');
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
    <View style={{ padding: 20 }}>
      <Text>Login Screen</Text>

      <InputFieldCom placeholder={'Email'} keyboardType='email-address' />
      <InputFieldCom placeholder={'Password'} secureTextEntry={true} />

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToForgotPW}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>

      <Text>
        If you don't have an account, please{' '}
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text>Sign up here</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
