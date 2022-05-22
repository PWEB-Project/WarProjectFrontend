<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-card>
            <v-card-title class="text-h5">
                {{newsType}}
            </v-card-title>

            <v-card-text>
                <v-text-field label="Title" v-model="title"></v-text-field>
                <v-text-field label="Author" v-model="author"></v-text-field>
                <v-select v-model="valueCountry" :items="countries" label="Select Country" dense item-text="name"
                    item-value="iso2" @input="selectCountry">
                </v-select>
                <v-select v-model="valueCounty" :items="counties" label="Select County" dense item-text="name"
                    item-value="iso2"> </v-select>
                <v-textarea v-model="body" label="Content News"></v-textarea>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click.stop="dialog = false">
                    Disagree
                </v-btn>

                <v-btn color="green darken-1" text @click.stop="submit">
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import api from '../components/backend_api'
export default {

    data: () => ({
        title: "",
        author: "",
        body: "",
        countries: [],
        valueCountry: "",
        counties: [],
        valueCounty: "",
    }),
    props: {
        value: Boolean,
        newsType: String
    },
    computed: {
        dialog: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        typeNews: {
            get() {
                return this.newsType
            },
            set(newsType) {
                this.$emit('input', newsType)
            }
        }
    },
    mounted() {
        console.log(this.newsType);
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
        submit() {
            api
                .addNewNews({
                    "publicationDate": (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10), "body": this.body,
                    "title": this.title, "countyId": this.getCountryByCode(this.valueCounty)[0].id, "writer": this.author, 
                    "newsType": { "id": ((this.newsType === "Add News")? 1: 2) }
                })
                .then(() => {
                    this.dialog = false;
                })
                .catch(error => {
                    this.errors.push(error);
                    this.dialog = false;
                });
        },
    }
}
</script>