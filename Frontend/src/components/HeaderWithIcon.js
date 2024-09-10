import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HeaderWithIcon({ title, MoveTo, navigation }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(MoveTo)}>
        <Image
          source={require('../../assets/BackArrow_icon.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'inter',
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
