// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNz3KS6CFL67COGM4GxIoiTQkh6YM5-p0",
    authDomain: "lillingo-c0db1.firebaseapp.com",
    projectId: "lillingo-c0db1",
    storageBucket: "lillingo-c0db1.appspot.com",
    messagingSenderId: "750716756004",
    appId: "1:750716756004:ios:c1c18f62efd2e35897b8b1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
