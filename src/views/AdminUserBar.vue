<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover dense color="#f1eef2">
      <v-list>
        <v-list-item link to="/home">
          <v-img src="../assets/Logo (1).png"></v-img>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <!-- <v-list-item link to="/user-profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Users</v-list-item-title>
        </v-list-item> -->
        <v-dialog v-model="dialog_user" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item>
          </template>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1 ? 'eye' : 'eye-off'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1">
                    </v-text-field>
                  </v-col>
                  <v-radio-group v-model="role" row>
                    <v-radio label="Administrator" value="Administrator"></v-radio>
                    <v-radio label="Journalist" value="Journalist"></v-radio>
                  </v-radio-group>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block color="success" @click="validate">
                      Save user
                    </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block @click="dialog_user = false">
                      Cancel
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-list-item link to="/bunker">
          <v-list-item-icon>
            <v-icon>mdi-warehouse</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Bunkers</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/necessity-goods">
          <v-list-item-icon>
            <v-icon>mdi-charity</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Necessity Goods</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/news">
          <v-list-item-icon>
            <v-icon>mdi-newspaper</v-icon>
          </v-list-item-icon>
          <v-list-item-title>News</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/article">
          <v-list-item-icon>
            <v-icon>mdi-book-open-page-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Articles</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/review">
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reviews</v-list-item-title>
        </v-list-item>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs" @click="initialize">
              <v-list-item-icon>
                <v-icon>mdi-access-point</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Change location</v-list-item-title>

            </v-list-item>
          </template>
          <v-card>
            <v-card-title>Select Location</v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
              <v-list>
                <v-container fluid>
                  <v-select v-model="valueCountry" :items="countries" label="Select Country" dense item-text="name"
                    item-value="iso2" @input="selectCountry">
                  </v-select>
                </v-container>
              </v-list>
              <v-list>
                <v-container fluid>
                  <v-select v-model="valueCounty" :items="counties" label="Select County" dense item-text="name"
                    item-value="iso2" @input="selectCounty">
                  </v-select>
                </v-container>
              </v-list>
              <v-list>
                <v-container fluid>
                  <v-select v-model="valueCity" :items="cities" label="Select City" dense item-text="name"
                    item-value="id">
                  </v-select>
                </v-container>
              </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="close">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-list-item style="vertical-aligne: bottom" @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import api from "../components/backend_api";
import firebase from "firebase/compat/app";

export default {
  data: () => ({
    role: null,
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    dialog: false,
    dialog_user: false,
    countries: [],
    valueCountry: "",
    counties: [],
    valueCounty: "",
    cities: [],
    valueCity: "",
    loginPassword: "",
    loginEmail: "",
    valid: null,
    loginEmailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    emailRules: [
      (v) => !!v || "Required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => (v && v.length >= 5) || "Min 6 characters",
    },
  }),
  mounted() {
    if (localStorage.getItem("city") == "null") {
      this.open_dialog();
      this.initialize();
    }
  },
  methods: {
    open_dialog() {
      this.dialog = true;
    },
    logout() {
      firebase.auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          // this.$router.push('/');
          firebase.auth().signInAnonymously()
            .then(() => {
              this.$store.dispatch('add_role', "Anon");
              this.$store.dispatch('delete_city');
              this.$router.push('/news');

            })
            .catch((error) => {
              const errorMessage = error.message;
              alert(errorMessage);
            });
        })
        .catch(error => {
          alert(error.message);
          this.$router.push('/');
        });
    },
    // reserve(name) {
    //   this.loading = true;
    //   console.log(name);
    //   setTimeout(() => (this.loading = false), 2000);
    //   const str1 = "/menuPageUser/";
    //   this.$router.push(str1.concat(name));
    // },
    close() {
      this.dialog = false;
    },
    save() {
      this.$store.dispatch('add_city', this.valueCity);
      console.log(localStorage.getItem("city"));
      this.close();
    },
    selectCountry() {
      api
        .getCounties(this.valueCountry)
        .then(response => {
          console.log(response.data);
          this.counties = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    selectCounty() {
      api
        .getCity(this.valueCountry, this.valueCounty)
        .then(response => {
          console.log(response.data);
          this.cities = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    initialize() {
      api
        .getCountries()
        .then(response => {
          console.log(response.data);
          this.countries = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });

    },
    validate() {

      console.log("in register");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then((res) => {
          console.log(res);
          this.dialog_user = false;
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
}
</script>

<style>
.v-navigation-drawer {
  height: 100%;
  /* 100% Full-height */
  width: 500;
  /* 0 width - change this with JavaScript */
  position: fixed;
  /* Stay in place */
  z-index: 500;
  /* Stay on top */
  top: 0;
  left: 0;
  background-color: #bd711b;
  /*#bd711b;*/
  overflow-x: hidden;
  /* Disable horizontal scroll */
  padding-top: 60px;
  /* Place content 60px from the top */
  transition: 0.5s;
  /*0.5 second transition effect to slide in the sidenav*/
}
</style>