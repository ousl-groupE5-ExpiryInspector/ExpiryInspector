import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import Title2 from '../components/Title2';
import NumberValue from '../components/NumberValue';
import NavBar from '../components/navigationBar';
import TopBarButtons from '../components/TopBarButtons';
import CoverNums from '../components/CoverNums';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function InventoryOutOfStock({ navigation }) {
  const userId = auth().currentUser?.uid;
  const [outOfStockCounts, setOutOfStockCounts] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('items')
      .where('userId', '==', userId)
      .where('qty', '==', 0)
      .onSnapshot(snapshot => {
        const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Group by category and count out-of-stock items
        const categoryCounts = fetchedItems.reduce((acc, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {});

        // Convert object to array for FlatList
        const formattedCounts = Object.keys(categoryCounts).map(category => ({
          category,
          outOfStockCount: categoryCounts[category],
        }));

        setOutOfStockCounts(formattedCounts);
      });

    return () => unsubscribe();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Title2>{item.category}</Title2>
      <NumberValue>Out of Stock Items: </NumberValue>
      <CoverNums>{item.outOfStockCount}</CoverNums>
    </View>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Stocks" MoveTo='Dashboard' navigation={navigation} />

      <TopBarButtons
        onExpiredPress={() => navigation.navigate('InventoryExpired')}
        onAvailablePress={() => navigation.navigate('InventoryAvailable')}
        onOutOfStockPress={() => navigation.navigate('InventoryOutOfStock')}
      />

      <FlatList
        data={outOfStockCounts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD1C4',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
});