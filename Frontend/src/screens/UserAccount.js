import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';

export default function UserAccount({ navigation }) {

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    image: null,
  });

  useEffect(() => {
    // Simulate fetching default user data from an external database
    const fetchUserData = async () => {
      const defaultData = {
        name: 'Sahani Weerasinghe',
        email: 'sahani123@ousl.com',
        image: null,
      };
      setUserData(defaultData);
    };

    fetchUserData();
  }, []);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (!response.didCancel && !response.error) {
        const imageUri = response.assets[0].uri;
        setUserData({ ...userData, image: imageUri });
      }
    });
  };

  const handleUpdateUser = () => {
    console.log('Updated User Data:', userData);
    // Logic to update user data in the database can be implemented here
    alert('User information updated successfully!');
  };

  return (
    <BackgroundFlex>
      {/* Header with Back Icon */}
      <HeaderWithIcon
        title="User Profile"
        MoveTo="Dashboard"
        navigation={navigation}
      />

      <View style={styles.container}>
        {/* User Avatar */}
        <TouchableOpacity onPress={pickImage}>
          {userData.image ? (
            <Image source={{ uri: userData.image }} style={styles.userAccountImg} />
          ) : (
            <Image source={require('../../assets/userAccount_pic.png')} style={styles.userAccountImg} />
          )}
        </TouchableOpacity>

        {/* Update Name and Email */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.infoText}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            placeholder="Enter your name"
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.infoText}
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleUpdateUser}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        {/* Logout and Delete Account Buttons */}
        <TouchableOpacity style={styles.logoutButton} onPress={navigateToLogin}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete account</Text>
        </TouchableOpacity>
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
