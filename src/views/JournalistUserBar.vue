<template>
  <v-app>
      <v-navigation-drawer
        permanent
        expand-on-hover
      >
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

        <v-list
          nav
          dense
        >
          <v-list-item link to="/user-profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>User Profile</v-list-item-title>
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
          <v-list-item @click="logout">
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
import firebase from 'firebase/compat/app';
  export default {
    methods:{
      logout() {
      firebase.auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          // this.$router.push('/');
            firebase.auth().signInAnonymously()
            .then(() => {
              this.$store.dispatch('add_role', "Anon");
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
    }
    }
  }
</script>

<style>
.v-navigation-drawer {
    height: 100%; /* 100% Full-height */
    width: 500; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 500; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #bd711b;/*#bd711b;*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
</style>