import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../auth/firebaseConfig';

export default function UserAccount({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userId, setUserId] = useState(null);

  const saveUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userUId', userId);
      console.log('✅ User ID saved to AsyncStorage:', userId);
    } catch (error) {
      console.error('❌ Error saving user ID:', error);
    }
  };

  const getUserIdFromStorage = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userUID');
      return storedUserId || null;
    } catch (error) {
      console.error('❌ Error retrieving user ID:', error);
      return null;
    }
  };

  const fetchUserDetails = async (uid) => {
    try {
      console.log('📌 Fetching User Data for UID:', uid);
      const userDocRef = doc(firestore, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
        setName(userData.name || '');
        setEmail(userData.email || '');
        setProfilePicture(userData.profile_picture || null);
        setUserId(uid);
        console.log('✅ User Data:', userData);
      } else {
        console.warn('⚠️ User document not found in Firestore!');
      }
    } catch (error) {
      console.error('❌ Error fetching user details:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const storedUserId = await getUserIdFromStorage();
      if (storedUserId) {
        fetchUserDetails(storedUserId);
      } else {
        setUserData(null);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await saveUserId(user.uid);
        fetchUserDetails(user.uid);
      } else {
        console.warn('⚠️ No user logged in. Checking AsyncStorage...');
        checkUser();
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { name, email });
      Alert.alert('Success', 'User data updated successfully!');
      console.log('✅ User data updated:', { name, email });
    } catch (error) {
      console.error('❌ Error updating user data:', error);
      Alert.alert('Error', 'Failed to update user data.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('userUId');
      setUserData(null);
      setUserId(null);
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, response => {
      if (response.assets && response.assets.length > 0) {
        const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
        console.log('📷 Base64 Image Selected');
        setProfilePicture(base64Image);
        saveImageToFirestore(base64Image);
      }
    });
  };

  const saveImageToFirestore = async (base64Image) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found.');
      return;
    }

    try {
      const userDocRef = doc(firestore, 'users', userId);
      await updateDoc(userDocRef, { profile_picture: base64Image });
      Alert.alert('Success', 'Profile picture updated!');
      console.log('✅ Base64 Image saved to Firestore');
    } catch (error) {
      console.error('❌ Error saving image to Firestore:', error);
      Alert.alert('Error', 'Failed to save image.');
    }
  };

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="User Profile" MoveTo="Dashboard" navigation={navigation} />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : userData ? (
          <>
            <TouchableOpacity onPress={pickImage}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.userAccountImg} />
              ) : (
                <Image source={require('../../assets/userAccount_pic.png')} style={styles.userAccountImg} />
              )}
            </TouchableOpacity>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>Name:</Text>
              <TextInput style={styles.infoText} value={name} onChangeText={setName} placeholder="Enter Name" />

              <Text style={styles.label}>Email:</Text>
              <TextInput style={styles.infoText} value={email} onChangeText={setEmail} placeholder="Enter Email" keyboardType="email-address" />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>No user logged in</Text>
        )}
      </View>
    </BackgroundFlex>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  userAccountImg: {
    width: 200,
    height: 200,
    borderRadius: 75,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  infoContainer: {
    width: '80%',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  infoText: {
    fontSize: 18,
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    color: 'black',
  },
  logoutButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#8B0000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});