<template>
  <div class="bunker">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>This is an Bunker page</h1>
        <v-btn class="mx-2" fab dark color="indigo"  @click.stop="dialog = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <BunkerAddView v-model="dialog" />
      </v-container>
    </v-card>
    <v-card>
      <v-card-title>
        Bunkers
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="bunkers" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
import api from "../components/backend_api";
import BunkerAddView from "./BunkerAddView.vue";
export default {
  components: {
    BunkerAddView
  },
  watch: {
    dialog: {
      handler(newValue, oldValue) {
        if(newValue === false && oldValue === true){
          this.initialize();
        }
      },
      deep: true
    }
  },
  data: () => ({
    dialog: false,
    breadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/about',
      },
      {
        text: 'Bunker',
        disabled: false,
        href: '/bunker',
      },
    ],
    search: '',
    headers: [
      {
        text: 'Address',
        align: 'start',
        sortable: false,
        value: 'address',
      },
      { text: 'Maxim Capacity', value: 'maximCapacity' },
      { text: 'Current Capacity', value: 'currentCapacity' },
      { text: 'Last Update', value: 'lastUpdate' }
    ],
    bunkers: [],
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      api
        .getBunkers(localStorage.getItem("city"))
        .then(response => {
          console.log(response.data);
          this.bunkers = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });

    }
  }
}
</script>