<template>
  <div class="about">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs
        :items="items"
        divider=">"
      ></v-breadcrumbs>
    </v-card>
    <v-card>
        <v-container>
          <div>
              <h1> HElllllllllllllllllllllllllllllllllllllllllllllllo </h1>
              <h1> HElllllllllllllllllllllllllllllllllllllllllllllllo </h1>
              <h1> HElllllllllllllllllllllllllllllllllllllllllllllllo </h1>
              <h1> HElllllllllllllllllllllllllllllllllllllllllllllllo </h1>
          </div>
        </v-container>
  </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
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

