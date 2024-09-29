import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import NavBar from '../components/navigationBar';
import HomeTopBar from '../components/HomeTopBar';

export default function Dashboard({ navigation }) {

  const moveInventory = () => {
    navigation.navigate('InventoryAvailable');
  };
  const moveBudget = () => {
    navigation.navigate('Budget');
  };
  const moveFAQ = () =>{
    navigation.navigate('FAQ');
  };
  const moveCamara = () =>{
    navigation.navigate('Camara');
  };

  return (
    <>
    <BackgroundFlex>
      <HomeTopBar MoveTo='UserProfile'
        navigation={navigation} />
      <View style={styles.WelcomeContainer}>
        <ImageBackground
          source={require('../../assets/welcomeImage.png')}
          style={styles.imageBackground}
          resizeMode='cover'>
          <Text style={styles.HeaderText}>Welcome to the Dashboard</Text>
        </ImageBackground>
      </View>
      
        <View style={styles.container}>
          {/* Inventory Box */}
          <TouchableOpacity onPress={moveInventory} style={styles.box}>
            <ImageBackground
              source={require('../../assets/inventory.png')}
              style={styles.imageBackground}
              resizeMode='cover'>
              <Text style={styles.boxText}>Inventory</Text>
            </ImageBackground>
          </TouchableOpacity>

          {/* Budget Box */}
          <TouchableOpacity onPress={moveBudget} style={styles.box}>
            <ImageBackground
              source={require('../../assets/budget.png')}
              style={styles.imageBackground}
              resizeMode='cover'>
              <Text style={styles.boxText}>Budget</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <NavBar navigation={navigation} />
      </BackgroundFlex>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  boxText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  WelcomeContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    alignItems: 'center',

  },
  box: {
    width: 400,
    height: 200,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  HeaderText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
  },
});
