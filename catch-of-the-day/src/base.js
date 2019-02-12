import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyD3Vp713TaaYJ4REH2FMLbdGpuinkdK-s4',
  authDomain: 'catch-of-the-day-yisus.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-yisus.firebaseio.com'
};
const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
