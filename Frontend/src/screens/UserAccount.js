import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';

export default function UserAccount({ navigation }) {
  return (
    <BackgroundFlex>
      {/* Header with Back Icon */}
      <HeaderWithIcon
        title="User Profile"
        MoveTo='Dashboard'
        navigation={navigation}
      />

      <View style={styles.container}>
        {/* User Avatar */}
        <Image source={require('../../assets/userAccount_pic.png')} style={styles.userAccountImg} />

        {/* Name and Email Dummy Data */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>John Doe</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>john.doe@example.com</Text>
        </View>

        {/* Logout and Delete Account Buttons */}
        <TouchableOpacity style={styles.logoutButton}>
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
