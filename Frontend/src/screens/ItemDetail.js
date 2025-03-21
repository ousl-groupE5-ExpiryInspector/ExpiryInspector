import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image, ScrollView } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import HeaderWithIcon from '../components/HeaderWithIcon';
import NavBar from '../components/navigationBar';
import { launchImageLibrary } from 'react-native-image-picker';
import Title3 from '../components/Title3';
import firestore from '@react-native-firebase/firestore';
import DescriptionText from '../components/DescriptionText';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ItemDetail({ route, navigation }) {
  const handleCamera = () => {
    //navigation.navigate('Camara');
    navigation.navigate('Camara', { itemId: item.id });
  };

  const item = route.params?.item || {
    id: '',
    name: '',
    qty: 0,
    expireDate: '',
    manufactureDate: '',
    description: '',
    image: null,
    price: 0,
    category: '',
  };

  useEffect(() => {
    if (route.params?.item) {
      setUpdatedItem(prevItem => ({
        ...prevItem,
        ...route.params.item, 
      }));

      if (route.params.item.id) {
        const docRef = firestore().collection('items').doc(route.params.item.id);
        
        docRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            docRef.update({
              ...route.params.item, 
            })
            .then(() => console.log("Item auto-saved after camera update"))
            .catch(error => console.error("Error auto-saving item: ", error));
          } else {
            console.error("Error: Document not found in Firestore");
          }
        }).catch(error => console.error("Error checking document: ", error));
      }
    }
  }, [route.params?.item]); 
  
  const [updatedItem, setUpdatedItem] = useState({ ...item });
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({ ...updatedItem });
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    setTotalValue(updatedItem.qty * updatedItem.price);
  }, [updatedItem.qty, updatedItem.price]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1, includeBase64: true }, response => {
          if (response.assets && response.assets.length > 0) {
            const base64Image = `data:image/jpeg;base64,${response.assets[0].base64}`;
            console.log(' Base64 Image Selected');
            setUpdatedItem(prevItem => ({
              ...prevItem,
              image: base64Image,
            }));
            
            saveImageToFirestore(base64Image);
          }
        });
  };

  const saveImageToFirestore = async (base64Image) => {
    if (!item.id) {
      Alert.alert('Error', 'item ID not found.');
      return;
    }

    try {
      const userDocRef = firestore().collection('items').doc(item.id);
      await userDocRef.update({ image: base64Image });
      Alert.alert('Success', 'item picture updated!');
      console.log(' Base64 Image saved to Firestore');
    } catch (error) {
      console.error(' Error saving image to Firestore:', error);
      Alert.alert('Error', 'Failed to save image.');
    }
  }; 

  const handleDeleteItem = () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: deleteItem }
    ], { cancelable: false });
  };

  const deleteItem = () => {
    firestore()
      .collection('items')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('Item Deleted:', item);
        navigation.navigate('ItemList', { category: item.category });
      })
      .catch(error => console.error("Error deleting item: ", error));
  };

  const handleEdit = () => {
    setModalItem({ ...updatedItem });
    setShowModal(true);
  };

  const updateItem = () => {
    firestore()
      .collection('items')
      .doc(item.id)
      .update(modalItem)
      .then(() => {
        setUpdatedItem({ ...modalItem });
        setShowModal(false);
        console.log('Item Updated:', modalItem);
      })
      .catch(error => console.error("Error updating item: ", error));
  };

  return (
    <BackgroundFlex>
      <View style={{ width: '100%', flex: 1 }}>
        <HeaderWithIcon title={updatedItem.name} MoveTo='ItemList' navigation={navigation} db={{ category: updatedItem.category }} />

        <TouchableOpacity style={styles.deleteIcon} onPress={handleDeleteItem}>
          <Image source={require('../../assets/Delete_icon.png')} style={styles.iconImage} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={pickImage}>
            <Image 
                source={updatedItem.image && updatedItem.image.trim() !== "" ? 
                          { uri: updatedItem.image } : 
                          require('../../assets/PlaceHolder_Item.jpg')} 
                          style={styles.placeholderImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteIcon} onPress={handleCamera}>
            <Image source={require('../../assets/camera_icon2.png')} style={styles.iconImage} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'semibold', fontSize: 30 }}>{updatedItem.name}</Text>
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
                <Title3>Manufacture Date</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.manufactureDate}</Text>
                </View>
              </View>
              <View>
                <Title3>Expire Date</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.expireDate}</Text>
                </View>
              </View>
            </View>
            <View style={styles.dateflex}>
              <View>
                <Title3>Quantity</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.qty}</Text>
                </View>
              </View>
              <View>
                <Title3>Price</Title3>
                <View style={styles.dateBox}>
                  <Text>{updatedItem.price}</Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Title3>Total</Title3>
              <View style={styles.dateBox}>
                <Text>{totalValue.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Image source={require('../../assets/Edit_Icon.png')} style={styles.IconEdit} />
        </TouchableOpacity>
        

        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Item</Text>
            <DescriptionText>Name</DescriptionText>
            <TextInput style={styles.input} placeholder="Item Name" value={modalItem.name} onChangeText={text => setModalItem({ ...modalItem, name: text })} />
            <DescriptionText>Description</DescriptionText>
            <TextInput style={styles.input} placeholder="Description" value={modalItem.description} onChangeText={text => setModalItem({ ...modalItem, description: text })} />
            <DescriptionText>Manufacture Date</DescriptionText>
            <TextInput style={styles.input} placeholder=" (YYYY-MM-DD)" value={modalItem.manufactureDate} onChangeText={text => setModalItem({ ...modalItem, manufactureDate: text })} />
            <DescriptionText>Expire Date</DescriptionText>  
            <TextInput style={styles.input} placeholder="Expire Date (YYYY-MM-DD)" value={modalItem.expireDate} onChangeText={text => setModalItem({ ...modalItem, expireDate: text })} />
            <DescriptionText>Quantity</DescriptionText>
            <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" value={modalItem.qty} onChangeText={text => setModalItem({ ...modalItem, qty: Number(text) })} />
            <DescriptionText>Price</DescriptionText>
            <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={modalItem.price} onChangeText={text => setModalItem({ ...modalItem, price: Number(text) })} />
            <TouchableOpacity style={styles.modalButton} onPress={updateItem}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(false)}>
              <Text style={styles.buttonText}>cancel</Text>
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
    width: 180,
    height: 180,
    borderRadius: 100,
    margin: 10,
  },
  descriptionBox: {
    backgroundColor: '#FFD1C4',
    borderRadius: 5,
    height: 80,
    width: '75%',
    marginTop: 5,
  },
  dateflex:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 80,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    width: '100%',
    alignSelf: 'center',
  },
  modalButton: {
    backgroundColor: '#FFD1C4',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
