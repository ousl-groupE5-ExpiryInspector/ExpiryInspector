import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

export default function BudgetPreviewScreen({ route, navigation }) {
  const { budget } = route.params;

  // Render each item with 'name', 'QTY', 'Total'
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.col1}>Name: {item.name}</Text>
      <Text style={styles.col2}>Quantity: {item.qty}</Text>
      <Text style={styles.col3}>Total: {item.total.toFixed(2)}</Text>
    </View>
  );

  // Render budget information
  const renderBudgetInfo = () => (
    <View style={styles.budgetInfo}>
      <Text style={styles.infoText}>Current Budget: {budget.maxBudget}</Text>
      <Text style={styles.infoText}>Total Value: {budget.totalValue}</Text>
      <Text style={styles.infoText}>Available Balance: {(budget.maxBudget - budget.totalValue).toFixed(2)}</Text>
    </View>
  );

  // Navigate to BudgetPlanner screen with the selected budget
  const addToBudgetPlanner = () => {
    navigation.navigate('BudgetPlanner', { budget });
  };

  return (
    <BackgroundFlex>
      <HeaderWithIcon title={`Budget ${budget.id}`} MoveTo='BudgetListScreen' navigation={navigation} />
      <View style={styles.ribbonContainer}>
        <Text style={styles.title}>Budget Details</Text>
      </View>
      <FlatList
        data={[{ key: 'budgetInfo' }, ...budget.items]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item.key === 'budgetInfo' ? renderBudgetInfo() : renderItem({ item })}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={addToBudgetPlanner}>
        <Text style={styles.buttonText}>Add to Budget Planner</Text>
      </TouchableOpacity>
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
  col1: {
    flex: 4,
    fontWeight: 'bold',
    color: '#060606',
  },
  col2: {
    flex: 2,
    color: '#060606',
  },
  col3: {
    flex: 3,
    color: '#060606',
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
    color: '#060606',
  },
  budgetInfo: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 20,
    marginBottom: 5,
    color: '#060606',
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});