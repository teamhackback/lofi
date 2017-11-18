<template>
  <div>
    <md-card>
      <md-card-media-cover md-solid>
        <md-card-media md-ratio="16:9">
          <img :src="location.picture" :alt="location.title">
        </md-card-media>

        <md-card-area>
          <md-card-header>
            <span class="md-title">{{location.title}}</span>
            <br/>
            <span class="md-subhead">{{location.text}}</span>
          </md-card-header>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
  </div>
</template>
<script>
  import Vue from 'vue'
  import VueMaterial from 'vue-material'
  import 'vue-material/dist/vue-material.css'
  import MdCardContent from '../../node_modules/vue-material/src/components/mdCard/mdCardContent'
  import MdCardMediaCover from "../../node_modules/vue-material/src/components/mdCard/mdCardMediaCover"
  import MdCardArea from "../../node_modules/vue-material/src/components/mdCard/mdCardArea"

  Vue.use(VueMaterial)

  export default {
    components: {
      MdCardArea,
      MdCardMediaCover,
      MdCardContent
    },
    props: ['location'],
    name: 'LocationCard',
    data () {
      return {}
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
