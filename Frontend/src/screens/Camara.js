// Camera.js
/*import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import NavBar from '../components/navigationBar';
import BackgroundFlex from '../components/BackgroundFlex';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export default function CameraScreen({ route, navigation }) {
  const { itemId } = route.params || {};
  const [image, setImage] = useState(null);
  const [capturedData, setCapturedData] = useState({
    text: '',
    expirationDates: [],
    manufactureDates: [],
    prices: [],
  });

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

        try {
          const recognizedText = await TextRecognition.recognize(uri);

          if (recognizedText && recognizedText.text) {
            const text = recognizedText.text;
            const expirationDates = extractExpirationDates(text);
            const manufactureDates = extractManufactureDates(text);
            const prices = extractPrices(text);

            setCapturedData({
              text,
              expirationDates,
              manufactureDates,
              prices,
            });
          } else {
            setCapturedData({
              text: '',
              expirationDates: [],
              manufactureDates: [],
              prices: [],
            });
          }
        } catch (error) {
          console.error("Text recognition failed:", error);
          Alert.alert("Text Recognition Error", "Failed to recognize text. Please try again.");
        }
      }
    });
  };

  const handleSave = () => {
    if (!itemId) {
      Alert.alert("Error", "No item ID found. Cannot update Firestore.");
      return;
    }
  
    navigation.navigate('ItemDetail', {
      item: {
        id: itemId,
        expireDate: capturedData.expirationDates[0] || '',
        manufactureDate: capturedData.manufactureDates[0] || '',
        price: capturedData.prices[0] || '',
      },
    });
  };
  

  // Functions to extract data
  const extractExpirationDates = (text) => {
    const expirationDateRegex = /(?:exp|EXP)\s*:? ?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{4}[-./]\d{1,2}[-./]\d{1,2})/gi;
    const matches = text.match(expirationDateRegex);
    return matches ? matches.map(match => formatDate(match)) : [];
  };

  const extractManufactureDates = (text) => {
    const manufactureDateRegex = /(?:mfg|MFG|mgd|MFD|mfd|Manufacture|MANUFACTURE)\s*:? ?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{4}[-./]\d{1,2}[-./]\d{1,2})/gi;
    const matches = text.match(manufactureDateRegex);
    return matches ? matches.map(match => formatDate(match)) : [];
  };

  const extractPrices = (text) => {
    const priceRegex = /(?:Rs|RS|₹)\s*[:=]?\s*([\d,.]+)/g;
    const matches = text.match(priceRegex);
    return matches ? matches.map(price => parseFloat(price.replace(/[^0-9.]/g, '').replace(/,/g, ''))) : [];
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.match(/(\d{1,2})[-./](\d{1,2})[-./](\d{2,4})/);
    if (dateParts) {
      let day = dateParts[1];
      let month = dateParts[2];
      let year = dateParts[3];
      if (year.length === 2) year = '20' + year;
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    }
    return null;
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
        <Text style={styles.textLabel}>Recognized Text:</Text>

        <ScrollView>
          <Text style={{width:300, textAlign: 'center'}}>{capturedData.text || 'No text recognized'}</Text>
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}*/
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import NavBar from '../components/navigationBar';
import BackgroundFlex from '../components/BackgroundFlex';
import { launchCamera } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth';
import { app } from '../auth/firebaseConfig';  

const db = getFirestore(app);

export default function CameraScreen({ route, navigation }) {
  
  const { itemId } = route.params || {};
  const [image, setImage] = useState(null);
  const auth = getAuth(app);
  const [capturedData, setCapturedData] = useState({
    text: '',
    expirationDates: [],
    manufactureDates: [],
    prices: [],
  });
  console.log('Item id:', itemId);

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

        try {
          // test read with package
          const recognizedText = await TextRecognition.recognize(uri);

          if (recognizedText && recognizedText.text) {
            const text = recognizedText.text;
            const expirationDates = extractExpirationDates(text);
            const manufactureDates = extractManufactureDates(text);
            const prices = extractPrices(text);

            setCapturedData({
              text,
              expirationDates,
              manufactureDates,
              prices,
            });
          } else {
            setCapturedData({
              text: '',
              expirationDates: [],
              manufactureDates: [],
              prices: [],
            });
          }
        } catch (error) {
          console.error("Text recognition failed:", error);
          Alert.alert("Text Recognition Error", "Failed to recognize text. Please try again.");
        }
      }
    });
  };

  const handleSave = async () => {
    if (!itemId) {
      Alert.alert("Error", "No item ID found. Cannot update Firestore.");
      return;
    }

    try {
      const itemRef = doc(db, "items", itemId);
      await updateDoc(itemRef, {
        expireDate: capturedData.expirationDates[0] || '',
        manufactureDate: capturedData.manufactureDates[0] || '',
        price: capturedData.prices[0] || '',
      });

      Alert.alert("Success", "Item details updated successfully!");
      navigation.goBack();  // Navigate back after saving
    } catch (error) {
      console.error("Error updating Firestore:", error);
      Alert.alert("Error", "Failed to update Firestore. Please try again.");
    }

    navigation.navigate('ItemDetail', {
      item: {
        id: itemId,
        expireDate: capturedData.expirationDates[0] || '',
        manufactureDate: capturedData.manufactureDates[0] || '',
        price: capturedData.prices[0] || '',
      },
    });
  };

  //  extract data
  const extractExpirationDates = (text) => {
    const expirationDateRegex = /(?:exp|EXP)\s*:? ?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{4}[-./]\d{1,2}[-./]\d{1,2})/gi;
    const matches = text.match(expirationDateRegex);
    return matches ? matches.map(match => formatDate(match)) : [];
  };

  const extractManufactureDates = (text) => {
    const manufactureDateRegex = /(?:mfg|MFG|mgd|MFD|mfd|Manufacture|MANUFACTURE)\s*:? ?\s*(\d{1,2}[-./]\d{1,2}[-./]\d{2,4}|\d{4}[-./]\d{1,2}[-./]\d{1,2})/gi;
    const matches = text.match(manufactureDateRegex);
    return matches ? matches.map(match => formatDate(match)) : [];
  };

  const extractPrices = (text) => {
    const priceRegex = /(?:Rs|RS|₹|Price|price|PRICE)\s*[:=]?\s*([\d,.]+)/g;
    const matches = text.match(priceRegex);
    return matches ? matches.map(price => parseFloat(price.replace(/[^0-9.]/g, '').replace(/,/g, ''))) : [];
  };

  const formatDate = (dateString) => {
    const dateParts = dateString.match(/(\d{1,2})[-./](\d{1,2})[-./](\d{2,4})/);
    if (dateParts) {
      let day = dateParts[1];
      let month = dateParts[2];
      let year = dateParts[3];
      if (year.length === 2) year = '20' + year;
      return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    }
    return null;
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
        <Text style={styles.textLabel}>Recognized Text:</Text>

        <ScrollView>
          <Text style={{ width: 300, textAlign: 'center' }}>
            {capturedData.text || 'No text recognized'}
          </Text>
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <Text style={styles.buttonText}>Capture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: 250,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  captureButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    margin: 10,
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
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    elevation: 3,
  },
});
