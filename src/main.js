import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import JsonExcel from "../node_modules/vue-json-excel"
import VueJsonToCsv from '../node_modules/vue-json-to-csv'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.component("downloadExcel", JsonExcel);
Vue.component("vue-json-to-csv", VueJsonToCsv);
Vue.use(Vuelidate);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4D5R8vhfiv7Cle8bnk4cvi2gCboK8OIM',
    libraries: 'geometry,places'
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyBGOcGtYOw7Q8lYZ1J3y8Ypq7edvseJemk",
  authDomain: "warproject-9900f.firebaseapp.com",
  projectId: "warproject-9900f",
  storageBucket: "warproject-9900f.appspot.com",
  messagingSenderId: "155584581892",
  appId: "1:155584581892:web:72ce6cfdc9f0bd9ca58051",
  measurementId: "G-GCYQX8918R"
};

// firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.initializeApp(firebaseConfig);

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  firebaseAuth.getAuth()
    .listUsers(1000, nextPageToken)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};

export default listAllUsers;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
