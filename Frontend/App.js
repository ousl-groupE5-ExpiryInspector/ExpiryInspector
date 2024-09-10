import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import SignInScreen from './src/screens/SignInScreen';
import LoginScreen from './src/screens/LoginScreen';
import FogotPasswordSC from './src/screens/FogotPassword';
import UserAccount from './src/screens/UserAccount';
import LandingPage from './src/screens/LandingPage';


const stack = createNativeStackNavigator();
const App=()=> {
  return (
  <>
  <NavigationContainer>
    <stack.Navigator initialRouteName="Welcome">
      <stack.Screen  name={'Welcome'} component={LandingPage} options={{ headerShown: false }}/>
      <stack.Screen  name={'SignUp'} component={SignInScreen}/>
      <stack.Screen  name={'Login'} component={LoginScreen}/>
      <stack.Screen  name={'FogotPassword'} component={FogotPasswordSC}/>
      <stack.Screen  name={'UserProfile'} component={UserAccount}/>
      <stack.Screen  name={'Dashboard'} component={Dashboard}/>

    </stack.Navigator>
  </NavigationContainer>
  </>
  );
};

export default App;
