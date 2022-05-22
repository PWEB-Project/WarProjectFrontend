<template>
  <div class="bunker">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider=">"
      ></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>This is an Necessity Goods page</h1>
        <v-btn 
        @click.stop="dialog = true"
          class="mx-2"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <NecessityGoodsAddView v-model="dialog" />
      </v-container>
    </v-card>
    
  <v-card>
    <v-card-title>
      Goods
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="goods"
      :search="search"
    ></v-data-table>
  </v-card>

  </div>
</template>

<script>
import api from "../components/backend_api";
import NecessityGoodsAddView from "./NecessityGoodsAddView.vue";
  export default {
    components: {
    NecessityGoodsAddView
},
    created() {
        this.initialize();
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
    methods: {
        initialize() {
            api
                .getGoods(localStorage.getItem("city"))
                .then(response => {
                    console.log(response.data);
                    this.goods = response.data;
                })
                .catch(error => {
                    this.errors.push(error);
                });

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
          text: 'Necessity Goods',
          disabled: false,
          href: '/necessity-goods',
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
            { text: 'Last Update', value: 'lastUpdate' },
            { text: 'Goods Type', value: 'goodsType.goodTypeName' }
        ],
        goods: [],
    }),
  }
</script>