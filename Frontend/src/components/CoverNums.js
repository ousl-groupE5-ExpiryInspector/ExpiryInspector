import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function CoverNums({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontSize: 42,
    fontWeight: 'bold',
  },
});
