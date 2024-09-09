import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function SignInScreen({ navigation }) {
  const handleLogin = () => {
    // Button click will navigate to the Dashboard
    navigation.navigate('Dashboard');
  };

  const navigateToLogin = () => {
    // Redirect to Sign Up screen
    navigation.navigate('Login');
  };

  const navigateToForgotPW = () => {
    // Redirect to Forgot Password screen
    navigation.navigate('ForgotPass');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sign In Screen</Text>

      <TouchableOpacity onPress={handleLogin}>
        <Text>signin</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToForgotPW}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>

      <Text>
        If you don't have an account, please{' '}
        <TouchableOpacity onPress={navigateToLogin}>
          <Text>Login here</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
