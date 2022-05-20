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
        <v-btn link to="/add-necessity-goods"
          class="mx-2"
          fab
          dark
          color="indigo"
        >
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-container>
    </v-card>
    
  <v-card>
    <v-card-title>
      Nutrition
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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>

  </div>
</template>

<script>
  export default {
    data: () => ({
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
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
        ],
    }),
  }
</script>