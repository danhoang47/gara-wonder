import { FirebaseOptions, initializeApp } from 'firebase/app'
import { FacebookAuthProvider, GoogleAuthProvider, getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "garage-wonder.firebaseapp.com",
    projectId: "garage-wonder",
    storageBucket: "garage-wonder.appspot.com",
    messagingSenderId: "175381225617",
    appId: "1:175381225617:web:2475faaa1971c91bf45f30",
    measurementId: "G-RESHK9ZTFJ"
};

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence)
const googleAuthProvider = new GoogleAuthProvider();
const fbAuthProvider = new FacebookAuthProvider();

export default firebaseApp
export { auth, googleAuthProvider, fbAuthProvider }