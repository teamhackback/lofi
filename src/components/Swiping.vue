<template>
  <div id="viewport">
    <ul class="stack">
      <li v-for="card in unseenCardsReversed" v-bind:data-id="card.id" :key="card.id" class="in-deck">
        <img v-bind:src="card.src" />
      </li>
    </ul>
    <button @click="pass">Pass</button>
    <button @click="like">Like</button>
    <button @click="back">Back</button>
    <button @click="superLike">SuperLike</button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const Swing = require('swing')
export default {
  name: 'Swiping',
  data () {
    return {
    }
  },

  computed: {
    ...mapGetters([
      'unseenCardsReversed',
      'currentCard'
    ])
  },
  methods: {
    pass () {
      this.$store.commit('pass', this.currentCard)
    },
    like () {
      this.$store.commit('like', this.currentCard)
    },
    superLike () {
      this.$store.commit('superLike', this.currentCard)
    },
    nextImage () {

    },
    back () {
      this.$store.commit('makePreviousCardUnseen')
    },
    update () {
      // Prepare the cards in the stack for iteration.
      const cards = [].slice.call(this.$el.querySelectorAll('ul li'))
      cards.forEach((targetElement) => {
        // Add card element to the Stack.
        const card = this.stack.getCard(targetElement)
        if (card !== null) {
          card.destroy()
        }
        const swingCard = this.stack.createCard(targetElement, false)
        this.swingCards.push(swingCard)
        targetElement.classList = "in-deck";
      })
    },
    destroyAllCards () {
      this.swingCards.forEach(card => card.destroy())
      this.swingCards = []
    }
  },
  mounted () {
    // An instance of the Stack is used to attach event listeners.
    const Direction = Swing.Direction
    this.stack = Swing.Stack({
      allowedDirections: [Direction.LEFT, Direction.RIGHT, Direction.UP],
      minThrowOutDistance: 450,
      maxThrowOutDistance: 500,
      maxRotation: 20
    })
    // Add event listener for when a card is thrown out of the stack.
    this.stack.on('throwout', (e) => {
      // e.throwDirection Direction in which the element has been thrown (Direction.LEFT, Direction.RIGHT).
      // console.log('Throw direction: ' + (event.throwDirection === Direction.LEFT ? 'left' : 'right'))
      e.target.classList.remove('in-deck')
      const card = self.currentCard
      this.stack.getCard(e.target).destroy()
      if (e.throwDirection === Direction.LEFT) {
        this.pass(card)
      } else if (event.throwDirection === Direction.RIGHT) {
        this.like(card)
      } else if (event.throwDirection === Direction.UP) {
        this.superLike(card)
      }
    })
    this.swingCards = []
    this.update()
  },
  updated () {
    console.log("update");
    this.destroyAllCards()
    this.update()
  },
  // ?
  beforeDestroy () {
    this.destroyAllCards()
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
#viewport .stack {
  position: relative;
  width: 300px;
  height: 330px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0;
}
#viewport li {
  width: 300px;
  height: 300px;
  list-style: none;
  position: absolute;
  top: 0; left: 0;
  box-shadow: 0 0 2px rgba(0,0,0,.2), 1px 1px 1px rgba(0,0,0,.2);
  text-align: center;
  font-size: 100px;
  border-radius: 5px;
  border: 3px solid #ECECEC;
  box-sizing: border-box;
  cursor: default;
}

#viewport li {
  display: none;
}
#viewport li.in-deck {
  display: block;
}
#viewport li.in-deck:nth-child(3) {
    top: 2px; transform: translate(2px, 2px) rotate(0.4deg);
}
#viewport li.in-deck:nth-child(2) {
    top: 4px; transform: translate(-4px, -2px) rotate(-1deg);
}

</style>
