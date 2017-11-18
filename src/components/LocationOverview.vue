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
        locationResults: this.$store.state.locations
      }
    }
  }
</script>
<style scoped>
</style>
