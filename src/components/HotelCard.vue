<template>
  <a :href="link">
    <md-card>
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="16:9">
          <img :src="hotel.image_url" :alt="hotel.title">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">{{hotel.name}}</span>
            <br/>
            <span class="md-subhead">{{hotel.price}}</span>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </a>
</template>
<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.css'
  import MdCardArea from '../../node_modules/vue-material/src/components/mdCard/mdCardArea'
  import MdCardMediaCover from '../../node_modules/vue-material/src/components/mdCard/mdCardMediaCover'
  import MdCardContent from '../../node_modules/vue-material/src/components/mdCard/mdCardContent'

  Vue.use(VueMaterial)

  var generateLink = function (cityId, hotelId, startDate, endDate) {
    return `https://hotel.check24.de/deutschland/hackatum-${cityId}/hackatum-${hotelId}/${startDate}/${endDate}/%5BA%7CA%5D/hotel.html`
  }


  export default {

    components: {
      MdCardContent,
      MdCardMediaCover,
      MdCardArea
    },
    props: ['hotel', 'startDate', 'endDate'],
    name: 'HotelCard',
    data () {
      return {
          link: this.getCheck24Link()
      }
    },
    methods: {
      getCheck24Link: function () {
        return generateLink(this.hotel.city_id, this.hotel.hotel_id, this.startDate, this.endDate)
      }
    }

  }
</script>
<style scoped>
  .md-theme-default.md-card .md-card-media-cover.md-solid .md-card-area {
    background-color: rgba(0, 0, 0, .7) !important;
  }

  .md-card {
    width: 100%;
    max-height: 33vh;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

</style>
