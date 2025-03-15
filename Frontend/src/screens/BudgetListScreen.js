import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
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

  // Delete the budget from Firestore
  const deleteItem = (id, name) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the budget: ${name}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await firestore()
                .collection('budgets')
                .doc(id)
                .delete();
              alert(`Budget "${name}" has been deleted successfully.`);
            } catch (error) {
              console.error("Error deleting budget: ", error);
              alert("Error deleting budget. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Budget List" MoveTo="Dashboard" navigation={navigation} />
      <TopBarButtons2
        onBudgetPress={() => navigation.navigate('Budget')}
        onSavedPress={() => navigation.navigate('BudgetListScreen')}
      />
      <FlatList
        data={budgets}
        style={{ padding: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Budget', { budget: item })}>
            <View style={styles.budgetItem}>
              <Text>{item.name}</Text>
              <Text>Rs. {item.totalValue}</Text>
              <TouchableOpacity onPress={() => deleteItem(item.id, item.name)}>
                <Image source={require('../../assets/Delete_icon.png')} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
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
    width: '100%',
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
