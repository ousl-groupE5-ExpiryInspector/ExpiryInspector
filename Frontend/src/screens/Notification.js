import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BackgroundFlex from '../components/BackgroundFlex';
import PushNotification from 'react-native-push-notification';

export default function NotificationScreen() {
  // Sample data for items in the inventory
  const [items, setItems] = useState([
    { id: 1, category: 'Dairy', name: 'Milk', qty: 10, expireDate: '2024-12-20', price: 30 },
    { id: 2, category: 'Bakery', name: 'Bread', qty: 0, expireDate: '2024-12-02', price: 20 },
    { id: 3, category: 'Spices', name: 'Salt', qty: 15, expireDate: '2025-01-15', price: 10 },
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
    checkForNotifications();
  }, [items]);

  const checkForNotifications = () => {
    const newNotifications = [];
    const currentDate = new Date();



  return (
    <BackgroundFlex>
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
        />
        <Button title="Check Notifications" onPress={checkForNotifications} />
      </View>
    </BackgroundFlex>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
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
