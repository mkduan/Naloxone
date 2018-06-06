import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { Constants } from 'expo';
import { getInternalUserInfo } from '../Auth/fakeAuth.js';

let keys = ['distressDistance', 'distressUserExpoToken', 'distressUserID'];

export default class HandleNotificationScreen extends Component {
    constructor() {
        super();
        this.state = {
          isLoading: true,
          distressDistance: null,
          distressUserExpoToken: null,
          distressUserID: null,
        };
    }

    componentDidMount() {
        getInternalUserInfo("distressDistance")
        .then(distanceRes => {
            this.setState({distressDistance: distanceRes});
            getInternalUserInfo("distressUserExpoToken")
            .then(userExpoTokenRes => {
                this.setState({distressUserExpoToken: userExpoTokenRes});
                getInternalUserInfo("distressUserID")
                .then(userIDRes => {
                    this.setState({distressUserID: userIDRes, isLoading: false});
                })
                .catch(err => console.log("can't find distress distance in handling notification: " + err));    
            })
            .catch(err => console.log("can't find distress distance in handling notification: " + err));
        })
        .catch(err => console.log("can't find distress distance in handling notification: " + err));
    }

    render() {
        if (this.state.isLoading) {
            return(
              <View style={styles.container}>
                  <ActivityIndicator />
                  <StatusBar barStyle="default" />
              </View>
            );
          }

        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Test page for notification handling:{"\n"}
                    The distress call is {this.state.distressDistance} km away
                </Text>
                <Button
                    title="Hell Yea"
                    color="#db2828"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => {
                        Alert.alert(
                            'Distress Call Confirmation',
                            'A confirmation of the distress call has been send out to the user in distress.',
                            [
                                {text: 'OK', onPress: () => {
                                    console.log('OK pressed for distress confirmation.');
                                    AsyncStorage.multiRemove(keys);
                                    //TODO: Can probably clean this up
                                    var userExpoToken = this.state.distressUserExpoToken.replace(/"/g, "");;
                                    var userID = this.state.distressUserID.replace(/['"]/g, "");;
                                    fetch('https://us-central1-naloxone-b5562.cloudfunctions.net/sendDistressConfirmation?userExpoToken='+userExpoToken+'&userID='+userID)
                                    .then(res => {
                                        console.log(res);
                                        this.props.navigation.navigate("SignedIn");
                                    });
                                }},
                            ],
                            {cancelable: false}
                        );
                    }}
                />
                <Button
                    title="Maybe Not"
                    color="#3BB9FF"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => {
                        AsyncStorage.multiRemove(keys)
                        .then(() => {
                            this.props.navigation.navigate("SignedIn");
                        })
                        .catch(err => console.log("Can't remove asyncStore in handleNotificationScreen: " + err));
                    }}
                />
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
