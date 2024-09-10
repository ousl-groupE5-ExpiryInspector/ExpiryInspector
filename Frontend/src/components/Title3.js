import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Title3({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});
