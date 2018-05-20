import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../Style/Style.js';
import SettingButton from '../Components/SettingButton';
import SettingHeader from '../Components/SettingHeader.js';
import SettingLine from '../Components/SettingLine.js';
import MarkerCallout from '../Components/MarkerCallout.js';

import {onSignOut, getInternalUserInfoBool, getInternalUserInfo} from '../Auth/fakeAuth.js';
import {loadPreferences} from '../Networking/firebaseStore.js';

export default class SettingsScreen extends React.Component {

    constructor() {
      super();
      this.state = {
         switchValue: false,
         switchValueNoti: false,
      }
   }
  
    kitHolderSwitch = (value) => {
      this.setState({switchValue: value})
      console.log('Switch is: ' + value);
   }
  
   kitHolderNoti = (value) => {
     this.setState({switchValueNoti: value})
     console.log('Notifications is: ' + value);
   }

   componentDidMount() {
    getInternalUserInfo('userID')
      .then(res => {
        loadPreferences(res)
          .then(() => {
            getInternalUserInfoBool('kitHolder')
              .then(res => {
                console.log("setting res: " + res);
                if(res !== null) {
                  this.setState({ switchValue: res})
                }
              })
              .catch(err => alert("An error occurred"));
          })
          .catch (err => console.log("error in loading settings value"));
      })
      .catch(err => console.log("Error gettings Settings info"));
  }
  
  render() {
    return (
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
          toggleSwitch = {this.kitHolderSwitch}
          switchValue = {this.state.switchValue}
          description = {'You regularly have a Naloxone kit on you and is ready to be administered'}
          blockIcon = {"md-medkit"}
          iconColor = {"#db2828"}
        />
        <SettingButton
          title = {'Notifications'}
          toggleSwitch = {this.kitHolderNoti}
          switchValue = {this.state.switchValueNoti}
          description = {'Reviece notifications when distress calls are issued.'}
          blockIcon = {"md-notifications"}
          iconColor = {"skyblue"}
          isDisabled = {!this.state.switchValue}
        />
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <Button
            onPress={() => onSignOut().then(() => this.props.navigation.navigate('LoginScreen'))}
            title="Log Out"
            color="#db2828"
          />
        </View>
      </View>
    );
  }
}