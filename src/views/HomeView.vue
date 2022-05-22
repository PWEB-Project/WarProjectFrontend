<template>
    <div class="about">
        <v-card class="d-flex flex-row-reverse" flat color="transparent">
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
        </v-card>
        <v-card>
            <v-container>
                <GoogleMap />
            </v-container>
        </v-card>
        <v-card>
            <v-card-title>
                Bunkers
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="bunkers" :search="search"></v-data-table>
        </v-card>
        <v-card>
            <v-card-title>
                Goods
                <v-spacer></v-spacer>
                <v-text-field v-model="search_goods" append-icon="mdi-magnify" label="Search" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers_goods" :items="goods" :search="search"></v-data-table>
        </v-card>
    </div>
</template>

<script>
import api from "../components/backend_api";
import GoogleMap from '../components/GoogleMap.vue'
export default {
    components: {
        GoogleMap
    },
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
        search: '',
        search_goods: '',
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
        headers_goods: [
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
        goods: [],
        items: [
            {
                text: 'Dashboard',
                disabled: false,
                href: 'breadcrumbs_dashboard',
            },
            {
                text: 'Link 1',
                disabled: false,
                href: 'breadcrumbs_link_1',
            },
            {
                text: 'Link 2',
                disabled: true,
                href: 'breadcrumbs_link_2',
            },
        ],
    }),
}
</script>

