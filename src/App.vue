<template>
  <v-app id="app">
    <!-- <AnonymousUserBar/> -->
    <AdminUserBar />
    <!-- <JournalistUserBar /> -->
    <v-card class="overflow-hidden rounded-0" style="z-index: 600">
    <v-app-bar
      color="grey darken-4"
      dark
    >
      <div class="d-flex align-center">
        <v-toolbar-title>
          Stay Strong
        </v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    </v-card>

    <v-container>
    <router-view />
    </v-container>
  </v-app>
</template>

<script>
// import JournalistUserBar from './views/JournalistUserBar.vue'
// import AnonymousUserBar from './views/AnonymousUserBar.vue';
import AdminUserBar from './views/AdminUserBar.vue';
// import DisplayView from './views/DisplayView';

export default {
  name: 'App',

  components: {
    // DisplayView,
    // AnonymousUserBar
    AdminUserBar
    // JournalistUserBar
  },

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}
</style>
