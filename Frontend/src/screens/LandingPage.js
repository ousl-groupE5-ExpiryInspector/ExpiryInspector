import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

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
        <TouchableOpacity style={styles.button} onPress={handleLanding}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4913',
    alignItems: 'center',
    justifyContent: 'space-between', // Space out items
  },
  curvedRectangle: {
    position: 'absolute',
    width: '100%',
    height: '73%', 
    backgroundColor: '#cfb5b2', 
    borderBottomRightRadius: 320, 
    top: 0, 
    zIndex: -1,
  },
  image: {
    width: '100%',
    height: '70%', 
    borderBottomRightRadius: 310,
    overflow: 'hidden',
    resizeMode: 'cover',
    marginTop: 0,
  },
  buttonContainer: {
    width: '100%', 
    alignItems: 'center',
    marginBottom: 50, 
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
