// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrRwgQVPe6rkJqh6QoZi2NSJlziEmz0Vk",
  authDomain: "chatingapp-c8cdf.firebaseapp.com",
  databaseURL: "https://chatingapp-c8cdf-default-rtdb.firebaseio.com",
  projectId: "chatingapp-c8cdf",
  storageBucket: "chatingapp-c8cdf.appspot.com",
  messagingSenderId: "623369120835",
  appId: "1:623369120835:web:7e28ae3da69fb5aa1af8f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
