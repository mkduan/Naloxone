import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from 'react-native';
import {isSignedIn} from './Auth/fakeAuth.js';
import {createRootNavigator} from './Router.js';
import styles from './Style/Style.js';
import {Notifications} from 'expo';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      handleNotification: false,
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));

      this.notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  //TODO: setting state might be throwing warning
  _handleNotification = (notification) => {
    this.setState({handleNotification: true});
    console.log("notification distance data is: " + JSON.stringify(notification.data.distance));
    AsyncStorage.setItem("distressDistance", JSON.stringify(notification.data.distance));
  }

  render() {
    const { checkedSignIn, signedIn, handleNotification } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }

    const Layout = createRootNavigator(signedIn, handleNotification);
    return <Layout />;
  }
}