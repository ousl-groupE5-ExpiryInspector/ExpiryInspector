import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native'; 
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
  const userId = auth().currentUser?.uid; // current  user ID

  // Function fetch data
  const fetchData = async () => {
    if (!userId) return; 

    try {
      // categories from the 'users' 
      const userDoc = await firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        console.log('No user document found');
        return;
      }

      const userCategories = userDoc.data().categories || [];
      console.log('User Categories:', userCategories);

      // items filtered by  current userId
      const itemsSnapshot = await firestore()
        .collection('items')
        .where('userId', '==', userId) 
        .get();

      const allItems = itemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('All Items for User:', allItems);

      //  Filter by categories
      const filteredItems = allItems.filter(item =>
        userCategories.some(category => category.name === item.category) // Match categories
      );
      console.log('Filtered Items:', filteredItems);

      //  Process categorires
      const formattedData = userCategories.map((category, index) => {
        const categoryItems = filteredItems.filter(item => item.category === category.name);

        const totalValue = categoryItems.reduce(
          (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.price) || 0),
          0
        );
        const expiringSoon = categoryItems.filter(item => 
          new Date(item.expireDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        ).length;

        return {
          id: index.toString(),
          category: category.name,
          inStock: categoryItems.length,
          expiringSoon,
          totalValue,
          description: category.description || '',
        };
      });

      setStocks(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // refresh data 
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [userId]) 
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemList', { category: item.category })}>
      <View style={styles.stockItem}>
        <View style={styles.leftColumn}>
          <Title2>{item.category || 'Unknown'}</Title2>
          <DescriptionText>{item.description || ''}</DescriptionText>
        </View>

        <View style={styles.midColumn}>
          <LableText>In Stock:</LableText>
          <LableText>To be Expired:</LableText>
          <LableText>Value: Rs.</LableText>
        </View>

        <View style={styles.rightColumn}>
          <NumberValue>{item.inStock || 0}</NumberValue>
          <NumberValue>{item.expiringSoon || 0}</NumberValue>
          <NumberValue>{typeof item.totalValue === 'number' ? item.totalValue.toFixed(2) : '0.00'}</NumberValue>
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
