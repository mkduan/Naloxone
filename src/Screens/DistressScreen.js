import React from 'react';
import { Alert, Dimensions, Text, View } from 'react-native';
import styles from '../Style/Style.js';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button'; 

let { width, height } = Dimensions.get('window');

export default class DistressScreen extends React.Component {

  distressCall() {
    Alert.alert(
        'Distress Call',
        'Distress sent out to nearby Naloxone Kit holders, wait for a response.',
        [
            {text: 'OK', onPress:() => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text>Distress Call</Text>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          <RNSlidingButton
            style={{
              width: width,
              backgroundColor: '#ff0000',
            }}
            height={width / 7}
            onSlidingSuccess={this.distressCall.bind(this)}
            slideDirection={SlideDirection.RIGHT}>
            <View>
              <Text numberOfLines={1} style={styles.titleText}>
                SLIDE RIGHT FOR DISTRESS >
            </Text>
            </View>
          </RNSlidingButton>
        </View>
      </View>
    );
  }
}