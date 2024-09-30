import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '../components/navigationBar';
import BackgroundFlex from '../components/BackgroundFlex';

export default function CamaraScreen({ navigation }) {
  const handleCapture = () => {
    // Your capture logic goes here
    console.log('Capture button pressed');
  };

  return (
    <BackgroundFlex>
      <View style={styles.container}>
        <View style={styles.rectangle} />
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 400,
    height: 400,
    backgroundColor: 'black',
    marginBottom: 20,
  },
  captureButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
