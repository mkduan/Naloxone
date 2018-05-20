import React from 'react';
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage } from 'react-native';
import styles from '../Style/Style.js';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import LoginButton from '../Components/LoginButton.js';
import {onSignIn} from '../Auth/fakeAuth.js';
import {storeUserID} from '../Auth/fakeAuth.js';
import {newUserStoreData, loadPreferences} from '../Networking/firebaseStore.js';

import {ANDROID_CLIENT_ID, IOS_CLIENT_ID} from 'react-native-dotenv';

import Expo from 'expo';

let { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {

    async signInWithGoogleAsync() {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId:ANDROID_CLIENT_ID,
            iosClientId:IOS_CLIENT_ID,
            scopes: ["profile", "email"]
          });
      
          if (result.type === "success") {
            const { idToken, accessToken } = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase
              .auth()
              .signInAndRetrieveDataWithCredential(credential)
              .then(res => {
                onSignIn();
                userid = res.user.uid;
                loadPreferences(userid);
                if(res.additionalUserInfo.isNewUser) {
                 newUserStoreData(userid);   
                }
                console.log(userid);
                storeUserID(userid);
              })
              .catch(error => {
                console.log("firebase cred err:", error);
              });
          } else {
            return { cancelled: true };
          }
        } catch (err) {
          console.log("err:", err);
        }
      };

  render() {
    return (
        <ImageBackground
            source={require('../img/naloxonewelcome.jpg')}
            style={{width: '100%', height: '100%'}}
        >
            <View style={{
                flex: 1
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    height:50,
                    alignItems: 'center',
                    marginTop: height/5
                    }}>
                        <Ionicons name="ios-pin" size={50} color="#1f5fa5"  style={{marginRight: 5}}/>
                        <Text
                            style={{
                                color: '#1f5fa5',
                                fontSize: 50,
                                fontFamily:'Roboto',
                            }}>
                            Naloxone
                        </Text>
                </View>
                <View 
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: height*(1/5),
                    }}>
                    <TouchableHighlight
                        style={{
                            backgroundColor: "#de1f00",
                            width: width*(8/10),
                            padding: 10,
                        }}
                        onPress={() => {
                            this.signInWithGoogleAsync().then(() => this.props.navigation.navigate("SignedIn"));
                          }}
                        underlayColor="#CA1D00"
                    >
                        <LoginButton
                            icon = {"logo-google"}
                            loginText = {"Sign in with Google"}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={{
                            backgroundColor: "#39579a",
                            width: width*(8/10),
                            padding: 10,
                            marginTop: 10,
                        }}
                        onPress={() => {
                            onSignIn().then(() => this.props.navigation.navigate("SignedIn"));
                          }}
                        underlayColor="#34508C"
                    >
                        <LoginButton
                            icon = {"logo-facebook"}
                            loginText = {"Sign in with Facebook"}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </ImageBackground>
    );
  }
}