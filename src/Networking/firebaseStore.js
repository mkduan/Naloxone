import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import {getInternalUserInfo} from '../Auth/fakeAuth.js';

export const newUserStoreData = (userid) => {
  firebase.database().ref('users/'+userid).set({
    kitHolder: false,
    kitNoti: false,
  });
  console.log("Welcome new user!");
};

//TODO: clean this up because firebase is already asynchronous
export const loadPreferences = async (userid) => {
  let ref = await firebase.database().ref('users/'+userid+'/kitHolder');
  await ref.once("value", function(snapshot) {
   console.log("loading kit prefrences: " + snapshot.val());
   let kitValue = snapshot.val();
   if(kitValue !== null) {
    kitValue = kitValue.toString();
   } else {
     kitValue = 'false';
     firebase.database().ref('users/'+userid).update({
      kitHolder: false,
    });
    console.log("Missing kitHolder value in database, fixed");
   }
   console.log("storing kitHolder");
   AsyncStorage.setItem("kitHolder", kitValue);
  }, function (error) {
   console.log("Error: " + error.code);
  });

  let notiRef = await firebase.database().ref('users/'+userid+'/kitNoti');
  await notiRef.once("value", function(snapshot) {
   console.log("loading kit noti prefrences: " + snapshot.val());
   let NotiValue = snapshot.val();
   if(NotiValue !== null) {
    NotiValue = NotiValue.toString();
   } else {
     NotiValue = 'false';
     firebase.database().ref('users/'+userid).update({
      kitNoti: false,
    });
    console.log("Missing kitNoti value in database, fixed");
   }
   console.log("storing kit noti");
   AsyncStorage.setItem("kitNoti", NotiValue);
  }, function (error) {
   console.log("Error: " + error.code);
  });
};

//modulus to the nearest 0.01 and groups it by increments 0.01.
/*The whole point is to categorize kit holders by latlng, and 
then when there is a distress call, a function will explore
the latlng categories around them. */
latlngClassifier = (lat, lng) => {
  console.log("latlngClassifier starting..");
  lat = lat.toString();
  let latSplit = lat.split(".");
  latDec = latSplit[1];
  console.log(latSplit);

  lng = lng.toString();
  let lngSplit = lng.split(".");
  lngDec = lngSplit[1];
  console.log(lngSplit);

  let latCat = latDec.substr(0,2);
  let lngCat = lngDec.substr(0,2);

  let latPath = latSplit[0]+"o"+latCat;
  let lngPath = lngSplit[0]+"o"+lngCat;

  let latlng = lat + ',' + lng;
  let latlngPath = latPath + ',' + lngPath;
  return [latlng, latlngPath];
};

/*TODO: Always assume that the latlng cartegory changed, take the latlng category currently stored,
and then check with the latlng taken, if it's the same then w/e, if it's different then you have to
delete the one stored before creating a new one.
*/
export const storeLocation = (kit, kitnoti) => {
  let myoldLatlngPath = null;
  let expoToken = null;
  let userID = null;
  console.log("Storing location");
  navigator.geolocation.getCurrentPosition(
    position => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      let latlngArray = latlngClassifier(lat, long);
      let mylatlng = latlngArray[0];
      let latlngPath = latlngArray[1];
      AsyncStorage.setItem("latlngPath", latlngPath);
      console.log('storing latlngPath: ' + latlngPath);
      AsyncStorage.setItem("latlng", mylatlng);
      console.log('storing mylatlng: ' + mylatlng);
      getInternalUserInfo('expoToken')
      .then(expoRes => {
        expoToken = expoRes;
        getInternalUserInfo('userID')
        .then(userRes => {
          userID = userRes;
          
          firebase.database().ref('users/'+userID+'/latlngPath').once("value")
          .then(snapshot => {
            console.log("what the figgity frack path: " + snapshot.val())
            myoldLatlngPath = snapshot.val();
            if(myoldLatlngPath !== latlngPath) {
              if (myoldLatlngPath !== null) {
                firebase.database().ref('latlng/'+myoldLatlngPath+'/'+userID).update({
                  expoToken: null,
                  latlng: null,
                });
              }
            }

            if(userID !== null) {
              if(kit === true){
                console.log("storing latlng");
                firebase.database().ref('users/'+userID).update({
                  kitHolder: kit,
                  kitNoti: kitnoti,
                  latlng: mylatlng,
                  latlngPath: latlngPath,
                  //Should update expoToken constantly?
                });
                console.log("lat lng path: " + latlngPath);
                if(kitnoti) {
                  firebase.database().ref('latlng/'+latlngPath+'/'+userID).update({
                    expoToken: expoToken,
                    latlng: mylatlng,
                  });
                } else {
                  firebase.database().ref('latlng/'+latlngPath+'/'+userID).update({
                    expoToken: null,
                    latlng: null,
                  });
                }
              } else {
                console.log("not storing latlng");
                firebase.database().ref('users/'+userID).update({
                  kitHolder: kit,
                });
                firebase.database().ref('latlng/'+latlngPath+'/'+userID).update({
                  latlng: null,
                  expoToken: null,
                });
                //TODO: Always keep latlng path incase of distress
                //AsyncStorage.removeItem('latlngPath');
              }
            } else {
              console.log("Can't find user");
            }
          })
          .catch(err => console.log("Literally just in tears: " + err));
        })
        .catch(err => console.log("error finding userID in internal: " + err));
      })
      .catch(err => console.log("error finding expotoken in internal: " + err));
    },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
  );
};

export const updateLatlng = (kit, kitnoti) => {
  let userID = null;
  let expoToken = null;
  let latlng = null;
  getInternalUserInfo('userID')
    .then(res => {
      userID = res;
      if(res !== null) {
        console.log("updating kitNoti");
          firebase.database().ref('users/'+res).update({
            kitNoti: kitnoti,
        });
      }
    })
    .catch(err => console.log("Can't get internal user; updateLatlng: " + err));

  getInternalUserInfo('expoToken')
    .then(res => {
      expoToken = res;
    })
    .catch(err => console.log("error finding expotoken in internal"));

  getInternalUserInfo('latlng')
    .then(res => {
      latlng = res;
    })
    .catch(err => console.log("error finding expotoken in internal"));
  
  if(kit === true) {
    getInternalUserInfo('latlngPath')
      .then(res => {
        console.log("updatlatlng; latlngPath: " + res);
        if (kitnoti) {
          firebase.database().ref('latlng/'+res+'/'+userID).update({
            expoToken: expoToken,
            latlng: latlng,
          });
        } else {
          firebase.database().ref('latlng/'+res+'/'+userID).update({
            expoToken: null,
            latlng: null,
          });
        }
      })
      .catch(err => console.log("Can't get interal latlng path: " + err));
  }
};