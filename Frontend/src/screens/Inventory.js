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

    // Fetch categories from users collection
    const userRef = firestore().collection('users').doc(userId);
    userRef.get().then(async (doc) => {
      if (doc.exists) {
        const categories = doc.data().categories || []; // Get categories array from user

        // Fetch items for each category
        const categoryPromises = categories.map(async (category) => {
          const itemsSnapshot = await firestore()
            .collection('items')
            .where('userId', '==', userId)
            .where('category', '==', category.name)
            .get();

          const items = itemsSnapshot.docs.map((doc) => doc.data());

          // Calculate values
          const inStock = items.length;
          const totalValue = items.reduce(
            (sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.price) || 0)),
            0
          );
          const expiringSoon = items.filter(item =>
            new Date(item.expireDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          ).length;

          return {
            id: category.name, // Use category name as unique ID
            category: category.name,
            description: category.description || '',
            inStock,
            expiringSoon,
            totalValue,
          };
        });

        // Wait for all category data to be fetched
        const stockData = await Promise.all(categoryPromises);
        setStocks(stockData);
      }
    });
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
      <HeaderWithIcon title="Stocks" MoveTo="Dashboard" navigation={navigation} />
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
