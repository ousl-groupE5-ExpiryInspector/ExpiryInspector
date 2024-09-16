import React, { useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import InputFieldCom from '../components/inputField';
import ButtonComponentAuth from '../components/ButtonComponentAuth';
import ImageComponentAuth from '../components/ImageComponentAuth';
import HeaderTextComponent from '../components/HeaderTextComponent';
import BackgroundFlex from '../components/BackgroundFlex';


export default function FogotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  
  const handleFogetPasword = () => {
    navigation.navigate('Dashboard');
  };
  
  return (
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

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginTop: 10, 
    marginBottom: 30, 
  },
   
  
});
