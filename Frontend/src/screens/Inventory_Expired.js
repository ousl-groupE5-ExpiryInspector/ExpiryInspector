import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import Title2 from '../components/Title2';
import NumberValue from '../components/NumberValue';
import NavBar from '../components/navigationBar';
import TopBarButtons from '../components/TopBarButtons';
import CoverNums from '../components/CoverNums';

export default function InventoryExpired({ navigation }) {
  const moveExpiredPress = () => {
    navigation.navigate('InventoryExpired');
  };

  const moveAvailablePress = () => {
    navigation.navigate('InventoryAvailable');
  };

  const moveOutOfStockPress = () => {
    navigation.navigate('InventoryOutOfStock');
  };

  const [expiredCounts, setExpiredCounts] = useState([]);
  
  const allItems = [
    { id: 1, category: 'Dairy', name: 'Milk', qty: 10, expireDate: '2024-09-20', value: 30 },
    { id: 2, category: 'Dairy', name: 'Cheese', qty: 5, expireDate: '2024-09-30', value: 50 },
    { id: 3, category: 'Spices', name: 'Turmeric', qty: 8, expireDate: '2025-01-01', value: 20 },
    { id: 4, category: 'Spices', name: 'Cumin', qty: 12, expireDate: '2025-03-15', value: 40 },
    { id: 5, category: 'Glossary', name: 'Flour', qty: 20, expireDate: '2023-09-10', value: 25 },
    { id: 6, category: 'Glossary', name: 'Sugar', qty: 15, expireDate: '2024-12-25', value: 60 },
    { id: 2, category: 'Beverages', name: 'Orange Juice', qty: 3, expireDate: '2024-08-30', value: 40 },
    { id: 3, category: 'Grains', name: 'Oats', qty: 2, expireDate: '2024-09-13', value: 500 },
    { id: 3, category: 'Sanitary', name: 'Soap', qty: 10, expireDate: '2024-05-01', value: 150 },

  ];

  useEffect(() => {
    const currentDate = new Date();
    const categories = [...new Set(allItems.map(item => item.category))];

    const counts = categories.map(category => {
      const expiredItemsCount = allItems.filter(
        item => item.category === category && new Date(item.expireDate) < currentDate
      ).length;

      return { category, expiredCount: expiredItemsCount };
    });

    setExpiredCounts(counts);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Title2>{item.category}</Title2>
      <NumberValue>Expired Items:</NumberValue>
      <CoverNums>{item.expiredCount}</CoverNums>
    </View>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Stocks" MoveTo='Dashboard' navigation={navigation} />

      <TopBarButtons style={{padding:-20}}
        onExpiredPress={moveExpiredPress}
        onAvailablePress={moveAvailablePress}
        onOutOfStockPress={moveOutOfStockPress}
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