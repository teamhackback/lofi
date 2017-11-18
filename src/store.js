import Vue from 'vue'
import Vuex from 'vuex'
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
  ]
}
const getters = {
  getCardById: state => id => state.cards.filter(card => card.id === id),
  unseenCards: state => state.cards.filter(card => !card.seen),
  unseenCardsReversed: (state, getters) => getters.unseenCards.slice().reverse(),
  currentCard: (state, getters) => getters.unseenCards[0],
  allCardsProcessed: (state, getters) => getters.unseenCards.length === 0
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
      lastCardPos--
    }
    state.cards[lastCardPos].seen = false
  },
  resetAllCards (state) {
    state.cards.forEach(function (card) { card.seen = false })
  }
}
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
