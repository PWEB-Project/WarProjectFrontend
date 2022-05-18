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
        <h1>This is an Article page</h1>
        <v-btn link to="/add-article"
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
          text: 'News',
          disabled: false,
          href: '/news',
        },
      ],
    }),
  }
</script>