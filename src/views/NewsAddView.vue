<template>
  <div class="add-news">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider=">"
      ></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>Add News</h1>
        <form @submit="submit">
          <!-- <v-select
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
          ></v-select> -->
          

          <v-list>
                <v-container fluid>
                  <v-select v-model="valueCountry" :items="countries" label="Select Country" dense item-text="name"
                    item-value="iso2" @input="selectCountry">
                  </v-select>
                </v-container>
              </v-list>
              <v-list>
                <v-container fluid>
                  <v-select v-model="valueCounty" :items="counties" label="Select County" dense item-text="name"
                    item-value="iso2" @input="selectCounty">
                  </v-select>
                </v-container>
              </v-list>
              <v-list>
                <v-container fluid>
                  <v-select v-model="valueCity" :items="cities" label="Select City" dense item-text="name"
                    item-value="id">
                  </v-select>
                </v-container>
              </v-list>
          <v-text-field
            v-model="title"
            :error-messages="titleErrors"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="fileLink"
            label="File Link"
            required
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
          ></v-date-picker>
        </v-menu>
        <v-textarea
          v-model="body"
          label="Content News"
          :error-messages="bodyErrors"
          required
        ></v-textarea>
    <v-btn
      color="#7B61FF" class="white--text"
      type="submit"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn color="#7B61FF" class="white--text" @click="clear">
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
      publicationDate: "",
      countries: [],
    valueCountry: "",
    counties: [],
    valueCounty: "",
    cities: [],
    valueCity: "",
    dialogLocation: false,
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
        {
          text: 'Add News',
          disabled: false,
          href: '/add-news',
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
    mounted(){
      this.initialize();
    },
    methods: {
      selectCountry() {
      api
        .getCounties(this.valueCountry)
        .then(response => {
          console.log(response.data);
          this.counties = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    getCountryByCode(code) {
      return this.counties.filter(
          function(data){ return data.iso2 == code }
      );
    },
    selectCounty() {
      api
        .getCity(this.valueCountry, this.valueCounty)
        .then(response => {
          console.log(response.data);
          this.cities = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });
    },
    initialize() {
      api
        .getCountries()
        .then(response => {
          console.log(response.data);
          this.countries = response.data;
        })
        .catch(error => {
          this.errors.push(error);
        });

    },
      submit () {
        api
        .addNewNews({"publicationDate": this.publicationDate, "body": this.body, 
        "title": this.title, "countyId": this.getCountryByCode(this.valueCounty)[0].id})
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          this.errors.push(error);
        });
      },
      clear () {
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