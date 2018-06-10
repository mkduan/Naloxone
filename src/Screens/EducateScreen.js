import React from 'react';
import { Text, View,  } from 'react-native';

export default class HandleNotificationScreen extends React.Component {

    render() {

        return (
            <View style={{ flex: 1}}>
              <View style = {{ height: 75, backgroundColor: '#1f5fa5', justifyContent: 'flex-end'}}>
                <Text style= {{left: 20, bottom: 10, color: 'white', fontSize: 30}}>
                  About
                </Text>
              </View>

            </View>
        );
    }
}