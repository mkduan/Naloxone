import {Platform, Linking} from 'react-native';

export default function openGps(latitude, longitude) {
  console.log('open directions')
  Platform.select({
      ios: () => {
          Linking.openURL('http://maps.apple.com/maps?daddr=' + latitude + ',' + longitude);
      },
      android: () => {
          Linking.openURL('http://maps.google.com/maps?daddr=' + latitude + ',' + longitude);
      }
  })();
}
