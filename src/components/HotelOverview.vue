<template>
  <div>
    <v-container>
      <v-flex>
        <label>Arrival Date</label>
        <v-dialog
          persistent
          v-model="modal"
          lazy
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="startDate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="startDate" scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-dialog>

      </v-flex>
      <v-flex>
        <label>Departure Date</label>
        <v-dialog
          persistent
          v-model="modal"
          lazy
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="endDate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="endDate" scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-dialog>

      </v-flex>
      <v-flex>
        <label>Persons</label>
        <v-text-field
          name="personInput"
          label="Number of Persons"
          type="number"
          v-model="numPersons"
        >
        </v-text-field>
      </v-flex>
      <hotel-card
        v-for="hotel in getHotels"
        v-bind:hotel="hotel"
        v-bind:key="hotel.id">
      </hotel-card>
    </v-container>
  </div>
</template>
<script>
  import Vue from 'vue'
  import 'vue-material/dist/vue-material.css'
  import Vuetify from 'vuetify'
  import HotelCard from './HotelCard'
  import {mapActions, mapGetters} from "vuex";

  Vue.use(Vuetify)
  var moment = require('moment');

  var generateLink = function (cityId, hotelId, startDate, endDate) {
    return `https://hotel.check24.de/deutschland/hackatum-${cityId}/hackatum-${hotelId}/${startDate}/${endDate}/%5BA%7CA%5D/hotel.html`
  }


  export default {

    computed: {
      ...mapGetters([
        'getHotels'
      ])
    },
    components: {HotelCard},
    name: 'HotelOverview',
    created() {
      this.updateHotelResults();
    },
    methods: {
      updateHotelResults: function () {
        console.log("updateHotelResults called")
        let latitude = this.$store.state.selectedLocation.latitude;
        let longitude = this.$store.state.selectedLocation.longitude;
        console.log(this)
        this.$store.dispatch('postCheck24Api', {latitude, longitude, startDate: this.startDate, endDate: this.endDate})
      }
    },
    data () {
      return {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
        numPersons: 2,
        modal: false,
      }
    },
  }
</script>
<style scoped>
</style>
