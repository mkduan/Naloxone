import { AsyncStorage } from "react-native";

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