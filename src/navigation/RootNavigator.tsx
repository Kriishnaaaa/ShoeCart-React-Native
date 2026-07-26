import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AdminNavigator} from './AdminNavigator';
import {UserNavigator} from './UserNavigator';
import type {RootStackParamList} from './types';
import {RoleSelectionScreen} from '../screens/Common/RoleSelectionScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="RoleSelection">
      <Stack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{title: 'Role Selection'}}
      />
      <Stack.Screen
        name="AdminStack"
        component={AdminNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserStack"
        component={UserNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
