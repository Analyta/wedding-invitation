import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCHTFvyIGS-FvSqbze14d7TPOIoSoh9Slw",
  authDomain: "wedding-8ff0f.firebaseapp.com",
  databaseURL: "https://wedding-8ff0f-default-rtdb.firebaseio.com",
  projectId: "wedding-8ff0f",
  storageBucket: "wedding-8ff0f.firebasestorage.app",
  messagingSenderId: "72410561756",
  appId: "1:72410561756:web:ecd8a020da1ff3244f0819",
  measurementId: "G-BQ7XF45J7Z"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app); 