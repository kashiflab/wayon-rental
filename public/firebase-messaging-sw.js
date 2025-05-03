importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
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

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
