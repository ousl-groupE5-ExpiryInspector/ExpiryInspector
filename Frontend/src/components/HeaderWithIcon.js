import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HeaderWithIcon = ({ title, onIconPress, iconSource }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onIconPress}>
        <Image
          source={iconSource}
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
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  headerText: {
    fontSize: 28,
    color:'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default HeaderWithIcon;
