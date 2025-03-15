import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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

  const handleRegister = async () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
  
    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
  
      const defaultProfilePic = '';
  
      const defaultCategories = [
        { name: 'Dairy', description: 'Milk, Cheese, Yogurt, and more.', items: [] },
        { name: 'Spices', description: 'Various spices including turmeric, cumin, and more.', items: [] },
        { name: 'Grains', description: 'Rice, wheat, etc.', items: [] },
        { name: 'Glossary', description: 'Other items.', items: [] },
        { name: 'Sanitary', description: 'Sanitary items.', items: [] },
        { name: 'Other', description: 'Other household items.', items: [] },
      ];
  
      // Store user data including categories
      await firestore().collection('users').doc(user.uid).set({
        name: name,
        email: email,
        profile_picture: defaultProfilePic,
        createdAt: firestore.FieldValue.serverTimestamp(),
        categories: defaultCategories, // Store categories as array 
      });
  
      // Update Firebase 
      await user.updateProfile({ displayName: name, photoURL: defaultProfilePic });
  
      Alert.alert('Success', 'User registered successfully.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  
  

  /* const handleRegister = async () => {
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

    try {
      const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      console.log('Registered with:', user.email);

      // Store user data in Firestore
      await firestore().collection('Users').doc(user.uid).set({
        name: name,
        email: email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // Optionally update the user's display name
      await user.updateProfile({ displayName: name });

      Alert.alert('Success', 'User registered successfully.');
      navigation.navigate('Login');
    } catch (error) {
      {/*Alert.alert('Registration Error', error.message);}
      Alert.alert('Success', 'User registered successfully.');
      navigation.navigate('Login');
    }
  }; */

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
        onChangeText={(text) => setName(text)}
      />
      <InputFieldCom
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)} 
      />
      <InputFieldCom
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)} 
      />
      <InputFieldCom
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)} 
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
