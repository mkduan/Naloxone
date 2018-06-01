const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function baseCoord(coord, length) {
    var latDecimal = parseInt(coord.substring(length-2, length));
    return --latDecimal;
  }

function createLatlng(latDecimal, lngDecimal, latWhole, lngWhole) {
    latWhole = parseInt(latWhole);
    lngWhole = parseInt(lngWhole);
    switch(latDecimal.length) {
        case 1:
            latDecimal = "0" + latDecimal;
            break;
        case 2:
            latDecimal = latDecimal.toString();
            break;
        case 3:
            latDecimal = "00";
            latWhole++;
            break;
    }
    switch(lngDecimal.length) {
        case 1:
            lngDecimal = "0" + lngDecimal;
            break;
        case 2:
            lngDecimal = lngDecimal.toString();
            break;
        case 3:
            lngDecimal = "00";
            lngWhole++;
            break;
    }
    var res = latWhole+"o"+latDecimal+","+lngWhole+"o"+lngDecimal;
    return res;
}

function getAllLatLngNearby(latlng) {
    var res = latlng.split(",");

    var latlngCategories = [];
    var latCategories = [];
    var lngCategories = [];
    var latLength =res[0].length;
    var lngLength = res[1].length;

    var latBase = baseCoord(res[0],latLength);
    var lngBase = baseCoord(res[1],lngLength);
    var wholeLat = res[0].split("o")[0];
    var wholeLng = res[1].split("o")[0];

    var i = null;
    var j = null;

    for (i = 0; i < 3; i++) {
        latCategories.push(latBase.toString());
        latBase++;
    }
    for (i = 0; i < 3; i++) {
        lngCategories.push(lngBase.toString());
        lngBase++;
    }

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            latlngCategories.push(createLatlng(latCategories[i], lngCategories[j], wholeLat, wholeLng));
        }
    }

    return latlngCategories;
}

function getMessageFromPath(singleLatlngPath) {
    var messages = [];
    return admin.database().ref('/latlng/'+singleLatlngPath).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {

            var expoToken = childSnapshot.val().expoToken;

            if(expoToken) {
                //If the token matches the one being called then don't add to the list
                messages.push({
                    "to": expoToken,
                    "body": "Testing notification"
                });
            }
    });
    console.log("Returning all the messages in " + singleLatlngPath + ": " + JSON.stringify(messages));
    return Promise.all(messages);
    });
}

exports.sendPushNotification = functions.https.onRequest((req, res) => {
    var i = null;
    const latlngCategory = req.query.latlng;
    var allLatlngPaths = getAllLatLngNearby(latlngCategory);
    console.log("allLatlngPaths: " + allLatlngPaths);
    const userExpoToken = req.query.userExpoToken;
    console.log("The latlng of the request: " + latlngCategory);
    console.log("The users expoToken is: " + userExpoToken);
    for (i = 0; i < allLatlngPaths.length; i++) {
        getMessageFromPath(allLatlngPaths[i])
        .then(messages => {
            console.log("using expo to send the notifications");
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)
            });
            return null;
        })
        .catch(reason => {
            console.log(reason);
        });
    }
    return res.send("success " + latlngCategory + ", " + userExpoToken);
});

/*
then(messages => {
            console.log("using expo to send the notifications");
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)
            });
            //TODO: Test to see if this helps confirm
            return res.send("success " + latlngCategory + ", " + userExpoToken);
        })
        .catch(reason => {
            console.log(reason);
            return res.send("fail");
        });
*/