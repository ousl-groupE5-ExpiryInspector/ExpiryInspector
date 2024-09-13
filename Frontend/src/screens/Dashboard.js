import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import NavBar from '../components/navigationBar';

export default function Dashboard({navigation}) {

  const handleUser = () =>{
    navigation.navigate('UserProfile');
  };
  const moveInventory = () =>{
    navigation.navigate('InventoryAvailable');
  };
  const moveBudget = () =>{
    navigation.navigate('Budget');
  };

  return (
    <BackgroundFlex>
      <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Dashboard ss</Text>

      <TouchableOpacity onPress={handleUser}>
        <Text>
          User page
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={moveInventory}>
        <Text>
          inventory
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={moveBudget}>
        <Text>
          budget
        </Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
