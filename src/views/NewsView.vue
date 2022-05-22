<template>
  <div class="bunker">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>This is an News page</h1>
        <v-btn class="mx-2" fab dark color="indigo" @click.stop="add_dialog = true">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <AddNewsArticles v-model="add_dialog" :newsType="AddNews" />
      </v-container>
    </v-card>
    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="n in news" :key="n.id" cols="4">
            <v-card class="mx-auto">
              <v-card-title>
                <v-icon large left>
                  mdi-news
                </v-icon>
                <span class="text-h6 font-weight-light">{{ n.title }}</span>
              </v-card-title>

              <v-card-text class="text-h5 font-weight-bold">
                {{ n.body }}
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt=""
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                    </v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ n.writer }}</v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-content>
                    <v-list-item-title>{{ n.publicationDate }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-1" v-bind="attrs" v-on="on">
                          mdi-monitor-eye
                        </v-icon>
                      </template>
                      <ReviewAddView :IdNewsRev="n.id"/>
                    </v-dialog>
                    <span class="subheading mr-2"></span>
                    <span class="mr-1"></span>
                    <v-dialog v-model="dialog_review" width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon class="mr-1" v-bind="attrs" v-on="on" @click="getNewsReviews(n.id)">
                          mdi-message-draw
                        </v-icon>
                      </template>
                      <v-card>
                        <v-container>
                          <v-row>
                            <v-col v-for="r in reviews" :key="r.id" cols="9">
                              <v-card class="mx-auto">
                                <v-card-text class="text-h5 font-weight-bold">
                                  {{ r.content }}
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-dialog>
                    <span class="subheading"></span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import api from "../components/backend_api";
import ReviewAddView from "./ReviewAddView.vue";
import AddNewsArticles from "@/components/AddNewsArticles.vue";
// import ArticleAddView from "./ArticleAddView.vue";
export default {
  components: {
    ReviewAddView,
    AddNewsArticles
  },
  mounted() {
    this.initialize();
  },
  watch: {
    add_dialog: {
      handler(newValue, oldValue) {
        if(newValue === false && oldValue === true){
          this.initialize();
        }
      },
      deep: true
    }
  },
  data: () => ({
    AddNews: "Add News",
    add_dialog: false,
    dialog_review: false,
    dialog: false,
    reviews: [],
    news: [],
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
  methods: {
    reloadPage() {
      window.location.reload()
    },
    initialize() {
      api
        .getNews()
        .then(response => {
          console.log(response.data);
          this.news = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    getNewsReviews(id) {
      api
        .getReviews(id)
        .then(response => {
          console.log(response.data);
          this.reviews = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    }
  }
}
</script>