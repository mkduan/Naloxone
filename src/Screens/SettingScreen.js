import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../Style/Style.js';
import SettingButton from '../Components/SettingButton';
import SettingHeader from '../Components/SettingHeader.js';
import SettingLine from '../Components/SettingLine.js';
import MarkerCallout from '../Components/MarkerCallout.js';

import {onSignOut} from '../Auth/fakeAuth.js';

let switchValue = false;
let switchValueNoti = false;

export default ({ navigation }) => (
  <View style={{ flex: 1}}>
    <View style = {{ height: 75, backgroundColor: '#1f5fa5', justifyContent: 'flex-end'}}>
      <Text style= {{left: 20, bottom: 10, color: 'white', fontSize: 30}}>
        Settings
      </Text>
    </View>
    <SettingHeader
      title = {'General'}
    />
    <SettingLine/>
    <SettingButton
      title = {'Kit Holder'}
      toggleSwitch = {(value) =>{
        switchValue = value;
        console.log('Switch is: ' + value);
      }}
      switchValue = {switchValue}
      description = {'You regularly have a Naloxone kit on you and is ready to be administered'}
      blockIcon = {"md-medkit"}
      iconColor = {"#db2828"}
    />
    <SettingButton
      title = {'Notifications'}
      toggleSwitch = {(value) =>{
        switchValueNoti = value;
        console.log('Switch is: ' + value);
      }}
      switchValue = {switchValueNoti}
      description = {'Reviece notifications when distress calls are issued.'}
      blockIcon = {"md-notifications"}
      iconColor = {"skyblue"}
      isDisabled = {!switchValue}
    />
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <Button
        onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
        title="Log Out"
        color="#db2828"
      />
    </View>
  </View>
);