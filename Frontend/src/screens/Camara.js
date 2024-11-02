import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import NavBar from '../components/navigationBar';
import BackgroundFlex from '../components/BackgroundFlex';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function CameraScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleCapture = () => {
    launchCamera({ mediaType: 'photo' }, async (response) => {
        if (response.didCancel) {
            console.warn("Camera closed without capturing an image.");
        } else if (response.errorCode) {
            console.error("Camera error:", response.errorMessage);
            Alert.alert("Camera Error", "Could not open camera. Please try again.");
        } else if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;
            setImage(uri);
            console.log("Image captured:", uri);

            try {
                const recognizedText = await TextRecognition.recognize(uri);
                console.log("Recognized Text:", recognizedText.text); // Log the full recognized text

                if (recognizedText && recognizedText.text) {
                    const text = recognizedText.text;
                    setText(text);

                    // Filter out expiration dates, manufacture dates, and prices
                    const expirationDates = extractExpirationDates(text);
                    const manufactureDates = extractManufactureDates(text);
                    const prices = extractPrices(text);

                    console.log("Expiration Dates:", expirationDates);
                    console.log("Manufacture Dates:", manufactureDates);
                    console.log("Prices (in RS):", prices);
                } else {
                    setText(''); 
                    console.warn("No text recognized in the image.");
                }
            } catch (error) {
                console.error("Text recognition failed:", error);
                Alert.alert("Text Recognition Error", "Failed to recognize text. Please try again.");
            }
        }
    });
};

// Function to extract expiration dates
const extractExpirationDates = (text) => {
  const expirationDateRegex = /(?:exp|EXP)\s*:? ?\s*(\d{4}[-./]\d{1,2}[-./]\d{1,2})/gi;

    const matches = text.match(expirationDateRegex);
    return matches ? matches.map(match => match.split(":")[1].trim()) : []; // Return the date part
};

// Function to extract manufacture dates
const extractManufactureDates = (text) => {
    const manufactureDateRegex = /mfg\s*:\s*(\d{4}\/\d{1,2}\/\d{1,2})/gi; // Matches "mfg : YYYY/MM/DD"
    const matches = text.match(manufactureDateRegex);
    return matches ? matches.map(match => match.split(":")[1].trim()) : []; // Return the date part
};

// Function to extract prices in RS
const extractPrices = (text) => {
    const priceRegex = /(?:Rs|RS|₹)\s*\d+(?:\.\d{1,2})?/g; // Matches prices prefixed with "Rs", "RS", or "₹"
    return text.match(priceRegex) || [];
};




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
          <Text style={styles.textLabel}>Text Read:</Text>
          {text ? (
            <Text>{text}</Text> // Display the recognized text
          ) : (
            <Text>No text recognized</Text>
          )}
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
  textLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
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
