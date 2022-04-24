<template>
  <!-- <v-app> -->
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
            <!-- <router-link to="/about"> -->

            <v-list-item-icon>
              <v-icon>mdi-send-circle-outline</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Subscribe</v-list-item-title>
            <!-- </router-link> -->
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  <!-- </v-app> -->
</template>

<script>
  export default {
    //
  }
</script>

<style>
.v-navigation-drawer {
    height: 100%; /* 100% Full-height */
    width: 500; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 0; /* Stay on top */
    top: 0;
    left: 0;
    background-color: #bd711b;/*#bd711b;*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}
</style>