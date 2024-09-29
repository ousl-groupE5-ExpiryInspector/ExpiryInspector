import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import TopBarButtons from '../components/TopBarButtons';
import Title2 from '../components/Title2';
import LableText from '../components/LableText';
import NumberValue from '../components/NumberValue';
import DescriptionText from '../components/DescriptionText';
import NavBar from '../components/navigationBar';


export default function InventoryScreen({ navigation }) {

  const moveExpiredPress = () => {
    navigation.navigate('InventoryExpired');
  };

  const moveAvailablePress = () => {
    navigation.navigate('InventoryAvailable');
  };

  const moveOutOfStockPress = () => {
    navigation.navigate('InventoryOutOfStock');
  };

  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const sampleData = [
      { id: 1, category: 'Dairy', inStock: 50, expiringSoon: 5, totalValue: 150.00, description: 'Milk, Cheese, Yogurt, and more.' },
      { id: 2, category: 'Glossary', inStock: 100, expiringSoon: 10, totalValue: 200.00, description: 'Other items.' },
      { id: 3, category: 'Spices', inStock: 40, expiringSoon: 2, totalValue: 80.00, description: 'Various spices including turmeric, cumin, and more.' },
      { id: 4, category: 'Beverages', inStock: 75, expiringSoon: 7, totalValue: 350.00, description: 'Juices, soft drinks, water, and more.' },
      { id: 5, category: 'Grains', inStock: 40, expiringSoon: 2, totalValue: 800.00, description: 'Rice, wheat, etc.' },
      { id: 6, category: 'Sanitary', inStock: 75, expiringSoon: 7, totalValue: 300.00, description: 'Sanitary items.' },
    ];
    setStocks(sampleData);
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
      <HeaderWithIcon
        title="Stocks"
        MoveTo='Dashboard'
        navigation={navigation}
      />
      <TopBarButtons style={{padding:-20}}
        onExpiredPress={moveExpiredPress}
        onAvailablePress={moveAvailablePress}
        onOutOfStockPress={moveOutOfStockPress}
      />

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.id.toString()}
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
    margineTop: 20,
    paddingHorizontal: 10,
  },
});
