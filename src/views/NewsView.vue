<template>
  <div class="news">
    <v-row dense align-content="center">
      <v-col cols="3" md="4" v-for="item in items" :key="item.id">
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-card-title>{{formatPlatformName(item.permalink)}}</v-card-title>

        <v-img
          height="250"
          :src="item.picture"
        ></v-img>

        

        <v-card-text>
          <v-row align="center" class="mx-0"> </v-row>

          <div class="my-4 subtitle-1">
           Caption: {{item.caption}}
          </div>

          <div></div>
          <v-row align="center" class="mx-0"> </v-row>

          <div class="my-4 subtitle-1">
            Engagement: {{item.engagement}}
          </div>

          <div></div>
          <v-row align="center" class="mx-0"> </v-row>

          <div class="my-4 subtitle-1">
            Link: {{item.permalink}}
          </div>

          <div></div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>
      </v-card>

      </v-col>
    </v-row>
  </div>
</template>
