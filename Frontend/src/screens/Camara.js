import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import NavBar from '../components/navigationBar';
import BackgroundFlex from '../components/BackgroundFlex';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);

  const handleCapture = () => {
    launchCamera({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.warn("Camera closed without capturing an image.");
      } else if (response.errorCode) {
        console.error("Camera error:", response.errorMessage);
        Alert.alert("Camera Error", "Could not open camera. Please try again.");
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log("Image captured:", uri);
        setImage(uri);
      }
    });
  };

  useEffect(() => {
    const recognizeText = async () => {
      if (image) {
        try {
          console.log("Starting text recognition on:", image);
          const result = await TextRecognition.recognize(image);
          console.log("Recognition result:", result);
          setText(result);
        } catch (error) {
          console.error("Text recognition failed:", error);
          Alert.alert("Text Recognition Error", "Failed to recognize text. Please try again.");
        }
      }
    };

    recognizeText();
  }, [image]);

  return (
    <BackgroundFlex>
      <View style={styles.container}>
        <View style={styles.rectangle}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.placeholderText}>No Image Captured</Text>
          )}
        </View>
        <View>
          <Text>Text Read</Text>
          {text ? <Text>{text.join(' ')}</Text> : <Text>No text recognized</Text>}
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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
