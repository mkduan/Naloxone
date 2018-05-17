import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";

import Tabs from './Tabs.js';
import LoginScreen from "./Screens/LoginScreen.js";

export const SignedIn = Tabs;

export const createRootNavigator = (signedIn = false) => {
  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      LoginScreen
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "LoginScreen"
    }
  );
};