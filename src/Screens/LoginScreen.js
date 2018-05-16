import React from 'react';
import { ImageBackground, Dimensions, Text, View, Button } from 'react-native';
import styles from '../Style/Style.js';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import LoginButton from '../Components/LoginButton.js';

let { width, height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {

    dummyfunction() {
        console.log("Dummy");
    }

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
                <LoginButton
                    login = {this.dummyfunction}
                    color = {'#de1f00'}
                    icon = {'ios-pin'}
                    loginText = {'Sign in with Google'}
                />
            </View>
        </ImageBackground>
    );
  }
}