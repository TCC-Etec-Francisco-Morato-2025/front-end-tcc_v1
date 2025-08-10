import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBfngPPQUo48B5_14a55kqvZzonOxSB3yw",
  authDomain: "tcc-etec-5bef3.firebaseapp.com",
  projectId: "tcc-etec-5bef3",
  storageBucket: "tcc-etec-5bef3.firebasestorage.app",
  messagingSenderId: "436415628677",
  appId: "1:436415628677:web:4c7df57c1cfbab91cbb0ec"
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

export {
  auth
}
