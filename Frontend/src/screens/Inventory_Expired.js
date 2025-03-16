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

export default function InventoryExpired({ navigation }) {
  const [expiredCounts, setExpiredCounts] = useState([]);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const fetchExpiredItems = async () => {
      try {
        const snapshot = await firestore()
          .collection('items')
          .where('userId', '==', userId)
          .get();

        const currentDate = new Date();
        const expiredItems = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => new Date(item.expireDate) < currentDate);

        const categories = [...new Set(expiredItems.map(item => item.category))];

        const counts = categories.map(category => {
          const expiredItemsCount = expiredItems.filter(item => item.category === category).length;
          return { category, expiredCount: expiredItemsCount };
        });

        setExpiredCounts(counts);
      } catch (error) {
        console.error("Error fetching expired items: ", error);
      }
    };

    fetchExpiredItems();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Title2>{item.category}</Title2>
      <NumberValue>Expired Items:</NumberValue>
      <CoverNums>{item.expiredCount}</CoverNums>
    </View>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Stocks" MoveTo="Dashboard" navigation={navigation} />
      <TopBarButtons
        onExpiredPress={() => navigation.navigate('InventoryExpired')}
        onAvailablePress={() => navigation.navigate('InventoryAvailable')}
        onOutOfStockPress={() => navigation.navigate('InventoryOutOfStock')}
        onOtherPress={() => navigation.navigate('Dashboard')}
      />
      <FlatList
        data={expiredCounts}
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