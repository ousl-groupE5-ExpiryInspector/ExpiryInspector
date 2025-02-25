import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import Title3 from '../components/Title3';
import Title2 from '../components/Title2';
import CoverNums from '../components/CoverNums';
import NavBar from '../components/navigationBar';
import TopBarButtons from '../components/TopBarButtons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function ItemList({ route, navigation }) {
  const { category } = route.params;
  const userId = auth().currentUser?.uid;
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', qty: 0, expireDate: '', price: 0 });
  const [totalValue, setTotalValue] = useState(0);
  const [expiringSoonCount, setExpiringSoonCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = firestore()
      .collection('items')
      .where('userId', '==', userId)
      .where('category', '==', category)
      .onSnapshot(snapshot => {
        const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(fetchedItems);
        calculateValues(fetchedItems);
      });

    return () => unsubscribe();
  }, [category, userId]);

  const calculateValues = (itemList) => {
    let total = 0;
    let expiringSoon = 0;
    itemList.forEach(item => {
      //const qty = item.qty ?? 0; 
      const qty = Number(item.qty) || 0;  // Convert to number, default = 0
      const price = Number(item.price) || 0;
      total += qty * price;
      if (new Date(item.expireDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)) {
        expiringSoon++;
      }
    });
    setTotalValue(total);
    setExpiringSoonCount(expiringSoon);
  };

  const deleteItem = (id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => firestore().collection('items').doc(id).delete() }
      ]
    );
  };

  const addItem = async () => {
    if (newItem.name && userId) {
      const newItemData = {
        userId,
        category,
        name: newItem.name,
        qty: parseInt(newItem.qty),
        expireDate: newItem.expireDate,
        price: parseFloat(newItem.price)
      };
      await firestore().collection('items').add(newItemData);
      setNewItem({ name: '', qty: 0, expireDate: '', price: 0 });
      setShowModal(false);
    } else {
      Alert.alert('Error', 'Please fill all required fields');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', { item })}>
      <View style={styles.item}>
        <Text style={styles.col1}>{item.name}</Text>
        <Text style={styles.col2}>{item.qty ? Number(item.qty) : 0}</Text>
        <Text style={styles.col3}>{item.expireDate}</Text>
        <TouchableOpacity style={styles.col4} onPress={() => deleteItem(item.id)}>
          <Image source={require('../../assets/Delete_icon.png')} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
        <View style={styles.col5}>
          <Image style={{ width: 25, height: 25 }} source={require('../../assets/Next_icon.png')} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <BackgroundFlex>
      <HeaderWithIcon title={category} MoveTo='InventoryAvailable' navigation={navigation} />
      <TopBarButtons onExpiredPress={() => navigation.navigate('InventoryExpired')} onAvailablePress={() => navigation.navigate('ItemList')} onOutOfStockPress={() => navigation.navigate('InventoryOutOfStock')} />
      <View style={styles.ribbonContainer}>
        <View style={{ padding: 10 }}>
          <Title2>AMOUNT</Title2>
          <CoverNums>{totalValue}</CoverNums>
        </View>
        <View>
          <Title2>Items</Title2>
          <CoverNums>{items.length}</CoverNums>
        </View>
        <View style={{ padding: 10 }}>
          <Title3>TO BE EXPIRED</Title3>
          <CoverNums>{expiringSoonCount}</CoverNums>
        </View>
      </View>
      <View style={styles.itemTopic}>
        <Text style={styles.col1}>Name</Text>
        <Text style={styles.col2}>Qty</Text>
        <Text style={styles.col3}>Expire date</Text>
        <Text style={styles.col4}></Text>
        <Text style={styles.col5}></Text>
      </View>
      <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={styles.listContainer} />
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Image source={require('../../assets/Add_icon.png')} style={styles.iconadd} />
      </TouchableOpacity>
      <NavBar navigation={navigation} />
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Item</Text>
          <TextInput style={styles.input} placeholder="Item Name" value={newItem.name} onChangeText={text => setNewItem({ ...newItem, name: text })} />
          <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" value={newItem.qty} onChangeText={text => setNewItem({ ...newItem, qty: text })} />
          <TextInput style={styles.input} placeholder="Expire Date (YYYY-MM-DD)" value={newItem.expireDate} onChangeText={text => setNewItem({ ...newItem, expireDate: text })} />
          <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={newItem.price} onChangeText={text => setNewItem({ ...newItem, price: text })} />
          <TouchableOpacity style={styles.modalButton} onPress={addItem}><Text style={styles.buttonText}>Add Item</Text></TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}><Text style={styles.buttonText}>Cancel</Text></TouchableOpacity>
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

  itemTopic:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginBottom: 15,

  },
  col1: { flex: 4, justifyContent: 'center',alignItems: 'flex-end', fontWeight: 'bold'},
  col2: { flex: 2, justifyContent: 'center', alignItems: 'flex-start', },
  col3: { flex: 4, justifyContent: 'center' },
  col4: { flex: 1, justifyContent: 'center' },
  col5: { flex: 1, justifyContent: 'flex-end' },

  listContainer: {
    paddingHorizontal: 10,
  },
  
  ribbonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode: 'cover',
    height: 130,
    width: '100%',
    backgroundColor: '#D9D9D9', 
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  iconadd: {
    width: 70, 
    height: 70, 
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
  }
  
});
