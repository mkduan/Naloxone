import React from 'react';
import { View, Button, ActivityIndicator, StatusBar } from 'react-native';
import styles from '../Style/Style.js';
import {SwitchButton, SettingTitle, CategoryTitle, DividingLine} from 'react-native-minimal-settings';

import {onSignOut, getInternalUserInfoBool, getInternalUserInfo} from '../Auth/fakeAuth.js';
import {loadPreferences, storeLocation, updateLatlng} from '../Networking/firebaseStore.js';

export default class SettingsScreen extends React.Component {

    constructor() {
      super();
      this.state = {
         switchValue: false,
         switchValueNoti: false,
         screenLoading: true,
      }
   }
  
    kitHolderSwitch = (value) => {
      this.setState({switchValue: value})
      console.log('Switch is: ' + value);
      storeLocation(value, this.state.switchValueNoti);
   }
  
   kitHolderNoti = (value) => {
     this.setState({switchValueNoti: value})
     console.log('Notifications is: ' + value);
     updateLatlng(this.state.switchValue, value);
   }

   componentDidMount() {
    getInternalUserInfo('userID')
      .then(res => {
        loadPreferences(res)
          .then(() => {
            getInternalUserInfoBool('kitHolder')
              .then(kitHolderRes => {
                console.log("kit setting res: " + kitHolderRes);
                if(kitHolderRes !== null) {
                  this.setState({ switchValue: kitHolderRes});
                }
                getInternalUserInfoBool('kitNoti')
                .then(kitNotiRes => {
                  console.log("noti setting res: " + kitNotiRes);
                  if(kitNotiRes !== null) {
                    this.setState({ switchValueNoti: kitNotiRes});
                  }
                  storeLocation(kitHolderRes, kitNotiRes);
                  this.setState({
                    screenLoading: false,
                  });
                })
                .catch(err => console.log("An error occurred getting KitNoti: " + err));
              })
              .catch(err => console.log("An error occurred getting KitHolder: " + err));
          })
          .catch (err => console.log("error in loading settings value"));
      })
      .catch(err => console.log("Error gettings Settings info"));
  }
  
  render() {
    if (this.state.screenLoading){
      return(
          <View style={styles.container}>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
          </View>
      );
    }
//#1f5fa5

    return (
      <View style={{ flex: 1}}>
        <SettingTitle
          title = {"Settings"}
          titleBackgroundColor = {'#1f5fa5'}
          titleColor = {'white'}          
        />
        <CategoryTitle
          title = {'General'}
        />
        <DividingLine
          lineColor = {'rgba(128, 128, 128, 0.5)'}
        />
        <SwitchButton
          title = {'Kit Holder'}
          toggleSwitch = {this.kitHolderSwitch}
          switchValue = {this.state.switchValue}
          description = {'You regularly have a Naloxone kit on you and is ready to be administered'}
          blockIcon = {"md-medkit"}
          iconColor = {"#db2828"}
        />
        <SwitchButton
          title = {'Notifications'}
          toggleSwitch = {this.kitHolderNoti}
          switchValue = {this.state.switchValueNoti}
          description = {'Receive notifications when distress calls are issued.'}
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