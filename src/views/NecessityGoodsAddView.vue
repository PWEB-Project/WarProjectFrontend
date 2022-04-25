<template>
  <div class="add-bunker">
    <v-card class="d-flex flex-row-reverse" flat color="transparent">
      <v-breadcrumbs
        :items="breadcrumbs"
        divider=">"
      ></v-breadcrumbs>
    </v-card>
    <v-card>
      <v-container>
        <h1>Add Necessity Goods</h1>
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
            v-model="address"
            :error-messages="addressErrors"
            label="Address"
            required
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
          ></v-text-field>
          <v-select
            v-model="goodsType"
            :items="goodsTypes"
            :error-messages="goodsTypeErrors"
            label="Goods Type"
            required
            @change="$v.goodsType.$touch()"
            @blur="$v.goodsType.$touch()"
          ></v-select>
          <v-text-field
            v-model="maxCapacity"
            :error-messages="maxCapacityErrors"
            label="Maximum Capacity"
            required
            @input="$v.maxCapacity.$touch()"
            @blur="$v.maxCapacity.$touch()"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="currentCapacity"
            :error-messages="currentCapacityErrors"
            label="Current Capacity"
            required
            @input="$v.currentCapacity.$touch()"
            @blur="$v.currentCapacity.$touch()"
            type="number"
          ></v-text-field>
          <v-menu
          v-model="menuLastUpdate"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :error-messages="lastUpdateErrors"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="lastUpdate"
              label="Last Update"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="lastUpdate"
            @input="menuLastUpdate = false;"  
            @change="$v.lastUpdate.$touch()"
            @blur="$v.lastUpdate.$touch()"          
          ></v-date-picker>
        </v-menu>
    <v-btn
      class="mr-4"
      type="submit"
      @click="submit"
      :disabled="invalid"
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
      address: { required },
      country: { required },
      county: { required },
      city: { required },
      maxCapacity : { required },
      currentCapacity : { required },
      lastUpdate : { required },
      goodsType: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      address: '',
      country: null,
      county: null,
      city: null,
      goodsType: null,
      maxCapacity: 100,
      currentCapacity: 0,
      menuLastUpdate: false,
      lastUpdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      goodsTypes: [
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
          text: 'Necessity Goods',
          disabled: false,
          href: '/necessity-goods',
        },
        {
          text: 'Add Necessity Goods',
          disabled: false,
          href: '/add-necessity-goods',
        },
      ],
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
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
      addressErrors () {
        const errors = []
        if (!this.$v.address.$dirty) return errors
        !this.$v.address.required && errors.push('Address is required')
        return errors
      },
      maxCapacityErrors () {
        const errors = []
        if (!this.$v.maxCapacity.$dirty) return errors
        !this.$v.maxCapacity.required && errors.push('Maximum Capacity is required')
        return errors
      },
      currentCapacityErrors () {
        const errors = []
        if (!this.$v.currentCapacity.$dirty) return errors
        !this.$v.currentCapacity.required && errors.push('Current Capacity is required')
        return errors
      },
      lastUpdateErrors () {
        const errors = []
        if (!this.$v.lastUpdate.$dirty) return errors
        !this.$v.lastUpdate.required && errors.push('Last Update is required')
        return errors
      },
      goodsTypeErrors () {
        const errors = []
        if (!this.$v.goodsType.$dirty) return errors
        !this.$v.goodsType.required && errors.push('Goods Type is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.address = ''
        this.country = null
        this.county = null
        this.city = null
        this.maxCapacity = 100
        this.currentCapacity = 0
        this.checkbox = false
        this.menuLastUpdate = false
        this.lastUpdate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        this.goodsTypes = null
      },
    },
  }
</script>