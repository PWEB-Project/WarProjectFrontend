<template>
  <!-- <v-app> -->
  <v-navigation-drawer permanent expand-on-hover dark dense>
    <v-list>
      <v-list> </v-list>
    </v-list>
    <!-- <v-list> -->
    <!-- <v-list-item class="px-2"> -->
    <!-- <v-list-item-avatar> -->
    <!-- <v-img src="https://www.kindpng.com/picc/m/562-5621554_frase-stay-strong-hd-png-download.png"></v-img> -->
    <!-- </v-list-item-avatar> -->
    <!-- </v-list-item> -->
    <!-- 
          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Sandra Adams
              </v-list-item-title>
              <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item> -->
    <!-- </v-list> -->

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
      <v-list-item link to="/subscribe">
        <v-list-item-icon>
          <v-icon>mdi-send-circle-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Subscribe</v-list-item-title>
      </v-list-item>
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
export default {
  data: () => ({
    dialog: true,
    valid: true,

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
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
      min: (v) => (v && v.length >= 8) || "Min 8 characters",
    },
  }),
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
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