const OneSignal = require("onesignal-node");

const oneSignalClient = new OneSignal.Client({
  app: {
    appAuthKey: `MzZhNDc0ZmYtYzc5Ni00MzkzLWE5NTQtYWI5ZTVjNDViYjFk`,
    appId: `cf4e3457-cd54-4a3a-80c5-04f3bb311fa5`,
  },
});

module.exports = oneSignalClient;
