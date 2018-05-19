import { AsyncStorage } from "react-native";

export const USER_KEY = "auth-demo-key";

export const onSignIn = () => AsyncStorage.setItem(USER_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

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