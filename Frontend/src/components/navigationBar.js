// BottomNavBar.js
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function NavBar({ navigation }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
        <Image source={require('../../assets/BackArrow_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Budget')}>
        <Image source={require('../../assets/BackArrow_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
        <Image source={require('../../assets/BackArrow_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('InventoryAvailable')}>
        <Image source={require('../../assets/BackArrow_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 60,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
