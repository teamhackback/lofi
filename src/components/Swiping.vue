<template>
  <div id="viewport">
    <ul class="stack">
      <li v-for="card in unseenCardsReversed" v-bind:data-id="card.id" :key="card.id" class="in-deck">
        <img v-bind:src="card.src" />
      </li>
    </ul>
    <div id="icons">
      <div id="back" @click="back">
        <md-icon>refresh</md-icon>
      </div>
      <div id="pass" @click="pass">
        <md-icon>close</md-icon>
      </div>
      <div id="like" @click="like">
        <md-icon>favorites</md-icon>
      </div>
      <div id="superLike" @click="superLike">
        <md-icon>star</md-icon>
      </div>

      {{ unseenCardsReversed.length }}
    </div>
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
      'allCardsProcessed',
      'currentCard'
    ])
  },
  methods: {
    pass () {
      this.$store.commit('pass', this.currentCard)
      this.checkEnd()
    },
    like () {
      this.$store.commit('like', this.currentCard)
      this.checkEnd()
    },
    superLike () {
      this.$store.commit('superLike', this.currentCard)
      this.checkEnd()
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
        targetElement.classList = 'in-deck'
      })
    },
    destroyAllCards () {
      this.swingCards.forEach(card => card.destroy())
      this.swingCards = []
    },
    checkEnd() {
      if (this.allCardsProcessed) {
        this.$router.push('locations')
      }
    }
  },
  mounted () {
    // An instance of the Stack is used to attach event listeners.
    this.$store.commit('resetAllCards');
    const Direction = Swing.Direction
    this.stack = Swing.Stack({
      allowedDirections: [Direction.LEFT, Direction.RIGHT, Direction.UP],
      minThrowOutDistance: 950,
      maxThrowOutDistance: 1000,
      maxRotation: 20,
      throwOutConfidence: (xOffset, yOffset, element) => {
        const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
        const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

        const confidence = Math.max(xConfidence, yConfidence);
        console.log(confidence);
        if (confidence > 0.2)
          return 1
      }
    })
    // Add event listener for when a card is thrown out of the stack.
    this.stack.on('throwout', (e) => {
      // e.throwDirection Direction in which the element has been thrown (Direction.LEFT, Direction.RIGHT).
      // console.log('Throw direction: ' + (event.throwDirection === Direction.LEFT ? 'left' : 'right'))
      e.target.classList.remove('in-deck')
      const card = self.currentCard
      this.stack.getCard(e.target).destroy()
      e.target.classList = 'in-deck2'
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
    //this.destroyAllCards()
    //this.update()
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
#icons {
  margin: 0 auto;
}
#like {
  color: #4dcc92;
}
#pass {
  color: #fc696c;
}
#superLike {
  color: #2db2c8;
}
#back {
  color: #d1d1d1;
}
.md-icon {
}
#back .md-icon, #superLike .md-icon {
  width: 30px;
  min-width: 30px;
  height: 30px;
  font-size: 30px!important;
  display: inline-block;
}
#pass .md-icon, #like .md-icon{
  width: 50px;
  min-width: 50px;
  height: 50px;
  font-size: 50px!important;
}
#icons #back, #icons #superLike{
  margin: -2%;
}
#icons #pass, #icons #like{
}
#icons div {
  display: inline-flex;
  margin: -1%;
  border-radius: 50%;
  border: 8px solid #e7e7e7;
  padding: 10px;
  vertical-align: top;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
}
</style>
