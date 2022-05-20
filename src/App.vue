<template>
  <v-app id="app">
    <!-- <AnonymousUserBar/> -->
    <AdminUserBar />
    <!-- <JournalistUserBar /> -->
    <!-- <v-card class="rounded-0 d-flex flex-column">
      <v-app-bar
        color="grey darken-4"
        dark
        dense
        absolute
        elevate-on-scroll
        prominent
      >
        <v-app-bar-title>
          <div>Stay Strong</div>
        </v-app-bar-title>

        <v-spacer></v-spacer>
        <v-list>
          <v-container fluid>
            <v-select v-model="value" :items="items" label="Select Item" dense>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ value.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-container>
        </v-list>
        <v-list>
          <v-container fluid>
            <v-select v-model="value" :items="items" label="Select Item" dense>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ value.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-container>
        </v-list>
        <v-list>
          <v-container fluid>
            <v-select v-model="value" :items="items" label="Select Item" dense>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index === 0">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 1" class="grey--text text-caption">
                  (+{{ value.length - 1 }} others)
                </span>
              </template>
            </v-select>
          </v-container>
        </v-list>
        <v-btn
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card> -->
    <!-- <AnonymousUserBar /> -->
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
// import api from ""
export default {
  name: "App",

  components: {
    // DisplayView,
    // AnonymousUserBar,
    AdminUserBar
    // JournalistUserBar
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
