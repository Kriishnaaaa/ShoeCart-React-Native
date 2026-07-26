import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ShoeListScreen} from '../screens/Admin/ShoeListScreen';
import {AddEditShoeScreen} from '../screens/Admin/AddEditShoeScreen';
import type {AdminStackParamList} from './types';

const Stack = createNativeStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ShoeList">
      <Stack.Screen
        name="ShoeList"
        component={ShoeListScreen}
        options={{title: 'Shoe List'}}
      />
      <Stack.Screen
        name="AddEditShoe"
        component={AddEditShoeScreen}
        options={{title: 'Add/Edit Shoe'}}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
