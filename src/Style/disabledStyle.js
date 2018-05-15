'use strict';
import { StyleSheet, Dimensions } from 'react-native';


let { width, height } = Dimensions.get('window');

var disabledStyles = StyleSheet.create({

    settingTitle: {
      height: 20,
      width: (width-60)*(4/5),
      fontSize: 17,
      fontWeight: 'normal',
      color: 'rgba(128, 128, 128, 0.5)',
    },
    settingSecondLine: {
      height:40,
      marginTop:2,
      width:width-60,
      color: 'rgba(128, 128, 128, 0.5)',
    },
});
export default disabledStyles;
