import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';
import TopBarButtons2 from '../components/TopBarButtons2';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BudgetListScreen({ navigation }) {
  const [budgets, setBudgets] = useState([]);
  const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('budgets')
      .where('userId', '==', userId)
      .onSnapshot(snapshot => {
        const fetchedBudgets = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBudgets(fetchedBudgets);
      });

    return () => unsubscribe();
  }, [userId]);

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Budget List" MoveTo="Dashboard" navigation={navigation} />
      <TopBarButtons2
        onBudgetPress={() => navigation.navigate('Budget')}
        onSavedPress={() => navigation.navigate('BudgetListScreen')}
      />
      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BudgetPlanner', { budget: item })}>
            <View style={styles.budgetItem}>
              <Text>{item.name}</Text>
              <Text>{item.totalValue}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}


const styles = StyleSheet.create({
  budgetItem: {
    backgroundColor: '#FFD1C4',
    padding: 18,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#060606',
  },
  deleteIcon: {
    padding: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});
