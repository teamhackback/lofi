import Vue from 'vue'
import Router from 'vue-router'
import StartupPage from '../components/StartupPage.vue'
import Swiping from '../components/Swiping.vue'
import LocationOverview from '../components/LocationOverview.vue'
import HotelOverview from '../components/HotelOverview.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Swiping',
      component: Swiping
    },
    {
      path: '/selection',
      name: 'Swiping',
      component: Swiping
    },
    {
      path: '/locations',
      name: 'LocationOverview',
      component: LocationOverview
    },
    {
      path: '/results',
      name: 'HotelOverview',
      component: HotelOverview
    }
  ]
})
