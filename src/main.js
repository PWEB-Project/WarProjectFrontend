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
Vue.component("downloadExcel", JsonExcel);
Vue.component("vue-json-to-csv", VueJsonToCsv);
Vue.use(Vuelidate);
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


export default firebaseAuth;
Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
