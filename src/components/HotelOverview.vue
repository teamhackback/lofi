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
        v-for="hotel in hotelResults"
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

  Vue.use(Vuetify)

  var generateLink = function (cityId, hotelId, startDate, endDate) {
    return ''
  }


  export default {
    components: {HotelCard},
    name: 'HotelOverview',
    baseLink: `https://hotel.check24.de/deutschland/a-37446/a-9523103/2017-12-18/2017-12-20/%5BA%7CA%5D/hotel.html`,
    data () {
      return {
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        numPersons: 2,
        modal: false,
        hotelResults: [{
          title: 'Marriot Munich',
          text: 'Marriot Description',
          picture: './static/sf.jpg',
          link2: generateLink('a', 'b', 'c', 'd'),
          link: 'https://hotel.check24.de/Deutschland/M%C3%BCnchen-37463/Hilton%20Munich%20Park-9055430/2017-11-18/2017-11-19/%5BA%7CA%5D/hotel.html?reference_distance_max=20&map=no&sort_by=relevance_desc&hotel_name_filter=no'
        }, {
          title: 'Hilton Munich',
          text: 'Hilton Description',
          picture: './static/sf.jpg',
          link: 'https://hotel.check24.de/Deutschland/M%C3%BCnchen-37463/Pullman%20Munich-9458279/2017-11-18/2017-11-19/%5BA%7CA%5D/hotel.html?reference_distance_max=20&map=no&sort_by=relevance_desc&hotel_name_filter=no'
        }, {
          title: '4 Seasons',
          text: '4 Seasons description',
          picture: './static/sf.jpg',
          link: 'https://hotel.check24.de/Deutschland/M%C3%BCnchen-37463/Hotel%20Erzgiesserei%20Europe-9530088/2017-11-18/2017-11-19/%5BA%7CA%5D/hotel.html?reference_distance_max=20&map=no&sort_by=relevance_desc&hotel_name_filter=no'
        }]
      }
    },
  }
</script>
<style scoped>
</style>
