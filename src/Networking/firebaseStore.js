import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';

export const storeLatLng = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem("userID")
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            reject(null);
          }
        })
        .catch(err => reject(err));
    });
  };

  export const newUserStoreData = (userid) => {
    firebase.database().ref('users/'+userid).set({
        kitHolder: false,
      });
    console.log("Welcome new user!");
}

export const loadPreferences = async (userid) => {
  let ref = await firebase.database().ref('users/'+userid+'/kitHolder');
  await ref.once("value", function(snapshot) {
   console.log("loading prefrences: " + snapshot.val());
   let kitValue = snapshot.val();
   kitValue = kitValue.toString();
   AsyncStorage.setItem("kitHolder", kitValue);
  }, function (error) {
   console.log("Error: " + error.code);
  });
}

export const storeLocation = () => {
  console.log("Storing location");
  navigator.geolocation.getCurrentPosition(
    position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      storeLatLng()
      .then(res => {
        if(res !== null) {
          firebase.database().ref('users/'+res).set({
            lat: lat,
            lng: long
          });
        } else {
          console.log("Can't find user");
        }
      })
      .catch(err => alert("An error occurred"));
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
  );
}