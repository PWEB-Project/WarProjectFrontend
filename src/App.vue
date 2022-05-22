<template>
  <v-app id="app">
    <AdminUserBar  v-if="$store.state.role === 'Administrator'"/>
    <JournalistUserBar v-else-if="$store.state.role === 'Journalist'" />
    <AnonymousUserBar v-else/>
    
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import JournalistUserBar from './views/JournalistUserBar.vue'
import AnonymousUserBar from './views/AnonymousUserBar.vue';
import AdminUserBar from './views/AdminUserBar.vue';
// import DisplayView from './views/DisplayView';
// import api from ""
export default {
  name: "App",

  components: {
    // DisplayView,
    AnonymousUserBar,
    AdminUserBar,
    JournalistUserBar
  },

  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    value: ["foo", "bar", "fizz", "buzz"],
  }),

  created() {},
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
