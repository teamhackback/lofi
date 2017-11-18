import Vue from 'vue'
import Vuex from 'vuex'

var moment = require('moment');

Vue.use(Vuex)
const state = {
  cards: [
    {
      id: 0,
      src: '/static/categories/beach.jpg',
      seen: false
    },
    {
      id: 1,
      src: '/static/categories/snow.jpg',
      seen: false
    },
    {
      id: 2,
      src: '/static/categories/culture.jpg',
      seen: false
    },
    {
      id: 3,
      src: '/static/categories/urban.jpg',
      seen: false
    }
  ],
  locations: [
    {
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
    }
  ],
  selectedLocation: {
    title: 'Los Angeles',
    text: 'City of Angels',
    latitude: 34.052314,
    longitude: -118.4679994,
    picture: './static/la.jpg'
  },
  hotels: []
}
const getters = {
  getCardById: state => id => state.cards.filter(card => card.id === id),
  unseenCards: state => state.cards.filter(card => !card.seen),
  unseenCardsReversed: (state, getters) => getters.unseenCards.slice().reverse(),
  currentCard: (state, getters) => getters.unseenCards[0],
  getHotels: state => state.hotels
}
const mutations = {
  pass (state, card) {
    card.seen = true
    card.rating = 'pass'
  },
  like (state, card) {
    card.seen = true
    card.rating = 'like'
  },
  superLike (state, card) {
    card.seen = true
    card.rating = 'superlike'
  },
  makePreviousCardUnseen (state) {
    let lastCardPos = 0
    for (; lastCardPos < state.cards.length; lastCardPos++) {
      if (state.cards[lastCardPos].seen === false) {
        break
      }
    }
    if (lastCardPos > 0) {
      lastCardPos--;
    }
    state.cards[lastCardPos].seen = false
  },
  updateHotels(state, hotels){
    console.log("called updateHotels with ", hotels)
    state.hotels = hotels
  }
}

const actions = {
  increment: ({commit}) => commit('increment'),
  decrement: ({commit}) => commit('decrement'),
  incrementIfOdd ({commit, state}) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({commit}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  },
  async postCheck24Api ({commit, state}, {latitude, longitude, startDate, endDate}) {
    console.log("check24api called")
    let url = `http://cors-anywhere.herokuapp.com/https://api.hotel.check24.de/hackatum/hotels/searches.json?latitude=${latitude}&longitude=${longitude}&radius=10&arrival_date=${startDate}&departure_date=${endDate}&room_configuration=%5BA%5D`;

    try {
      const postData = await fetch(url, {method: 'post'})
      const postBody = await postData.json()
      let getUrl = `http://cors-anywhere.herokuapp.com/https://api.hotel.check24.de/hackatum/hotels/searches/${postBody.search.id}/results.json`
      const getData = await fetch(getUrl)
      const getBody = await getData.json()
      console.log("getBody check24 api", getBody)
      let hotels = [getBody.search.results[0], getBody.search.results[1], getBody.search.results[2]]
      commit('updateHotels', hotels)
    } catch (error) {
      console.log("error while getting hotels from check24 api: ", error)
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
