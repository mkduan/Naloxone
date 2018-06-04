import React from "react";
import { Platform, StatusBar } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";

import Tabs from './Tabs.js';
import LoginScreen from "./Screens/LoginScreen.js";
import HandleNotificationScreen from './Screens/HandleNotificationScreen.js'

export const SignedIn = Tabs;

export const createRootNavigator = (signedIn = false, handleNotificaion) => {
  let _initialRouteName = null;
  if (handleNotificaion) {
    _initialRouteName = "HandleNotificationScreen";
  } else {
    if (signedIn) {
      _initialRouteName = "SignedIn";
    } else {
      _initialRouteName = "LoginScreen";
    }
  }

  return SwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      LoginScreen,
      HandleNotificationScreen
    },
    {
      initialRouteName: _initialRouteName
    }
  );
};