<template>
  <div class="add-subscribe">
    <v-card>
      <v-container>
        <form @submit.prevent="submit">
          <v-text-field v-model="name" :counter="10" label="Name" required
            @input="$v.name.$touch()" @blur="$v.name.$touch()"></v-text-field>
          <v-text-field v-model="email" :error-messages="emailErrors" label="E-mail" required @input="$v.email.$touch()"
            @blur="$v.email.$touch()"></v-text-field>
          <v-select v-model="country" :items="countries" :error-messages="countryErrors" label="Country" required
            @change="$v.country.$touch()" @blur="$v.country.$touch()" multiple></v-select>
          <v-select v-model="county" :items="counties" :error-messages="countyErrors" label="County" required
            @change="$v.county.$touch()" @blur="$v.county.$touch()" multiple></v-select>
          <v-select v-model="city" :items="cities" :error-messages="cityErrors" label="City" required
            @change="$v.city.$touch()" @blur="$v.city.$touch()" multiple></v-select>
          <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Do you agree to receive news on?"
            required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

          <v-btn class="mr-4" type="submit" @click="submit" @click.native="closeClick">
            submit
          </v-btn>
          <v-btn @click="clear" @click.native="closeClick">
            clear
          </v-btn>
        </form>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

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
    country: null,
    county: null,
    city: null,
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
        text: 'Subscribe',
        disabled: false,
        href: '/subscribe',
      },
    ],
    checkbox: false,
  }),

  computed: {
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

  methods: {
    closeClick () {
        this.$emit('submit', 'test')
    },
    submit() {

      this.$v.$touch()
      this.$emit('submit', 'test')
    },
    clear() {
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