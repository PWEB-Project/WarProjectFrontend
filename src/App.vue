<template>
  <v-app id="app">
    <AnonymousUserBar/>
    <v-app-bar
      app
      color="grey darken-2"
      dark
    >
      <div class="d-flex align-center">
        <!-- <v-text-field
        value="Stay Strong"
        disabled>
        </v-text-field> -->
        <v-toolbar-title>
          Stay Strong
        </v-toolbar-title>
        <!-- <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://p7.hiclipart.com/preview/102/563/822/staying-strong-temporary-tattoo-irezumi-stay-strong-tattoo-png-thumbnail.jpg"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
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
    

    <!-- <v-main>
      <DisplayView/>
    </v-main> -->
  </v-app>
</template>

<script>
import AnonymousUserBar from './views/AnonymousUserBar.vue';
// import DisplayView from './views/DisplayView';

export default {
  name: 'App',

  components: {
    // DisplayView,
    AnonymousUserBar
  },

  data: () => ({
    //
  }),
};
</script>

