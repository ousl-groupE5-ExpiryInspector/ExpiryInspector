import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
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

  // Debugging: Log input values when the handleRegister is called
  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // Validate if all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Firebase authentication for creating new user
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        // Optionally update the user's display name
        return user.updateProfile({ displayName: name });
      })
      .then(() => {
        Alert.alert('Success', 'User registered successfully.');
        navigation.navigate('Dashboard');  // Navigate to the Dashboard screen after registration
      })
      .catch(error => {
        Alert.alert('Registration Error', error.message);
      });
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
        onChangeText={(text) => setName(text)}  // Ensure state is updated correctly
      />
      <InputFieldCom
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}  // Ensure state is updated correctly
      />
      <InputFieldCom
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}  // Ensure state is updated correctly
      />
      <InputFieldCom
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}  // Ensure state is updated correctly
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
