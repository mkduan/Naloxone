import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants } from 'expo';

export default class HandleNotificationScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.paragraph}>
                    Test page for notification handling
                </Text>
                <Button
                    title="Hell Yea"
                    color="#db2828"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.props.navigation.navigate("SignedIn")}
                />
                <Button
                    title="Maybe Not"
                    color="#3BB9FF"
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.props.navigation.navigate("SignedIn")}
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
