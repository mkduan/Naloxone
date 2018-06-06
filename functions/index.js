const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

Number.prototype.toRad = function() {
    return this * Math.PI / 180;
 }

//TODO: have to pass the latlng of the user too i guess
function HarversineEquation(currentlatlng, userLatlng) {
    var currentLatlngArray = currentlatlng.split(",");
    var userLatlngArray = userLatlng.split(","); 
    var currentLat = parseFloat(currentLatlngArray[0]).toRad();
    var currentLng = parseFloat(currentLatlngArray[1]).toRad();
    var userLat = parseFloat(userLatlngArray[0]).toRad();
    var userLng = parseFloat(userLatlngArray[1]).toRad();
    var R = 6372.8; // km
    var dLat = userLat - currentLat;
    var dLon = userLng - currentLng;
    var a = Math.sin(dLat / 2) * Math.sin(dLat /2) + Math.sin(dLon / 2) * Math.sin(dLon /2) * Math.cos(currentLat) * Math.cos(userLat);
    var c = 2 * Math.asin(Math.sqrt(a));
    var res = R * c;
    res = res.toString();
    res = res.substring(0,5);
    return res;
}

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

function getMessageFromPath(singleLatlngPath, currentlatlng, userExpoToken, userID) {
    var messages = [];
    return admin.database().ref('/latlng/'+singleLatlngPath).once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {

            var expoToken = childSnapshot.val().expoToken;
            var userLatlng = childSnapshot.val().latlng;

            var distance = HarversineEquation(currentlatlng, userLatlng);
            var notificationData = new Object();
            notificationData.distance = distance;
            notificationData.userExpoToken = userExpoToken;
            notificationData.userID = userID;
            notificationData.function = "distressCall";

            if(expoToken && expoToken !== userExpoToken) {
                messages.push({
                    "to": expoToken,
                    "title": "Distress Call",
                    "body": "The distress call distance is: " + distance + " km",
                    "data": notificationData,
                });
            }
    });
    console.log("Returning all the messages in " + singleLatlngPath + ": " + JSON.stringify(messages));
    return Promise.all(messages);
    });
}

function userInDistress(userID) {
    return admin.database().ref('/users/'+userID).update({
        inDistress: true,
    });
}

function distressCallAnswered(userID) {
    return admin.database().ref('/users/'+userID).update({
        inDistress: null,
    });
}

exports.sendPushNotification = functions.https.onRequest((req, res) => {
    var i = null;
    const latlngCategory = req.query.latlngPath;
    const userExpoToken = req.query.userExpoToken;
    const userLatlng = req.query.latlng;
    const userID = req.query.userID;
    console.log("The latlng of the request: " + latlngCategory);
    console.log("The users expoToken is: " + userExpoToken);
    console.log("The users latlng is: " + userLatlng);
    console.log("The userID is: " + userID);
    var allLatlngPaths = getAllLatLngNearby(latlngCategory);
    console.log("allLatlngPaths: " + allLatlngPaths);
    userInDistress(userID); 
    for (i = 0; i < allLatlngPaths.length; i++) {
        getMessageFromPath(allLatlngPaths[i], userLatlng, userExpoToken,userID)
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
    return res.send("success " + latlngCategory + ", " + userExpoToken + ", " + userLatlng + ", " + userID);
});

exports.sendDistressConfirmation = functions.https.onRequest((req, res) => {

    const userExpoToken = req.query.userExpoToken;
    const userID = req.query.userID;
    console.log("The users expoToken is: " + userExpoToken);
    console.log("The userID is: " + userID);

    return admin.database().ref('/users/'+userID).once('value').then((snapshot) => {

        //TODO: handle when there is no inDistress status
        var distressStatus = snapshot.val().inDistress;

        if(distressStatus !== null) {
            distressCallAnswered(userID);
            var notificationData = new Object();
            notificationData.function = "distressConfirmation";
            var messages = [{
                "to": userExpoToken,
                "title": "Distress Respond",
                "body": "A Naloxone kit holder has responeded to your distress call",
                "data": notificationData,
            }];
            console.log("using expo to send the notifications");
            fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messages)
            });
        }
        //Else find a way for send a callback from this so that it triggers an alert
        return res.send("success " +  userExpoToken + ", " + userID);
    });
});