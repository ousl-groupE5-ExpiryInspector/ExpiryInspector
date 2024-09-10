import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import SignInScreen from './src/screens/SignInScreen';
import LoginScreen from './src/screens/LoginScreen';
import FogotPasswordSC from './src/screens/FogotPassword';
import UserAccount from './src/screens/UserAccount';
import LandingPage from './src/screens/LandingPage';
import InventoryScreen from './src/screens/Inventory';
import InventoryExpired from './src/screens/Inventory_Expired';
import InventoryOutOFStock from './src/screens/Inventory_OutOfStock';
import ItemList from './src/screens/ItemList';


const stack = createNativeStackNavigator();
const App=()=> {
  return (
  <>
  <NavigationContainer>
    <stack.Navigator initialRouteName="Welcome">
      <stack.Screen  name={'Welcome'} component={LandingPage} options={{ headerShown: false }}/>
      <stack.Screen  name={'SignUp'} component={SignInScreen} options={{ headerShown: false }}/>
      <stack.Screen  name={'Login'} component={LoginScreen} options={{ headerShown: false }}/>
      <stack.Screen  name={'FogotPassword'} component={FogotPasswordSC}/>
      <stack.Screen  name={'UserProfile'} component={UserAccount}/>
      <stack.Screen  name={'Dashboard'} component={Dashboard}/>

      <stack.Screen name={'InventoryAvailable'} component={InventoryScreen} options={{ headerShown: false }}/>
      <stack.Screen name={'InventoryExpired'} component={InventoryExpired} />
      <stack.Screen name={'InventoryOutOfStock'} component={InventoryOutOFStock} />

      <stack.Screen name={'ItemList'} component={ItemList} options={{ headerShown: false }}/>

    </stack.Navigator>
  </NavigationContainer>
  </>
  );
};

export default App;
