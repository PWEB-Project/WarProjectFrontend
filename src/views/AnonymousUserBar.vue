<template>
  <!-- <v-app> -->
  <v-navigation-drawer permanent expand-on-hover dense color="#f1eef2">
    <v-list>
        <v-list-item link to="/home">
              <v-img src="../assets/Logo (1).png"></v-img>
          </v-list-item>
    </v-list>
    
    <v-divider></v-divider>

    <v-list nav dense>
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
    
            <v-list-item @click.stop="dialog_subscribe = true">
        <v-list-item-icon>
          <v-icon>mdi-send-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Subscribe</v-list-item-title>
      </v-list-item>
      
      <SubscribeAddView v-model="dialog_subscribe"/>
      
      <v-dialog v-model="dialogLocation" persistent max-width="600px" >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
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
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </template>
        <v-card class="px-4">
          <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginEmail"
                    :rules="loginEmailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginPassword"
                    :append-icon="show1 ? 'eye' : 'eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-col>
                <v-radio-group
                  v-model="role"
                  row
                >
                  <v-radio
                    label="Administrator"
                    value="Administrator"
                  ></v-radio>
                  <v-radio
                    label="Journalist"
                    value="Journalist"
                  ></v-radio>
                </v-radio-group>
                <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                  <v-btn
                    x-large
                    block
                    :disabled="!valid"
                    color="success"
                    @click="validate"
                  >
                    Login
                  </v-btn>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                  <v-btn
                    x-large
                    block
                    @click="dialog=false"
                  >
                    Cancel
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-list>
    <v-footer class="justify-center pl-0" inset app> </v-footer>
  </v-navigation-drawer>
  <!-- </v-app> -->
</template>

<script>
import firebase from 'firebase/compat/app';
import api from "../components/backend_api";
import SubscribeAddView from './SubscribeAddView.vue';
export default {
  components:{
    SubscribeAddView
},
  data: () => ({
    dialog_subscribe: false,
    countries: [],
    valueCountry: "",
    counties: [],
    valueCounty: "",
    cities: [],
    valueCity: "",
    dialogLocation: false,
    dialog: false,
    valid: true,
    verify: "",
    role: null,
    loginPassword: "",
    loginEmail: "",
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
    if(localStorage.getItem("city") == "null"){
      this.open_dialog();
      this.initialize();
    }
  },
  methods: {
    open_dialog(){
      this.dialogLocation = true;
    },
    close() {
      this.dialogLocation = false;
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
      if (this.$refs.loginForm.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
          .then(() => {
            this.dialog = false;
            this.$store.dispatch('add_role', this.role);
            console.log(localStorage.getItem("role"));
            this.$store.dispatch('delete_city');
            this.$router.push("/home");
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    },
  },
};
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
  background-color: rgba(61, 41, 115, 0.05);
  /*#bd711b;*/
  overflow-x: hidden;
  /* Disable horizontal scroll */
  padding-top: 60px;
  /* Place content 60px from the top */
  transition: 0.5s;
  /*0.5 second transition effect to slide in the sidenav*/
}
</style>