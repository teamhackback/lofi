import Vue from 'vue'
import Router from 'vue-router'
import StartupPage from '@/components/HelloWorld'
import Swiping from '@/components/Swiping'
import LocationOverview from '@/components/LocationOverview'
import HotelOverview from '@/components/HotelOverview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartupPage',
      component: StartupPage
    },
    {
      path: '/selection',
      name: 'Swiping',
      component: Swiping
    },
    {
      path: '/locatios',
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
