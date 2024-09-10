import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function NumberValue({ children }) {
  return <Text style={styles.value}>{children}</Text>;
}

const styles = StyleSheet.create({
  value: {
    fontSize: 12,
    color: '#000',
  },
});
