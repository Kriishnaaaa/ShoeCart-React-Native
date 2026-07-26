import type {NavigatorScreenParams} from '@react-navigation/native';

export type AdminStackParamList = {
  ShoeList: undefined;
  AddEditShoe: {
    shoeId?: string;
  };
};

export type UserStackParamList = {
  Home: undefined;
  Cart: undefined;
  Orders: undefined;
};

export type RootStackParamList = {
  RoleSelection: undefined;
  AdminStack: NavigatorScreenParams<AdminStackParamList>;
  UserStack: NavigatorScreenParams<UserStackParamList>;
};