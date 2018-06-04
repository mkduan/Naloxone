import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { getInternalUserInfo } from '../Auth/fakeAuth.js';

export default class HandleNotificationScreen extends Component {
    constructor() {
        super();
        this.state = {
          isLoading: true,
          distressDistance: null,
        };
    }

    componentDidMount() {
        getInternalUserInfo("distressDistance")
        .then(distanceRes => this.setState({distressDistance: distanceRes, isLoading: false}))
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
                        this.props.navigation.navigate("SignedIn");
                        AsyncStorage.removeItem("distressDistance");
                    }}
                />
                <Button
                    title="Maybe Not"
                    color="#3BB9FF"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => {
                        this.props.navigation.navigate("SignedIn");
                        AsyncStorage.removeItem("distressDistance");

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
