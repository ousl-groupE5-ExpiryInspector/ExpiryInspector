import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function HeaderTextComponent({ title }) {
  return (
    <Text style={styles.header}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: 'inter',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
});
