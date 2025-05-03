import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCKv74lEdGdstg5Sfw4SwKrRsmk4SuXDe0",
  authDomain: "lahorefresh.firebaseapp.com",
  databaseURL: "https://lahorefresh-default-rtdb.firebaseio.com",
  projectId: "lahorefresh",
  storageBucket: "lahorefresh.firebasestorage.app",
  messagingSenderId: "1010804688797",
  appId: "1:1010804688797:web:58b843c54d5f5420b21174",
  measurementId: "G-4M72ZRCCLY"
};
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(firebaseApp);
    }
    return null;
  } catch (err) {
    return null;
  }
})();

export const fetchToken = async (setTokenFound, setFcmToken) => {
  return getToken(await messaging, {
    vapidKey:
      "BNQvCqDBBsnfOfGjhyvp48UsWdvxVLZbeKPdj4C9KBZadMsEdLbgdLnmLn0RoEtgN-sRIeQhah3fOUKOczj6bD8",
  })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        setFcmToken(currentToken);

        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        setTokenFound(false);
        setFcmToken();
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.error(err);
      // catch error while creating client token
    });
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );
export const auth = getAuth(firebaseApp);
