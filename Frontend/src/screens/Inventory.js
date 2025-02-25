import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import TopBarButtons from '../components/TopBarButtons';
import Title2 from '../components/Title2';
import LableText from '../components/LableText';
import NumberValue from '../components/NumberValue';
import DescriptionText from '../components/DescriptionText';
import NavBar from '../components/navigationBar';

export default function InventoryScreen({ navigation }) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const categories = doc.data().categories || [];
          const formattedData = categories.map((category, index) => {
            const inStock = category.items ? category.items.length : 0;
            const totalValue = category.items
              ? category.items.reduce((sum, item) => sum + (item.price || 0), 0)
              : 0;
            return {
              id: index.toString(),
              category: category.name,
              inStock,
              expiringSoon: category.expiringSoon || 0, // Keep if required
              totalValue,
              description: category.description || '',
            };
          });
          setStocks(formattedData);
        }
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemList', { category: item.category })}>
      <View style={styles.stockItem}>
        <View style={styles.leftColumn}>
          <Title2>{item.category}</Title2>
          <DescriptionText>{item.description}</DescriptionText>
        </View>

        <View style={styles.midColumn}>
          <LableText>In Stock:</LableText>
          <LableText>To be Expired:</LableText>
          <LableText>Value: Rs.</LableText>
        </View>

        <View style={styles.rightColumn}>
          <NumberValue>{item.inStock}</NumberValue>
          <NumberValue>{item.expiringSoon}</NumberValue>
          <NumberValue>{item.totalValue.toFixed(2)}</NumberValue>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Stocks" MoveTo='Dashboard' navigation={navigation} />
      <TopBarButtons
        style={{ padding: -20 }}
        onExpiredPress={() => navigation.navigate('InventoryExpired')}
        onAvailablePress={() => navigation.navigate('InventoryAvailable')}
        onOutOfStockPress={() => navigation.navigate('InventoryOutOfStock')}
      />
      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD1C4',
    width: '100%',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    height: 110,
  },
  leftColumn: {
    flex: 4,
    justifyContent: 'center',
    marginRight: 20,
  },
  midColumn: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rightColumn: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
