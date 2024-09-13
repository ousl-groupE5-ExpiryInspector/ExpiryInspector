import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

export default function TopBarButtons({ onExpiredPress, onAvailablePress, onOutOfStockPress }) {
  const [activePage, setActivePage] = useState('AVAILABLE');

  // Get the current route name from navigation state
  const currentRouteName = useNavigationState(state => state.routes[state.index].name);

  useEffect(() => {
    if (currentRouteName === 'InventoryExpired') {
      setActivePage('EXPIRED');
    } else if (currentRouteName === 'InventoryAvailable') {
      setActivePage('AVAILABLE');
    } else if (currentRouteName === 'InventoryOutOfStock') {
      setActivePage('OUT_OF_STOCK');
    }
  }, [currentRouteName]);

  return (
    <View style={styles.topBar}>
      <TopBarButton 
        label="EXPIRED" 
        isActive={activePage === 'EXPIRED'} 
        onPress={onExpiredPress} 
      />
      <TopBarButton 
        label="AVAILABLE" 
        isActive={activePage === 'AVAILABLE'} 
        onPress={onAvailablePress} 
      />
      <TopBarButton 
        label="OUT OF STOCK" 
        isActive={activePage === 'OUT_OF_STOCK'} 
        onPress={onOutOfStockPress} 
      />
    </View>
  );
}

const TopBarButton = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.iconContainer, isActive && styles.activeButton]}
    onPress={onPress}
  >
    <Text style={isActive ? styles.activeText : styles.text}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#D9D9D9',
    height: 50,
    marginBottom: 20,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  activeButton: {
    backgroundColor: '#C5C3C3',
  },
  activeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});