import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

export default function TopBarButtons2({ onBudgetPress, onSavedPress }) {
  const [activePage, setActivePage] = useState('BUDGET');

  // Get the current route name from navigation state
  const currentRouteName = useNavigationState(state => state.routes[state.index].name);

  useEffect(() => {
    console.log("Current Route Name:", currentRouteName); 
  
    if (currentRouteName === 'Budget') {
      setActivePage('BUDGET');
    } else if (currentRouteName === 'BudgetListScreen') {
      setActivePage('SAVED');
    }
  }, [currentRouteName]);
  

  return (
    <View style={styles.topBar}>
      <TopBarButton 
        label="BUDGET" 
        isActive={activePage === 'BUDGET'} 
        onPress={onBudgetPress} 
      />
      <TopBarButton 
        label="SAVED" 
        isActive={activePage === 'SAVED'} 
        onPress={onSavedPress} 
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
