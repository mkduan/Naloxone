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
  _handleNotification = async (notification) => {
    if(notification.data.function === "distressCall") {
      console.log("notification distance data is: " + JSON.stringify(notification.data.distance));
      await AsyncStorage.setItem("distressDistance", JSON.stringify(notification.data.distance));

      console.log("notification expoToken data is: " + JSON.stringify(notification.data.userExpoToken));
      await AsyncStorage.setItem("distressUserExpoToken", JSON.stringify(notification.data.userExpoToken));

      console.log("notification userID data is: " + JSON.stringify(notification.data.userID));
      await AsyncStorage.setItem("distressUserID", JSON.stringify(notification.data.userID));

      console.log("notification latlng data is: " + JSON.stringify(notification.data.userLatlng));
      await AsyncStorage.setItem("distressUserLatlng", JSON.stringify(notification.data.userLatlng));
      this.setState({handleNotification: true});
    }
    //TODO: the user should be able to send a message to say like hey i'm going to the hospital, tis all good.
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