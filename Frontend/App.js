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
import ItemDetail from './src/screens/ItemDetail';
import BudgetScreen from './src/screens/BudgetPlanner';
import BudgetListScreen from './src/screens/BudgetListScreen';
import BudgetPreviewScreen from './src/screens/BudgetPreviewScreen';
import FAQScreen from './src/screens/FAQ';
import NotificationScreen from './src/screens/Notification';
import CamaraScreen from './src/screens/Camara';

const stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
        <stack.Navigator initialRouteName="Welcome">
          <stack.Screen name={'Welcome'} component={LandingPage} options={{ headerShown: false }} />
          <stack.Screen name={'SignUp'} component={SignInScreen} options={{ headerShown: false }} />
          <stack.Screen name={'Login'} component={LoginScreen} options={{ headerShown: false }} />

          <stack.Screen name={'FogotPassword'} component={FogotPasswordSC} options={{ headerShown: false }} />
          <stack.Screen name={'UserProfile'} component={UserAccount} options={{ headerShown: false }} />
          <stack.Screen name={'Dashboard'} component={Dashboard} options={{ headerShown: false }} />


          <stack.Screen name={'InventoryAvailable'} component={InventoryScreen} options={{ headerShown: false }} />
          <stack.Screen name={'InventoryExpired'} component={InventoryExpired} options={{ headerShown: false }} />
          <stack.Screen name={'InventoryOutOfStock'} component={InventoryOutOFStock} options={{ headerShown: false }} />

          <stack.Screen name={'ItemList'} component={ItemList} options={{ headerShown: false }} />
          <stack.Screen name={'ItemDetail'} component={ItemDetail} options={{ headerShown: false }} />
          <stack.Screen name={'Budget'} component={BudgetScreen} options={{ headerShown: false }} />
          <stack.Screen name={'BudgetListScreen'} component={BudgetListScreen} options={{ headerShown: false }} />
          <stack.Screen name={'BudgetPreviewScreen'} component={BudgetPreviewScreen} options={{ headerShown: false }} />


          <stack.Screen name={'FAQ'} component={FAQScreen} options={{ headerShown: false }} />

          <stack.Screen name={'Notification'} component={NotificationScreen} options={{ headerShown: false }} />

          <stack.Screen name={'Camara'} component={CamaraScreen} options={{ headerShown: true }} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
