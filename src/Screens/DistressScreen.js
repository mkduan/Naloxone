import React from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import styles from '../Style/Style.js';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button'; 
import * as firebase from 'firebase';
import {getInternalUserInfo} from '../Auth/fakeAuth.js';

let { width, height } = Dimensions.get('window');

export default class DistressScreen extends React.Component {

  dummyFunction() {
    Alert.alert(
      'Distress Call',
      'Distress sent out to nearby Naloxone Kit holders, wait for a response.',
      [
          {text: 'OK', onPress:() => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
    let expoToken = null;
    let latlng = null;
    let userID = null;
    getInternalUserInfo('userID')
    .then(userIDRes => {
      userID = userIDRes;
      getInternalUserInfo('expoToken')
      .then(tokenRes => {
        expoToken = tokenRes;
        getInternalUserInfo('latlng')
        .then(latlngRes => {
          latlng = latlngRes;
          getInternalUserInfo('latlngPath')
          .then(latlngPath => {
            fetch('https://us-central1-naloxone-b5562.cloudfunctions.net/sendPushNotification?latlngPath='+latlngPath+'&userExpoToken='+expoToken+'&latlng='+latlng+'&userID='+userID)
            .then(res => {
              //TODO: If true then it's all good
              console.log(res);
            })
            .catch(err => console.log('Cant get response from distress: ' + err));
          })
          .catch(err => console.log("cant find internal latlng path"));
        })
        .catch(err => console.log("can't find expoToken"));
      })
      .catch(err => console.log("can't find expoToken"));
    })
    .catch(err => console.log("can't find userID for distress call: " + err));
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>Distress Call</Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <RNSlidingButton
            style={{
              width: width,
              backgroundColor: '#db2828',
            }}
            height={width / 7}
            onSlidingSuccess={this.dummyFunction}
            slideDirection={SlideDirection.RIGHT}>
            <View>
              <Text numberOfLines={1} style={styles.titleText}>
                SLIDE RIGHT FOR DISTRESS >
            </Text>
            </View>
          </RNSlidingButton>
        </View>
      </View>
    );
  }
}