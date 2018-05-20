import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import {getInternalUserInfo} from '../Auth/fakeAuth.js';

export const newUserStoreData = (userid) => {
  firebase.database().ref('users/'+userid).set({
    kitHolder: false,
  });
  console.log("Welcome new user!");
};

export const loadPreferences = async (userid) => {
  let ref = await firebase.database().ref('users/'+userid+'/kitHolder');
  await ref.once("value", function(snapshot) {
   console.log("loading prefrences: " + snapshot.val());
   let kitValue = snapshot.val();
   if(kitValue !== null) {
    kitValue = kitValue.toString();
   } else {
     kitValue = false;
   }
   AsyncStorage.setItem("kitHolder", kitValue);
  }, function (error) {
   console.log("Error: " + error.code);
  });
};

export const storeLocation = (kit) => {
  console.log("Storing location");
  navigator.geolocation.getCurrentPosition(
    position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      getInternalUserInfo('userID')
      .then(res => {
        if(res !== null) {
          if(kit === true){
            console.log("storing latlng");
            firebase.database().ref('users/'+res).set({
              kitHolder: kit,
              lat: lat,
              lng: long,
            });
          } else {
            console.log("not storing latlng");
            firebase.database().ref('users/'+res).set({
              kitHolder: kit,
            });
          }
        } else {
          console.log("Can't find user");
        }
      })
      .catch(err => alert("An error occurred"));
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
  );
};