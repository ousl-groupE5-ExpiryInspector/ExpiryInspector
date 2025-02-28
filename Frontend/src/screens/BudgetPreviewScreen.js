import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

export default function BudgetPreviewScreen({ route, navigation }) {
  const { budget } = route.params;

  // Render each item with 'name', 'QTY', 'Total'
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.col1}>{item.name}</Text>
      <Text style={styles.col2}>{item.qty}</Text>
      <Text style={styles.col3}>{item.total.toFixed(2)}</Text>
    </View>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title={`Budget ${budget.id}`} MoveTo='BudgetListScreen' navigation={navigation} />
      <View style={styles.ribbonContainer}>
        <Text style={styles.title}>Budget Details</Text>
      </View>
      <View style={styles.budgetInfo}>
        <Text style={styles.infoText}>Current Budget: {budget.maxBudget}</Text>
        <Text style={styles.infoText}>Total Value: {budget.totalValue}</Text>
        <Text style={styles.infoText}>Available Balance: {(budget.maxBudget - budget.totalValue).toFixed(2)}</Text>
      </View>
      <FlatList
        data={budget.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD1C4',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 15,
    marginBottom: 15,
    borderRadius: 10,
    height: 50,
  },
  col1: { flex: 4, fontWeight: 'bold' },
  col2: { flex: 2 },
  col3: { flex: 3 },
  listContainer: {
    paddingHorizontal: 10,
  },
  ribbonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 60,
    width: '100%',
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  budgetInfo: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});