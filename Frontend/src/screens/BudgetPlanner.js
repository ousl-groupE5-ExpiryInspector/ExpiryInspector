import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import Title3 from '../components/Title3';
import Title2 from '../components/Title2';
import CoverNums from '../components/CoverNums';
import NavBar from '../components/navigationBar';
import TopBarButtons2 from '../components/TopBarButtons2';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BudgetScreen({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);  // New state for budget name modal
  const [newItem, setNewItem] = useState({ name: '', qty: '', price: '' });
  const [maxBudget, setMaxBudget] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [budgetName, setBudgetName] = useState('');
  const [budgetId, setBudgetId] = useState(null);

  useEffect(() => {
    if (route.params?.budget) {
      const { id, name, items, maxBudget, totalValue } = route.params.budget;
      setBudgetId(id);
      setBudgetName(name);
      setItems(items);
      setMaxBudget(maxBudget);
      setTotalValue(totalValue);
    }
  }, [route.params?.budget]);

  const availableBalance = maxBudget - totalValue;

  const saveBudget = () => {
    console.log('Button Pressed');  // Check if button press is triggered
    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setShowBudgetModal(true);  // Show the modal for entering budget name
  };

  const handleSave = async (userId, name) => {
    if (items.length === 0 || totalValue === 0) {
      Alert.alert('Alert', 'Please add items before saving.');
      return;
    }

    try {
      if (budgetId) {
        // If there's a budgetId, update the existing budget
        await firestore().collection('budgets').doc(budgetId).update({
          name,
          items,
          maxBudget,
          totalValue,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        // If there's no budgetId, create a new budget
        const budgetRef = firestore().collection('budgets').doc();
        const newBudget = {
          id: budgetRef.id,
          userId,
          name,
          items,
          maxBudget,
          totalValue,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        await budgetRef.set(newBudget);
      }

      navigation.navigate('BudgetListScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to save budget');
      console.error(error);
    }
  };

  const addItem = () => {
    if (!newItem.name || !newItem.qty || !newItem.price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newItemWithTotal = {
      ...newItem,
      id: items.length + 1,
      total: parseFloat(newItem.price) * parseFloat(newItem.qty),
    };
    setItems([...items, newItemWithTotal]);
    setTotalValue(totalValue + newItemWithTotal.total);
    setNewItem({ name: '', qty: '', price: '' });
    setShowModal(false);
  };

  const deleteItem = (id) => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          const filteredItems = items.filter(item => item.id !== id);
          setTotalValue(totalValue - items.find(item => item.id === id).total);
          setItems(filteredItems);
        },
      },
    ]);
  };

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Budget Planner" MoveTo="Dashboard" navigation={navigation} />
      <TouchableOpacity style={styles.saveIcon} onPress={saveBudget}>
        <Image source={require('../../assets/save.png')} style={styles.iconImage} />
      </TouchableOpacity>


      <TopBarButtons2
        onBudgetPress={() => navigation.navigate('Budget')}
        onSavedPress={() => navigation.navigate('BudgetListScreen')}
      />

      <View style={styles.ribbonContainer}>
        <View style={{ padding: 15 }}>
          <Title2>Amount</Title2>
          <CoverNums>{totalValue}</CoverNums>
          <Title3>No of Items</Title3>
          <Text>{items.length}</Text>
        </View>
        <View style={styles.budgetColumn}>
          <Title3>Current Budget</Title3>
          <TextInput
            style={styles.budgetInput}
            placeholder="Current Budget"
            keyboardType="numeric"
            value={maxBudget.toString()}
            onChangeText={text => setMaxBudget(parseFloat(text) || 0)}
          />
          <Title3>Available Balance</Title3>
          <Title3>{availableBalance.toFixed(2)}</Title3>
        </View>
      </View>
      <FlatList
        data={items}
        style={{ padding: 10 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.col1}>{item.name}</Text>
            <Text style={styles.col2}>{item.qty}</Text>
            <Text style={styles.col3}>{item.total.toFixed(2)}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Image source={require('../../assets/Delete_icon.png')} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Image source={require('../../assets/Add_icon.png')} style={styles.iconadd} />
      </TouchableOpacity>
      <NavBar navigation={navigation} />

      {/* **MODAL FOR ADDING ITEMS** */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Item Name"
              value={newItem.name}
              onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Quantity"
              keyboardType="numeric"
              value={newItem.qty}
              onChangeText={(text) => setNewItem({ ...newItem, qty: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Price"
              keyboardType="numeric"
              value={newItem.price}
              onChangeText={(text) => setNewItem({ ...newItem, price: text })}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addItem}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* **MODAL FOR ENTERING BUDGET NAME** */}
      <Modal visible={showBudgetModal} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter Budget Name"
              value={budgetName}
              onChangeText={setBudgetName}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setShowBudgetModal(false);
                  const user = auth().currentUser;
                  if (user && budgetName) {
                    handleSave(user.uid, budgetName); // Save the budget with the name
                  }
                }}
              >
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowBudgetModal(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  itemTopic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 15,
  },
  col1: {
    flex: 4,
    fontWeight: 'bold'
  },
  col2: {
    flex: 2
  },
  col3: {
    flex: 3
  },
  col4: {
    flex: 1
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  ribbonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 180,
    width: '100%',
    backgroundColor: '#D9D9D9',
    marginBottom: 20,
  },
  budgetColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 0,
  },
  budgetInput: {
    height: 40,
    width: 120,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  iconadd: {
    width: 54,
    height: 54,
    marginBottom: 50,
  },
  modalView: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  modalContent: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  addButtonText: {
    color: 'blue',
  },
  cancelButtonText: {
    color: 'red',
  },
  saveIcon: {
    position: 'absolute',
    top: 15,
    right: 10,
    zIndex: 100,
  },
  iconImage: {
    width: 40,
    height: 40,
  }
});
