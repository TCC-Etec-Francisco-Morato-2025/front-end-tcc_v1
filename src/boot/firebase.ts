import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAeYrKkG4o663quZUFnHs3qGgGZS0Y6dVU",
  authDomain: "enkie-ad852.firebaseapp.com",
  projectId: "enkie-ad852",
  storageBucket: "enkie-ad852.firebasestorage.app",
  messagingSenderId: "539087221037",
  appId: "1:539087221037:web:ca3b2e541f6a1850a6e3a4"
};
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export {
  auth
}
