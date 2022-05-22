<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-container>
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" label="Name"></v-text-field>
          <v-text-field v-model="email" label="E-mail"></v-text-field>
          <v-select v-model="valueCountry" :items="countries" label="Select Country" dense item-text="name"
            item-value="iso2" @input="selectCountry">
          </v-select>
          <v-select v-model="valueCounty" :items="counties" label="Select County" dense item-text="name"
            item-value="iso2"> </v-select>
          <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Do you agree to receive news on?"
            required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

          <v-btn color="#7B61FF" class="white--text" type="submit" @click.stop="submit">
            Save
          </v-btn>
          <v-btn color="#7B61FF" class="white--text" @click.stop="dialog = false" @click="clear">
            Cancel
          </v-btn>
        </form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import api from '../components/backend_api'
export default {
  mixins: [validationMixin],
  props: {
    value: Boolean
  },
  validations: {
    email: { required, email },
    country: { required },
    county: { required },
    city: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    name: '',
    email: '',
    countries: [],
    valueCountry: "",
    counties: [],
    valueCounty: "",
    breadcrumbs: [
      {
        text: 'Dashboard',
        disabled: false,
        href: '/about',
      },
      {
        text: 'Subscribe',
        disabled: false,
        href: '/subscribe',
      },
    ],
    checkbox: false,
  }),

  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    countryErrors() {
      const errors = []
      if (!this.$v.country.$dirty) return errors
      !this.$v.country.required && errors.push('Country is required')
      return errors
    },
    countyErrors() {
      const errors = []
      if (!this.$v.county.$dirty) return errors
      !this.$v.county.required && errors.push('County is required')
      return errors
    },
    cityErrors() {
      const errors = []
      if (!this.$v.city.$dirty) return errors
      !this.$v.city.required && errors.push('City is required')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
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
        function (data) { return data.iso2 == code }
      );
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
    closeClick() {
      this.dialog = false;
    },
    submit() {
      api
        .addNewSubscriber({
          "email": this.email,  "countyId": this.getCountryByCode(this.valueCounty)[0].id, "writer": this.author})
        .then(() => {
          console.log(this.dialog);
          this.dialog = false;
        })
        .catch(error => {
          this.dialog = false;
          console.log(error);
        });
    },
    clear() {
      this.dialog = false;
      this.$v.$reset()
      this.email = ''
      this.country = null
      this.county = null
      this.city = null
      this.checkbox = false
      this.$emit('submit', 'test')
    },
  },
}
</script>