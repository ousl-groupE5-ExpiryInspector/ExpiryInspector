import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

export default function ItemDetail({ route, navigation }) {
  const { item } = route.params; 

  return (
    <BackgroundFlex>
      <HeaderWithIcon
        title={item.name}
        MoveTo='ItemList'
        navigation={navigation}
      />

      <View style={styles.container}>
          <Text style={styles.value}>{item.name}</Text>
          <Text style={styles.value}>{item.qty}</Text>
          <Text style={styles.value}>{item.expireDate}</Text>
          <Text style={styles.value}>{item.description}</Text>
          <Text style={styles.label}>Value (per unit):</Text>
          <Text style={styles.value}>${item.value}</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back to Items</Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({});
