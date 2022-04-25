<template>
  <div class="add-article">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider=">"
      ></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>Add Article</h1>
        <form @submit.prevent="submit">
          <v-select
            v-model="country"
            :items="countries"
            :error-messages="countryErrors"
            label="Country"
            required
            @change="$v.country.$touch()"
            @blur="$v.country.$touch()"
            multiple
          ></v-select>
          <v-select
            v-model="county"
            :items="counties"
            :error-messages="countyErrors"
            label="County"
            required
            @change="$v.county.$touch()"
            @blur="$v.county.$touch()"
            multiple
          ></v-select>
          <v-select
            v-model="city"
            :items="cities"
            :error-messages="cityErrors"
            label="City"
            required
            @change="$v.city.$touch()"
            @blur="$v.city.$touch()"
            multiple
          ></v-select>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
            @input="$v.title.$touch()"
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="fileLink"
            label="File Link"
            required
            @input="$v.fileLink.$touch()"
            @blur="$v.fileLink.$touch()"
          ></v-text-field>
          <v-menu
          v-model="menuPublicationDate"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :error-messages="publicationDateErrors"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="publicationDate"
              label="Publication Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="publicationDate"
            @input="menuPublicationDate = false;"  
            @change="$v.publicationDate.$touch()"
            @blur="$v.publicationDate.$touch()"          
          ></v-date-picker>
        </v-menu>
        <v-textarea
          v-model="body"
          label="Content News"
          :error-messages="bodyErrors"
          required
          @change="$v.body.$touch()"
          @blur="$v.body.$touch()" 
        ></v-textarea>
    <v-btn
      class="mr-4"
      type="submit"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
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

  export default {
    mixins: [validationMixin],

    validations: {
      title: { required },
      body: { required },
      country: { required },
      county: { required },
      city: { required }, 
      publicationDate : { required },
    },

    data: () => ({
      title: '',
      fileLink: '',
      body: '',
      country: null,
      county: null,
      city: null,
      menuPublicationDate: false,
      publicationDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      countries: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      counties: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      cities: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/about',
        },
        {
          text: 'Article',
          disabled: false,
          href: '/article',
        },
        {
          text: 'Add Article',
          disabled: false,
          href: '/add-article',
        },
      ],
    }),

    computed: {
      countryErrors () {
        const errors = []
        if (!this.$v.country.$dirty) return errors
        !this.$v.country.required && errors.push('Country is required')
        return errors
      },
      countyErrors () {
        const errors = []
        if (!this.$v.county.$dirty) return errors
        !this.$v.county.required && errors.push('County is required')
        return errors
      },
      cityErrors () {
        const errors = []
        if (!this.$v.city.$dirty) return errors
        !this.$v.city.required && errors.push('City is required')
        return errors
      },
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title is required')
        return errors
      },
      publicationDateErrors () {
        const errors = []
        if (!this.$v.publicationDate.$dirty) return errors
        !this.$v.publicationDate.required && errors.push('Last Update is required')
        return errors
      },
      bodyErrors () {
        const errors = []
        if (!this.$v.body.$dirty) return errors
        !this.$v.body.required && errors.push('Title is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.title = ''
        this.country = null
        this.county = null
        this.city = null  
        this.menuPublicationDate = false
        this.publicationDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        this.body = ''
        this.fileLink = ''
      },
    },
  }
</script>