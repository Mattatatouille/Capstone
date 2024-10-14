import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCYAgINR2Y3SYpGA7kDBvg6EbQy1WTsJ3g",
    authDomain: "lillingo-8a858.firebaseapp.com",
    projectId: "lillingo-8a858",
    storageBucket: "lillingo-8a858.appspot.com",
    messagingSenderId: "1042796883709",
    appId: "1:1042796883709:ios:17a3747428a63ee1bbd894",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
