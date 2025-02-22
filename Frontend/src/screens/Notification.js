import React, { useState, useEffect } from 'react';
import {View,Text,FlatList,Button,StyleSheet,TouchableOpacity,Alert,} from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import PushNotification from 'react-native-push-notification';
import NavBar from '../components/navigationBar';
import HeaderWithIcon from '../components/HeaderWithIcon';

export default function NotificationScreen({ navigation }) {
  // Sample data for items in the inventory
  const [items, setItems] = useState([
    { id: 1, category: 'Dairy', name: 'Milk', qty: 10, expireDate: '2024-12-22', price: 300 },
    { id: 2, category: 'Glossary', name: 'Bread', qty: 0, expireDate: '2024-12-02', price: 200 },
    { id: 3, category: 'Spices', name: 'Salt', qty: 1, expireDate: '2024-12-26', price: 1000 },
    { id: 2, category: 'Grains', name: 'Rice', qty: 0, expireDate: '2024-12-30', price: 225 },
    { id: 3, category: 'Sanitary', name: 'Soap', qty: 3, expireDate: '2024-12-24', price: 10 },
  ]);

  // Notifications generated from inventory data
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Configure Push Notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification Received:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Create a notification channel (Android only)
    PushNotification.createChannel(
      {
        channelId: 'item-alerts',
        channelName: 'Item Alerts',
        channelDescription: 'Notifications for item expiration and stock updates',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );

    // Check for notifications on component mount
    refreshNotifications();
  }, [items]);

  const refreshNotifications = () => {
    const newNotifications = [];
    const currentDate = new Date();

    items.forEach((item) => {
      // Check for out-of-stock items
      if (item.qty === 0) {
        newNotifications.push({
          id: `${item.id}-stock`,
          title: 'Stock Alert',
          message: `${item.name} is out of stock.`,
        });

        // Trigger a push notification
        PushNotification.localNotification({
          channelId: 'item-alerts',
          title: 'Stock Alert',
          message: `${item.name} is out of stock.`,
        });
      }

      // Check for items close to expiration (within 7 days)
      const expireDate = new Date(item.expireDate);
      const timeDifference = expireDate - currentDate;
      const daysToExpire = timeDifference / (1000 * 60 * 60 * 24);

      if (daysToExpire > 0 && daysToExpire <= 7) {
        newNotifications.push({
          id: `${item.id}-expire`,
          title: 'Expiration Alert',
          message: `${item.name} expires in ${Math.ceil(daysToExpire)} days!`,
        });

        // Trigger a push notification
        PushNotification.localNotification({
          channelId: 'item-alerts',
          title: 'Expiration Alert',
          message: `${item.name} expires in ${Math.ceil(daysToExpire)} days!`,
        });
      }
    });

    setNotifications(newNotifications);
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    Alert.alert('Notification deleted');
  };

  // Render each notification item
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
      <View>
        <HeaderWithIcon title="Notifications" MoveTo='Dashboard' navigation={navigation} />
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
        />
        <TouchableOpacity onPress={refreshNotifications}>
          <Text>
          Refresh
          </Text>
          </TouchableOpacity>
        <NavBar navigation={navigation} />
      </View>
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationItem: {
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
});
