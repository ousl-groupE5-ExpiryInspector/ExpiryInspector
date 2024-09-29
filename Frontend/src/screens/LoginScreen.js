
 // Login page

 import React from 'react';
 import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 import InputFieldCom from '../components/inputField';
 import ButtonComponentAuth from '../components/ButtonComponentAuth';
 import ImageComponentAuth from '../components/ImageComponentAuth';
 import HeaderTextComponent from '../components/HeaderTextComponent';
 
 import BackgroundFlex from '../components/BackgroundFlex';
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
 
     <BackgroundFlex>
       <HeaderTextComponent title="Login Here"/>
 
       <View style={{margin:20}}>
       <ImageComponentAuth source={require('../../assets/Login.png')}/>
       </View>
       
       <InputFieldCom placeholder={'Email'} keyboardType='email-address' />
       <InputFieldCom placeholder={'Password'} secureTextEntry={true} />
       
       <TouchableOpacity style={styles.ForText} onPress={navigateToForgotPW}>
           <Text style={{color:'black'}}>Forgot Password?</Text>
       </TouchableOpacity>
       
 
       <ButtonComponentAuth title="Login" onPress={handleLogin}/>
       
       <View style={styles.rowContainer}>
         <Text style={styles.footerText}>Don't have an account? </Text>
 
         <TouchableOpacity style={styles.loginText} onPress={navigateToSignUp}>
         <Text style={{color:'white', fontWeight:'bold'}} > Create account</Text>
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
     textcolor:'white',
     fontWeight: 'bold',
     fontSize: 16,
   },
   ForText:{
     color: 'black',
     marginBottom:30,
     marginRight:20,
     alignSelf:'flex-end',
     fontWeight:'bold',
     
   },
 });
 
 
 
 