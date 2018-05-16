import React from 'react';
import { ImageBackground, Dimensions, TouchableHighlight, Text, View, AsyncStorage, Button } from 'react-native';
import styles from '../Style/Style.js';
import * as firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

import LoginButton from '../Components/LoginButton.js';
import Tabs from '../Tabs.js';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

let { width, height } = Dimensions.get('window');

class LoginScreen extends React.Component {

    dummyfunction = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
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
                        onPress={this.dummyfunction}
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
                        onPress={this.dummyfunction}
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

const AppStack = Tabs;

export default SwitchNavigator(
    {
      Login: LoginScreen,
      App: AppStack,
    },
    {
      initialRouteName: 'Login',
    }
);