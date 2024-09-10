import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function DescriptionText({ children }) {
  return <Text style={styles.description}>{children}</Text>;
}

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    fontStyle: 'normal',
    color: 'gray',
    marginTop: 5,
  },
});
