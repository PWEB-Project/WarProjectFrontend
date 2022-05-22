<template>
  <div>
    <div>
    </div>
    <br>
    <GmapMap :center='center' :zoom='12' style='width:100%;  height: 400px;'>
      <GmapMarker v-for="(gmap, i) in markers" :key="i" :position="gmap" @click="center = gmap"
      :icon = "{ url: require('../assets/ic_aegean.png')}" />
      <GmapMarker v-for="(gmap, j) in markers_goods" :key="'A'+ j" :position="gmap" @click="center = gmap"
      :icon = "{ url: require('../assets/ic_terminal.png')}" />
    </GmapMap>
  </div>
</template>

<script>
import axios from 'axios';
import api from "../components/backend_api"
export default {
  name: 'GoogleMap',
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 },
      currentPlace: null,
      markers: [],
      places: [],
      markers_goods: [],

    }
  },
  mounted() {
    this.geolocate();
    this.getBunkersAddress();
  },
  methods: {
    getBunkersAddress(){
      api.getBunkers(localStorage.getItem("city"))
      .then(response => {
          response.data.forEach(element => {
            this.getLatLngFrom(element.address, 'bunker');
          });
        })
        .catch(error => {
          this.errors.push(error);
        });
      api.getGoods(localStorage.getItem("city"))
      .then(response => {
          response.data.forEach(element => {
            this.getLatLngFrom(element.address, 'goods');
          });
        })
        .catch(error => {
          this.errors.push(error);
        });
      
    },
    async getLatLngFrom(address, arr) {
      try {
        var {
          data
        } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          address + 
          "&key=AIzaSyA4D5R8vhfiv7Cle8bnk4cvi2gCboK8OIM"
        );
        if (data.error_message) {
          console.log(data.error_message)
        } else {
          if(arr === 'bunker')
            this.markers.push({lat: data.results[0].geometry.location.lat,
                              lng: data.results[0].geometry.location.lng})
          else {
            this.markers_goods.push({lat: data.results[0].geometry.location.lat,
                              lng: data.results[0].geometry.location.lng})
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push(marker);
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.markers.push(this.center);
      });
    }
  },
};
</script>