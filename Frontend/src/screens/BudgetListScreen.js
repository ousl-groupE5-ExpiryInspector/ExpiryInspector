import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

export default function BudgetListScreen({ route, navigation }) {
  const { budgets } = route.params;

  // Render each budget with its details
  const renderBudget = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BudgetPreviewScreen', { budget: item })}>
      <View style={styles.budgetItem}>
        <Text style={styles.budgetTitle}>Budget {item.id}</Text>
        <Text style={styles.infoText}>Current Budget: {item.maxBudget}</Text>
        <Text style={styles.infoText}>Total Value: {item.totalValue}</Text>
        <Text style={styles.infoText}>Available Balance: {(item.maxBudget - item.totalValue).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Budget Lists" MoveTo='Budget' navigation={navigation} />
      <View style={styles.ribbonContainer}>
        <Text style={styles.title}>Saved Budgets</Text>
      </View>
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBudget}
        contentContainerStyle={styles.listContainer}
      />
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  budgetItem: {
    backgroundColor: '#FFD1C4',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});