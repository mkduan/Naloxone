import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import styles from './Style/Style.js';

import MapScreen from './Screens/MapScreen.js';
import DistressScreen from './Screens/DistressScreen.js';
import SettingScreen from './Screens/SettingScreen.js';
import EducateScreen from './Screens/EducateScreen.js';

export default TabNavigator(
    {
      myMap: { screen: MapScreen },
      Distress: { screen: DistressScreen },
      Educate: {screen: EducateScreen },
      Settings: { screen: SettingScreen },
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'myMap') {
            iconName = `ios-map${focused ? '' : '-outline'}`;
          } else if (routeName === 'Settings') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          } else if (routeName === 'Distress') {
            iconName = `ios-warning${focused ? '' : '-outline'}`;
          } else if (routeName === 'Educate'){
            iconName = `ios-help-circle${focused ? '' : '-outline'}`;
          }
  
          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#1f5fa5',
        inactiveTintColor: 'gray',
      },
      animationEnabled: false,
      swipeEnabled: false,
    },
  );