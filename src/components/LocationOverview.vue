<template>
  <div id="locations">
    <location-card
      v-for="location in locationResults"
      v-bind:location="location"
      v-bind:key="location.id"
    ></location-card>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.css'
  import LocationCard from './LocationCard'

  Vue.use(VueMaterial)

  export default {

    components: {LocationCard},
    name: 'HelloWorld',
    data () {
      return {
        // TODO receive results from swiping instead of hardcoding

        locationResults: [{
          title: 'San Francisco',
          text: 'West coast mah dude',
          picture: './static/sf.jpg'
        }, {
          title: 'New York',
          text: 'East coast represent',
          picture: './static/ny.jpg'
        }, {
          title: 'Los Angeles',
          text: 'City of Angels',
          picture: './static/la.jpg'
        }]
      }
    }
  }
</script>
<style scoped>
</style>
