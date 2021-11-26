import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const getFirebaseImageUrl = ({ path, id }: { path: string[]; id: string }) => {
  const baseUrl = 'https://firebasestorage.googleapis.com/v0/b';
  const storageBucket = firebaseConfig.storageBucket;
  const folderPath = path.join('%2F');

  return `${baseUrl}/${storageBucket}/o/${folderPath}%2F${id}?alt=media`;
};

const storage = firebase.storage();
export default storage;
