import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ButtonComponentAuth from '../components/ButtonComponentAuth';

export default function LandingPage({ navigation }) {

  const handleLanding = () => {
    // Navigate to login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.curvedRectangle} />
      <Image source={require('../../assets/Landing_image.jpg')} style={styles.image} />
      
      <View style={styles.buttonContainer}>
        <ButtonComponentAuth title={'Get Started'} onPress={handleLanding}/>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4913',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  curvedRectangle: {
    position: 'absolute',
    width: '100%',
    height: '69%', 
    backgroundColor: '#cfb5b2', 
    borderBottomRightRadius: 320, 
    top: 0, 
    zIndex: -1,
  },
  image: {
    width: '100%',
    height: '66%', 
    borderBottomRightRadius: 310,
    overflow: 'hidden',
    resizeMode: 'cover',
    marginTop: 0,
  },
  buttonContainer: {
    width: '100%', 
    alignItems: 'center',
    marginBottom: 70, 
  },
  button: {
    width: 209,
    height: 52,
    backgroundColor: 'black',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
