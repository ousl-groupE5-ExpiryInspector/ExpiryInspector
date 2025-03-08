import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BudgetListScreen({ route, navigation }) {
  const [budgets, setBudgets] = useState(route.params.budgets || []);  // Initialize budgets state with the passed route params
  const [userId, setUserId] = useState(null);

  // Check if the user is logged in and fetch user budgets
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

  // Update budgets state when the route params change
  useEffect(() => {
    if (route.params?.budgets) {
      setBudgets(route.params.budgets);
    }
  }, [route.params?.budgets]);

  // Fetch user budgets from Firestore
  const fetchUserBudgets = (uid) => {
    const unsubscribe = firestore()
      .collection('budgets')
      .where('userId', '==', uid)
      .onSnapshot((querySnapshot) => {
        const budgetsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
              await firestore().collection('budgets').doc(id).delete(); // Delete budget from Firestore
              setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id));
            } catch (error) {
              console.error('Error deleting budget:', error);
              Alert.alert('Error', `An error occurred while deleting the budget: ${error.message}`);
            }
          }
        }
      ]
    );
  };

  /* Handle budget click: re-add to budget planner and navigate
  const handleBudgetClick = async (budgetId) => {
  try {
    // Get the reference of the budget document by ID
    const budgetRef = firestore().collection('budgets').doc(budgetId);
    const budgetSnapshot = await budgetRef.get();

    if (!budgetSnapshot.exists) {
      Alert.alert('Error', 'Budget not found!');
      return;
    }

    // Retrieve budget data
    const budgetData = budgetSnapshot.data();

    // Navigate to BudgetPlannerScreen with the budget details
    navigation.navigate('BudgetPlannerScreen', { budget: { id: budgetId, ...budgetData } });
  } catch (error) {
    console.error('Error fetching budget details:', error);
    Alert.alert('Error', `An error occurred: ${error.message}`);
  }
};*/


  // Render each budget with its details
  const renderBudget = ({ item }) => (
    <View style={styles.budgetItem}>
      <TouchableOpacity onPress={() => handleBudgetClick(item)}>
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
        keyExtractor={(item) => item.id.toString()}  // Use the budget ID as the key
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
    padding: 5,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});
