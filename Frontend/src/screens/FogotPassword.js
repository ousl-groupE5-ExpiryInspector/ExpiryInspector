import React, { useState } from 'react';
import {View, StyleSheet, Alert } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';


export default function FogotPasswordScreen({ navigation }) {
  // State to store the user's email input
  const [email, setEmail] = useState('');
  
  // Function to handle the "Link Email" button click
  const handleFogetPasword = () => {
    // Display alert
    Alert.alert(
      "Email Sent",
      "Please check your email",
      [
        // Action when "OK" is pressed
        { text: "OK", onPress: () => navigation.navigate('Login') }
      ]
    );
  };
  
  return (
    // Using custom background layout for the screen
    <BackgroundFlex>
      <HeaderTextComponent title="Reset Password" />
      
      <View style={{margin:30}} ></View>
      <ImageComponentAuth source={require('../../assets/Reset_Pasword.png')}/>

      <View style={{margin:40}}></View>
      <InputFieldCom 
        placeholder="Email" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
    
      <View style={{margin:40}}></View>
      <ButtonComponentAuth title="Link Email" onPress={handleFogetPasword} />

    </BackgroundFlex>
  );
}

// Define the styles for the screen elements
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 30, 
  },
   
  
});
