import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BackgroundFlex({ children }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF4913',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
