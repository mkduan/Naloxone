import React from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import styles from '../Style/Style.js';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button'; 
import * as firebase from 'firebase';
import {storeLatLng} from '../Networking/storeLatLng.js';

let { width, height } = Dimensions.get('window');

export default class DistressScreen extends React.Component {

  storeLocation() {
    console.log("Storing location");
    navigator.geolocation.getCurrentPosition(
      position => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        storeLatLng()
        .then(res => {
          if(res !== null) {
            firebase.database().ref('users/'+res).set({
              lat: lat,
              lng: long
            });
          } else {
            console.log("Can't find user");
          }
        })
        .catch(err => alert("An error occurred"));
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );
    Alert.alert(
      'Distress Call',
      'Distress sent out to nearby Naloxone Kit holders, wait for a response.',
      [
          {text: 'OK', onPress:() => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
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
            onSlidingSuccess={this.storeLocation}
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