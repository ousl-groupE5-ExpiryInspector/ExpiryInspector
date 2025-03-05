import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';

import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';

export default function BudgetListScreen({ route, navigation }) {
  const [budgets, setBudgets] = useState(route.params.budgets || []);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = auth().currentUser;
      if (user) {
        setUserId(user.uid);
        fetchUserBudgets(user.uid);
      } else {
        setUserId(null);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (route.params?.budgets) {
      setBudgets(route.params.budgets);
    }
  }, [route.params?.budgets]);

  const fetchUserBudgets = (uid) => {
    const q = query(collection(firestore, 'budgets'), where('userId', '==', uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const budgetsData = [];
      querySnapshot.forEach((doc) => {
        budgetsData.push({ id: doc.id, ...doc.data() });
      });
      setBudgets(budgetsData);
    });
    return unsubscribe;
  };

  // Delete budget function
  const deleteBudget = async (id) => {
    Alert.alert(
      "Delete Budget",
      "Are you sure you want to delete this budget?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK", onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'budgets', id));
              const updatedBudgets = budgets.filter(budget => budget.id !== id);
              setBudgets(updatedBudgets);
            } catch (error) {
              console.error('Error deleting budget:', error);
              Alert.alert('Error', `An error occurred while deleting the budget: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  // Render each budget with its details
  const renderBudget = ({ item }) => (
    <View style={styles.budgetItem}>
      <TouchableOpacity onPress={() => navigation.navigate('BudgetPreviewScreen', { budget: item })}>
        <Text style={styles.budgetTitle}>Budget {item.id}</Text>
        <Text style={styles.infoText}>Current Budget: {item.maxBudget}</Text>
        <Text style={styles.infoText}>Total Value: {item.totalValue}</Text>
        <Text style={styles.infoText}>Available Balance: {(item.maxBudget - item.totalValue).toFixed(2)}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteBudget(item.id)}>
        <Image source={require('../../assets/Delete_icon.png')} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
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
    padding: 40,
  },
  iconImage: {
    width: 34,
    height: 34,
  },
});