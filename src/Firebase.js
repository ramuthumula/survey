import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDL8F49kHGzsHtD_9oIWLC6WV0LZi5Cfzs",
    authDomain: "survery-d7bc9.firebaseapp.com",
    databaseURL: "https://survery-d7bc9-default-rtdb.firebaseio.com",
    projectId: "survery-d7bc9",
    storageBucket: "survery-d7bc9.appspot.com",
    messagingSenderId: "219840392639",
    appId: "1:219840392639:web:1bb331af0e4c2fd359c50a"
  };

  const firedb=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
  const auth=firebase.auth();

  export {auth};
  export {db};
  export default firedb.database().ref();