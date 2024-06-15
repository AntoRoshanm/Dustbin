const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotification = functions.database
  .ref('/dustbin')
  .onUpdate((change, context) => {
    const before = change.before.val();
    const after = change.after.val();

    if (after > 90 && before <= 90) {
      const message = {
        notification: {
          title: 'Dustbin Alert',
          body: `The dustbin is filled ${after}%`,
        },
        topic: 'dustbinAlert',
      };

      return admin
        .messaging()
        .send(message)
        .then((response) => {
          console.log('Successfully sent message:', response);
          return null;
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    }
    return null;
  });
