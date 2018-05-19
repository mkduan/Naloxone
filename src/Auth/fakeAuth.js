import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";
let keys = [USER_KEY, 'kitHolder', 'userID'];

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.multiRemove(keys);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export const storeUserID = (userid) => AsyncStorage.setItem("userID", userid);

export const getInternalUserInfo = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(res => {
        if (res !== null) {
          console.log("Not null, res: " + res);
          resolve(res);
        } else {
          console.log("Null, res: " + res);
          resolve(res);
        }
      })
      .catch(err => {
        console.log("Rejected, err: " + err)
        reject(err)
      });
  });
};