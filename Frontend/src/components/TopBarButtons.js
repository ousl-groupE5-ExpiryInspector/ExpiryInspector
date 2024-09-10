import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function TopBarButtons({ onExpiredPress, onAvailablePress, onOutOfStockPress }) {
  const [activePage, setActivePage] = useState('AVAILABLE');

  const handlePress = (page, onPress) => {
    setActivePage(page);
    if (onPress) onPress();
  };

  return (
    <View style={styles.topBar}>
      <TopBarButton 
        label="EXPIRED" 
        isActive={activePage === 'EXPIRED'} 
        onPress={() => handlePress('EXPIRED', onExpiredPress)} 
      />
      <TopBarButton 
        label="AVAILABLE" 
        isActive={activePage === 'AVAILABLE'} 
        onPress={() => handlePress('AVAILABLE', onAvailablePress)} 
      />
      <TopBarButton 
        label="OUT OF STOCK" 
        isActive={activePage === 'OUT_OF_STOCK'} 
        onPress={() => handlePress('OUT_OF_STOCK', onOutOfStockPress)} 
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
    marginBottom: 20,
  },
  iconContainer: {
    flex: 1, // Ensure equal width for each button
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
    color: '#fff',
  },
});
