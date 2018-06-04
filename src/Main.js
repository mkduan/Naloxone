import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
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

      //TODO: See if this notification handler works
      this.notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({handleNotification: true});
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