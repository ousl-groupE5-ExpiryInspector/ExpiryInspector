import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import PushNotification from 'react-native-push-notification';
import NavBar from '../components/navigationBar';
import HeaderWithIcon from '../components/HeaderWithIcon';
import { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    console.log(" Checking authentication...", userId);

    if (!userId) {
      console.error(" User not authenticated, cannot fetch items.");
      return;
    }

    console.log(" User authenticated:", userId);
    console.log(" Fetching items from Firestore...");

    const unsubscribe = firebase.firestore()
      .collection('items') // firebase.firestore()
      .where('userId', '==', userId)
      .onSnapshot(
        snapshot => {
          if (!snapshot.empty) {
            console.log(" *Firestore connection successful.*");
          } else {
            console.warn(" No items found for this user.");
          }

          const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          console.log(" ### Firestore Data Fetched ###:", fetchedItems);

          setItems(fetchedItems);
          refreshNotifications(fetchedItems);
        },
        error => {
          console.error("********* Error fetching Firestore data: ", error);
        }
      );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log(" Setting up push notifications...");

    PushNotification.configure({
      onNotification: (notification) => {
        console.log(" Notification Received:", notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    checkAndCreateNotificationChannel();
  }, []);

  const checkAndCreateNotificationChannel = () => {
    PushNotification.getChannels((channelIds) => {
      console.log(" Existing Notification Channels:", channelIds);

      if (!channelIds.includes('item-alerts')) {
        console.log(" Creating Notification Channel...");
        PushNotification.createChannel(
          {
            channelId: 'item-alerts',
            channelName: 'Item Alerts',
            channelDescription: 'Notifications for item expiration and stock updates',
            importance: PushNotification.Importance.HIGH,
            vibrate: true,
          },
          (created) => console.log(created ? "Notification Channel created." : " Notification Channel creation failed.")
        );
      } else {
        console.log("Notification Channel already exists.");
      }
    });
  };

  const refreshNotifications = (itemsToCheck = items) => {
    if (!itemsToCheck.length) {
      console.log("No items to check for notifications.");
      return;
    }

    console.log("Checking items for notifications...");
    const newNotifications = [];
    const currentDate = new Date();

    itemsToCheck.forEach((item) => {
      if (item.qty === 0) {
        addNotification(newNotifications, `${item.id}-stock`, 'Stock Alert', `${item.name} is out of stock.`);
      }

      const expireDate = item.expireDate ? new Date(item.expireDate) : null;
      if (expireDate && expireDate > currentDate && (expireDate - currentDate) / (1000 * 60 * 60 * 24) <= 30) {
        addNotification(newNotifications, `${item.id}-expire`, 'Expiration Alert', `${item.name} expires in ${Math.ceil((expireDate - currentDate) / (1000 * 60 * 60 * 24))} days!`);
      }
    });

    setNotifications(newNotifications);
  };

  const addNotification = (list, id, title, message) => {
    console.log(`⚠️ ${title}: ${message}`);
    list.push({ id, title, message });

    PushNotification.localNotification({
      channelId: 'item-alerts',
      title,
      message,
    });
  };

  const deleteNotification = (id) => {
    console.log(`Deleting notification: ${id}`);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    Alert.alert('Notification deleted');
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onLongPress={() => deleteNotification(item.id)}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <BackgroundFlex>
      <View style={{ width: '100%', flex: 1 }}>
        <HeaderWithIcon title="Notifications" MoveTo="Dashboard" navigation={navigation} />
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
        />
        <TouchableOpacity style={styles.refreshIcon} onPress={() => refreshNotifications()}>
          <Image source={require('../../assets/Refresh.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <NavBar navigation={navigation} />
      </View>
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  notificationItem: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
  refreshIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  iconImage: {
    width: 40,
    height: 40,
  },
});
