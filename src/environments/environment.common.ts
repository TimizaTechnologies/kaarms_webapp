// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');

export const commonEnv = {
  production: false,
  environmentName: 'development',
  appVersion: `${version}-dev`,
  apiUrl: 'http://localhost:8000/api/',
  firebase: {
    projectId: 'kaarms-d20c4',
    appId: '1:437039208173:web:6a7070f0c3eb2a3b915ee4',
    storageBucket: 'kaarms-d20c4.appspot.com',
    apiKey: 'AIzaSyALbnIeZVyngktAD1QyqWucwC6zWdYArIA',
    authDomain: 'kaarms-d20c4.firebaseapp.com',
    messagingSenderId: '437039208173',
    measurementId: 'G-J6BJDJ00HB',
    databaseURL:
      'https://kaarms-d20c4-default-rtdb.asia-southeast1.firebasedatabase.app/',
  },
  settings: {
    auth: {
      // OAuth2 credentials
      clientId: 'fake-client-id', // <Your auth client id here>
      secretId: 'fake-secret-id', // <Your auth secret id here>

      // keys to store tokens at local storage
      accessTokenKey: 'DoPS3ZrQjM',
      refreshTokenKey: 'nmlP8PW2nb',
    },
  },
};
