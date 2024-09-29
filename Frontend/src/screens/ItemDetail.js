import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image, ScrollView } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';
import { launchImageLibrary } from 'react-native-image-picker';
import Title3 from '../components/Title3';

export default function ItemDetail({ route, navigation }) {
  const item = route.params?.item || {
    name: '',
    qty: 0,
    expireDate: '',
    manufactureDate: '',
    description: '',
    image: null,
  };

  const [updatedItem, setUpdatedItem] = useState({
    name: item.name,
    category: item.category,
    qty: item.qty.toString(),
    expireDate: item.expireDate,
    manufactureDate: item.manufactureDate || '',
    description: item.description || '',
    image: item.image || null,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({ ...updatedItem });

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (!response.didCancel && !response.error) {
        const imageUri = response.assets[0].uri;
        setUpdatedItem({ ...updatedItem, image: imageUri });
      }
    });
  };

  const handleDeleteItem = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: deleteItem }
      ],
      { cancelable: false }
    );
  };

  const deleteItem = () => {
    // delete logic here
    navigation.navigate('ItemList', {category: item.category});
    console.log('Item Deleted:', item);
    
  };

  const handleEdit = () => {
    setModalItem({ ...updatedItem });
    setShowModal(true);
  };

  const updateItem = () => {
    // Update item details logic here
    setUpdatedItem({ ...modalItem });
    setShowModal(false);
    console.log('Item Updated:', modalItem);
  };

  return (
    <BackgroundFlex>

      <View style={{width:'100%', flex:1}}>
        <HeaderWithIcon title={updatedItem.name} MoveTo='ItemList' navigation={navigation} db={{ category:updatedItem.category }} />

        {/* Delete Icon on Top Right */}
        <TouchableOpacity style={styles.deleteIcon} onPress={handleDeleteItem}>
          <Image source={require('../../assets/Delete_icon.png')} style={styles.iconImage} />
        </TouchableOpacity>

        <View style={{alignItems:'center'}}>

          {/* Display Image */}
          <TouchableOpacity onPress={pickImage} >
            {updatedItem.image ? (
              <Image source={{ uri: updatedItem.image }} style={styles.placeholderImage} />
            ) : (
              <Image source={require('../../assets/PlaceHolder_Item.jpg')} style={styles.placeholderImage} />
            )}
          </TouchableOpacity>

          {/* Item Details */}
          <View style={{alignItems:'center'}}>
            <Text style={{color:'white', fontWeight:'semibold', fontSize: 30}}>{updatedItem.name}</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Title3>Description:</Title3>
            <ScrollView>
              <Text>{updatedItem.description}</Text>
            </ScrollView>
          </View>

          <View>
            <View style={styles.dateflex}>
              <View>
                <Title3>Manufacture Date </Title3>
                
                <View style={styles.dateBox}>
                  <Text>{updatedItem.manufactureDate}</Text>
                </View>
              </View>
              <View>
                <Title3>  Expire Date</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.expireDate}</Text>
                </View>
                
              </View>
            </View>
            <View style={{ alignItems:'center'}}>
                <Title3>Quantity</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.qty}</Text>
                </View>
                
              </View>
            
          </View>
        </View>
        

        {/* Edit Button */}
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Image source={require('../../assets/Edit_Icon.png')} style={styles.IconEdit} />
        </TouchableOpacity>

        {/* Modal for Updating Item */}
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Item</Text>

            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={modalItem.name}
              onChangeText={text => setModalItem({ ...modalItem, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={modalItem.description}
              onChangeText={text => setModalItem({ ...modalItem, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Manufacture Date (YYYY-MM-DD)"
              value={modalItem.manufactureDate}
              onChangeText={text => setModalItem({ ...modalItem, manufactureDate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Expire Date (YYYY-MM-DD)"
              value={modalItem.expireDate}
              onChangeText={text => setModalItem({ ...modalItem, expireDate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={modalItem.qty}
              onChangeText={text => setModalItem({ ...modalItem, qty: text })}
            />
            <TouchableOpacity style={styles.modalButton} onPress={updateItem}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <NavBar navigation={navigation} />
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  placeholderImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 10,
  },
  descriptionBox: {
    backgroundColor: '#FFD1C4',
    borderRadius: 5,
    height: 150,
    width: '75%',
    marginTop: 5,
  },
  dateflex:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 120,
    width:'90%',
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD1C4',
    height: 40,
    width: 150,
    margin: 5,
  },
  deleteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconImage: {
    width: 35,
    height: 35,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
  IconEdit: {
    width: 30, 
    height: 30, 
    marginBottom: 5,
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