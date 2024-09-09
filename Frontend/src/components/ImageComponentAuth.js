import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function ImageComponentAuth({ source }) {
  return (
    <Image source={source} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 220,
    marginBottom: 5,
  },
});
