<template>
  <div class="add-news">
    <v-card>
      <v-container>
        <h1>Add Review</h1>
        <form @submit.prevent="submit">
          <v-menu v-model="menuPublicationDate" :nudge-right="40" transition="scale-transition" offset-y
            min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="publicationDate" label="Publication Date" prepend-icon="mdi-calendar" readonly
                v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="publicationDate" @input="menuPublicationDate = false;"
              @change="$v.publicationDate.$touch()" @blur="$v.publicationDate.$touch()"></v-date-picker>
          </v-menu>
          <v-textarea v-model="body" label="Content News"></v-textarea>
          <v-btn color="#7B61FF" class="white--text" type="submit" @click="submit" @click.native="closeClick">
            submit
          </v-btn>
          <v-btn color="#7B61FF" class="white--text" @click="clear" @click.native="closeClick">
            clear
          </v-btn>
        </form>
      </v-container>
    </v-card>
  </div>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import api from '../components/backend_api'
export default {
  mixins: [validationMixin],

  validations: {
    body: { required },
    reviewType: { required },
    publicationDate: { required },
  },
  props: {
    newsId: Number
  },
  data: () => ({
    body: '',
    menuPublicationDate: false,
    publicationDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    breadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/about',
      },
      {
        text: 'Review',
        disabled: false,
        href: '/review',
      },
      {
        text: 'Add Review',
        disabled: false,
        href: '/add-review',
      },
    ],
  }),

  computed: {
    IdNewsRev: {
      get() {
        return this.newsId
      },
      set(newsId) {
        this.$emit('input', newsId)
      }
    },
    reviewTypeErrors() {
      const errors = []
      if (!this.$v.reviewType.$dirty) return errors
      !this.$v.reviewType.required && errors.push('Country is required')
      return errors
    },
    publicationDateErrors() {
      const errors = []
      if (!this.$v.publicationDate.$dirty) return errors
      !this.$v.publicationDate.required && errors.push('Last Update is required')
      return errors
    },
    bodyErrors() {
      const errors = []
      if (!this.$v.body.$dirty) return errors
      !this.$v.body.required && errors.push('Title is required')
      return errors
    },
  },

  methods: {
    closeClick() {
      this.$emit('submit', 'test')
    },
    submit() {
      api
        .addNewReview({
          "publicationDate": (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          "content": this.body,
          "whom": { "id": this.newsId }
        })
        .then(() => {
          this.closeClick();
        })
        .catch(error => {
          console.log(error);
          this.closeClick();
        });
    },
    clear() {
      this.$v.$reset()
      this.reviewType = null
      this.menuPublicationDate = false
      this.publicationDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
      this.body = ''
    },
  },
}
</script>