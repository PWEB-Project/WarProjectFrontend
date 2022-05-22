<template>
  <div class="add-bunker">
    <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-container>
        <h1>Add New Bunker</h1>
        <form @submit.prevent="submit">
          <v-select v-model="valueCountry" :items="countries" label="Select Country" dense item-text="name"
                    item-value="iso2" @input="selectCountry">
                  </v-select>
          <v-select v-model="valueCounty" :items="counties" label="Select County" dense item-text="name"
                    item-value="iso2" @input="selectCounty">
                  </v-select>
          <v-select v-model="valueCity" :items="cities" label="Select City" dense item-text="name"
                    item-value="id">
                  </v-select>
          <v-text-field
            v-model="address"
            label="Address"
          ></v-text-field>
          <v-text-field
            v-model="maxCapacity"
            label="Maximum Capacity"
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="currentCapacity"
            label="Current Capacity"
            type="number"
          ></v-text-field>
          <v-menu
          v-model="menuLastUpdate"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
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
          ></v-date-picker>
        </v-menu>
    <v-btn
      class="mr-4"
      type="submit"
      @click.stop="submit"
    >
      Save
    </v-btn>
    <v-btn @click.stop="clear">
      Delete
    </v-btn>
  </form>
      </v-container>
    </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import api from '../components/backend_api'
  export default {
    mixins: [validationMixin],
    props: {
      value: Boolean
    },
    validations: {
      address: { required },
      country: { required },
      county: { required },
      city: { required },
      maxCapacity : { required },
      currentCapacity : { required },
      lastUpdate : { required },
    },

    data: () => ({
      address: "",
      maxCapacity: 100,
      currentCapacity: 0,
      menuLastUpdate: false,
      lastUpdate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      countries: [],
      valueCountry: "",
      counties: [],
      valueCounty: "",
      cities: [],
      valueCity: "",
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/about',
        },
        {
          text: 'Bunker',
          disabled: false,
          href: '/bunker',
        },
        {
          text: 'Add Bunker',
          disabled: false,
          href: '/add-bunker',
        },
      ],
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
    },

    // methods: {
    //   submit () {
    //     this.$v.$touch()
    //   },
    //   clear () {
    //     this.$v.$reset()
    //     this.address = ''
    //     this.country = null
    //     this.county = null
    //     this.city = null
    //     this.maxCapacity = 100
    //     this.currentCapacity = 0
    //     this.menuLastUpdate = false
    //     this.lastUpdate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    //   },
    // },
    mounted(){
    this.initialize();
  },
  methods: {
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
    getCityById(code) {
      return this.cities.filter(
        function (data) { return data.id == code }
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
        .addNewBunker({
          "address": this.address + "," + this.getCityById(this.valueCity)[0].name + ", " + this.valueCountry,
          "maximCapacity": this.maxCapacity, "currentCapacity": this.currentCapacity,
          "lastUpdate": this.lastUpdate, "cityId": this.valueCity
        })
        .then(() => {
          this.dialog = false;
        })
        .catch(error => {
          this.dialog = false;
          console.log(error);
        });
    },
    clear() {
      this.email = ''
      this.country = null
      this.county = null
      this.city = null
      this.checkbox = false
      this.dialog = false;
    },
  },
  }
</script>