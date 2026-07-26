import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens/User/HomeScreen';
import {CartScreen} from '../screens/User/CartScreen';
import {OrdersScreen} from '../screens/User/OrdersScreen';
import type {UserStackParamList} from './types';

const Stack = createNativeStackNavigator<UserStackParamList>();

export const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen name="Cart" component={CartScreen} options={{title: 'Cart'}} />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{title: 'Orders'}}
      />
    </Stack.Navigator>
  );
};

export default UserNavigator;
