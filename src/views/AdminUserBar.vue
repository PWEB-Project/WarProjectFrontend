<template>
  <v-app>
    <v-navigation-drawer permanent expand-on-hover dark dense>
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
        <v-list-item link to="/user-profile">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User Profile</v-list-item-title>
        </v-list-item>
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
          <template v-slot:activator="{ on, attrs }" >
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
                  <v-select v-model="valueCity" :items="cities" label="Select City" dense item-text="name" item-value="id">
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
        <v-list-item link to="/logout" style="vertical-aligne: bottom">
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

export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    dialog: false,
    countries: [],
    valueCountry: "",
    counties: [],
    valueCounty: "",
    cities: [],
    valueCity: ""
  }),
  // created() {
  //   this.initialize();
  // },
  methods: {
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
      // var new_name =
      //   this.editedItem.first_name + " " + this.editedItem.last_name;
      // if (this.editedIndex > -1) {
      //   Object.assign(this.items[this.editedIndex], {
      //     ...this.editedItem,
      //     ...{ name: new_name }
      //   });
      // } else {
      //   this.items.push({ ...this.editedItem, ...{ name: new_name } });
      // }
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