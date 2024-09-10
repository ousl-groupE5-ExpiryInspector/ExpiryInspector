import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function LableText({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
});
