import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import Title3 from '../components/Title3';
import Title2 from '../components/Title2';
import CoverNums from '../components/CoverNums'; 
import NavBar from '../components/navigationBar';

export default function BudgetScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal
  const [newItem, setNewItem] = useState({ name: '', qty: '', price: '' }); // State for new item
  const [maxBudget, setMaxBudget] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // Calculate available balance
  const availableBalance = maxBudget - totalValue;

  // Add a new item to the list
  const addItem = () => {
    if (newItem.name && newItem.qty && newItem.price) {
      const newItemWithTotal = { ...newItem, id: items.length + 1, total: parseFloat(newItem.price) * parseFloat(newItem.qty) };
      setItems([...items, newItemWithTotal]);

      // Update total value with the new item's total price
      const newTotalValue = totalValue + newItemWithTotal.total;
      setTotalValue(newTotalValue);

      setNewItem({ name: '', qty: '', price: '' }); // Reset the form
      setShowModal(false); // Close the modal
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  // Delete selected item
  const deleteItem = (id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => {
          const filteredItems = items.filter(item => item.id !== id);
          const deletedItem = items.find(item => item.id === id);
          setItems(filteredItems);
          setTotalValue(totalValue - deletedItem.total); // Update total value
        }}
      ]
    );
  };

  // Render each item with 'name', 'QTY', 'Total'
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.item}>
        <Text style={styles.col1}>{item.name}</Text>
        <Text style={styles.col2}>{item.qty}</Text>
        <Text style={styles.col3}>{item.total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.col4} name="delete" color="red" onPress={() => deleteItem(item.id)}>
          <Image  source={require('../../assets/Delete_icon.png')} 
          style={{width:25, height:25}}
           />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title="Budget Planner"
        MoveTo='Dashboard'
        navigation={navigation} />

      {/* Ribbon Section */}
      <View style={styles.ribbonContainer}>
        <View style={{padding:15}}>
          <Title2>Amount</Title2>
          <CoverNums >{totalValue}</CoverNums>
          <View style={{marginTop:15}}>
            <Title3>No of Items</Title3>
            <Text>{items.length}</Text>
          </View>
          
        </View>
        <View>
          
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
          <View style={{ padding: 10 }}>
            <Title3>Available Balance</Title3>
            <Title3>{availableBalance.toFixed(2)}</Title3>
          </View>
        </View>
      </View>

      {/* List Header */}
      <View style={styles.itemTopic}>
        <Text style={styles.col1}>Name</Text>
        <Text style={styles.col2}>Qty</Text>
        <Text style={styles.col3}>Total</Text>
        <Text style={styles.col4}></Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Image source={require('../../assets/Add_icon.png')} style={styles.iconadd} />
      </TouchableOpacity>

      <NavBar navigation={navigation} />

      {/* Modal for adding new item */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={newItem.name}
            onChangeText={text => setNewItem({ ...newItem, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={newItem.qty}
            onChangeText={text => setNewItem({ ...newItem, qty: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            keyboardType="numeric"
            value={newItem.price}
            onChangeText={text => setNewItem({ ...newItem, price: text })}
          />
          <TouchableOpacity style={styles.modalButton} onPress={addItem}>
            <Text style={styles.buttonText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
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
  col1: { flex: 4, fontWeight: 'bold' },
  col2: { flex: 2 },
  col3: { flex: 3 },
  col4: { flex: 1 },

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
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalButton: {
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
