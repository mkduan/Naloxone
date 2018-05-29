const functions = require('firebase-functions');
var fetch = require('node-fetch');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendPushNotification = functions.https.onRequest((req, res) => {
    var messages = [];
    const latlngCategory = req.query.latlng;
    const userID = req.query.userID;
    console.log("The latlng of the request: " + latlngCategory);
    return admin.database().ref('/users').once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {

            var expoToken = childSnapshot.val().expoToken;

            console.log(expoToken);

            if(expoToken) {
                messages.push({
                    "to": expoToken,
                    "body": "Testing notification"
                });
            }
      });
      console.log("Returning all the messages: " + messages);
      return Promise.all(messages);
    }).then(messages => {
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
        return res.send("success " + latlngCategory + ", " + userID);
    })
    .catch(reason => {
        console.log(reason);
        return res.send("fail");
    });
});
