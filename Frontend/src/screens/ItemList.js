import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';

export default function ItemList({ route, navigation }) {

  return (
    <BackgroundFlex>
      <HeaderWithIcon
        title='{category}'
        MoveTo='InventoryAvailable'
        navigation={navigation}
      />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({});
