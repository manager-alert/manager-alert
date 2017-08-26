var functions = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./private-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://manager-alert.firebaseio.com"
});

exports.sendPushNotification = functions.database
    .ref('news/{newsId}')
    .onCreate(event => {
        var news = event.data.val();

        return event.data.ref.child('players').once('value').then(snap => {
            return snap.forEach(player => {
                var playerId = player.key;

                return getPlayer(playerId).then(player => {
                    var payload = {
                        notification: {
                            body: news.title,
                            icon: player.image,
                            tag: player.name,
                            title: player.name
                        }
                    };
                    admin.messaging().sendToTopic(playerId, payload);
                    console.log('Successfully sent notification for "' + player.name + '"');
                });
            });
        });
    });

exports.subscribeToPlayer = functions.database
    .ref('users/{userId}/players/{playerId}')
    .onCreate(event => {
        var playerId = event.data.key;

        var user = event.data.ref.parent.parent;
        return user.child('push-subscriptions').once('value').then(snap => {
            return snap.forEach(subscription => {
                var token = subscription.key;

                return admin.messaging().subscribeToTopic(token, playerId)
                    .then(() => console.log('Subscribed to player ' + playerId));
            });
        }).then(() => console.log('Successfully subscribed'));
    });

function getPlayer(id) {
    return admin.database()
        .ref('players/' + id)
        .once('value')
        .then(snap => snap.val());
}