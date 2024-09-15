import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

export default function FAQScreen({ navigation }) {
  return (
    <BackgroundFlex>
      <HeaderWithIcon title="FAQ" MoveTo='Dashboard' navigation={navigation} />
       <View style={styles.container}>
       <Text>FAQ page</Text>
      
     
        
      </View>
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});