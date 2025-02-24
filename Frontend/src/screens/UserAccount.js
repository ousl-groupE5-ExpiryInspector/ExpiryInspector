import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../auth/firebaseConfig';

export default function CurrentUser() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [userId, setUserId] = useState(null);

  const storage = getStorage();

  const saveUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('userId', userId);
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
      await AsyncStorage.removeItem('userId');
      setUserData(null);
      setUserId(null);
      Alert.alert('Logged Out', 'You have been logged out successfully.');
      console.log('✅ User logged out');
    } catch (error) {
      console.error('❌ Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  // Function to pick an image from the gallery and upload it to Firebase Storage

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1, // Best quality
    };
  
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
        return;
      }
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        console.log('📷 Image Selected:', selectedImage);
        uploadImage(selectedImage); // Upload image to Firebase Storage
      }
    });
  };
  

// Function to upload image to Firebase Storage
const uploadImage = async (imageUri) => {
  if (!userId) {
    Alert.alert('Error', 'User ID not found.');
    return;
  }

  try {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profile_pictures/${userId}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('❌ Error uploading image:', error);
        Alert.alert('Upload Error', 'Failed to upload profile picture.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('✅ Image uploaded successfully:', downloadURL);
        setProfilePicture(downloadURL);
        await updateDoc(doc(firestore, 'users', userId), { profilePicture: downloadURL });
        Alert.alert('Success', 'Profile picture updated!');
      }
    );
  } catch (error) {
    console.error('❌ Error uploading image:', error);
    Alert.alert('Error', 'Failed to upload image.');
  }
};

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : userData ? (
        <>
          <Text>ID: {userId}</Text>

          {/* Profile Picture */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={profilePicture ? { uri: profilePicture } : require('../../assets/Login.png')}
              style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
            />
            <Button title="Upload Profile Picture" onPress={pickImage} />

          </TouchableOpacity>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter Name"
            style={{ borderWidth: 1, padding: 8, marginBottom: 10, width: '100%' }}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            style={{ borderWidth: 1, padding: 8, marginBottom: 10, width: '100%' }}
          />
          <Button title="Save" onPress={handleSave} />
          <View style={{ marginTop: 10 }} />
          <Button title="Logout" color="red" onPress={handleLogout} />
        </>
      ) : (
        <Text>No user logged in</Text>
      )}
    </View>
  );
}
