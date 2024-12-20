import React, { useState } from 'react';
import { View, StyleSheet, Alert,TouchableOpacity,Image } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../auth/firebaseConfig';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Email Sent',
        'A password reset link has been sent to your email. Please check your inbox.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error('Error sending password reset email:', error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };
  const handleFAQ = () => {
    // Navigate to FAQ screen
    navigation.navigate('FAQ');
  }
  return (
    <BackgroundFlex>
            <TouchableOpacity onPress={handleFAQ} style={styles.faqContainer}>
              <Image source={require('../../assets/faqIcon.png')} style={styles.faq} />
            </TouchableOpacity>
      <HeaderTextComponent title="Reset Password" />

      <View style={{ margin: 30 }}></View>
      <ImageComponentAuth source={require('../../assets/Reset_Pasword.png')} />

      <View style={{ margin: 40 }}></View>
      <InputFieldCom
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={{ margin: 40 }}></View>
      <ButtonComponentAuth title="Reset Password" onPress={handleForgotPassword} />
    </BackgroundFlex>
  );
}


// Define the styles 
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 30, 
  },
  faq: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  }, 
  faqContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 5,
  },
});
