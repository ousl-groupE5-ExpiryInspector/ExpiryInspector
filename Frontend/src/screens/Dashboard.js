import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Dashboard({navigation}) {

  const handleUser = () =>{
    navigation.navigate('UserProfile');

  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Dashboard ss</Text>

      <TouchableOpacity onPress={handleUser}>
        <Text>
          User page
        </Text>
      </TouchableOpacity>
    </View>
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
