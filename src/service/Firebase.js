import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyB_D__U7EcqVCKcLvNKVKCZ5I8uQz4LQa4",
  authDomain: "gt-dev-plaza.firebaseapp.com",
  databaseURL: "https://gt-dev-plaza-default-rtdb.firebaseio.com",
  projectId: "gt-dev-plaza",
  storageBucket: "gt-dev-plaza.appspot.com",
  messagingSenderId: "586677393693",
  appId: "1:586677393693:web:b603922eae073f864769f4",
  measurementId: "G-VEE1KZ5LHE"
};
console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
