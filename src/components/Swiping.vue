<template>
  <div id="viewport">
    <ul class="stack">
      <li v-for="card in cards">
        <img v-bind:src="card.src" />
      </li>
    </ul>
  </div>
</template>
<script>
import store from '../store'
const Swing = require('swing')
export default {
  name: 'Swiping',
  data () {
    return {
    }
  },
  computed: {
    cards () {
      return this.$store.state.cards
    }
  },
  methods: {
    pass () {

    },
    like () {

    },
    superLike () {

    },
    nextImage () {

    }
  },
  // mounted?
  mounted () {
    // Prepare the cards in the stack for iteration.
    const cards = [].slice.call(this.$el.querySelectorAll('ul li'))

    // An instance of the Stack is used to attach event listeners.
    const Direction = Swing.Direction
    const stack = Swing.Stack({
      allowedDirections: [Direction.LEFT, Direction.RIGHT, Direction.UP],
      minThrowOutDistance: 450,
      maxThrowOutDistance: 500,
      maxRotation: 20
    })

    cards.forEach((targetElement) => {
      // Add card element to the Stack.
      stack.createCard(targetElement)
    })

    // Add event listener for when a card is thrown out of the stack.
    stack.on('throwout', (e) => {
      // e.throwDirection Direction in which the element has been thrown (Direction.LEFT, Direction.RIGHT).
      // console.log('Throw direction: ' + (event.throwDirection === Direction.LEFT ? 'left' : 'right'))
      e.target.classList.add('thrown-out')
    })
  },
  // ?
  beforeDestroy () {

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
  width: 300px;
  height: 300px;
  text-align: center;
  margin: 0 auto;
  padding: 0;
}
#viewport li {
  width: 300px;
  height: 300px;
  list-style: none;
  position: absolute;
  box-shadow: 0 0 2px rgba(0,0,0,.2), 1px 1px 1px rgba(0,0,0,.2);
  line-height: 300px;
  text-align: center;
  font-size: 100px;
  border-radius: 5px;
  border: 3px solid #ECECEC;
  box-sizing: border-box;
  cursor: default;
}

#viewport li.in-deck:nth-child(3) {
  top: 2px; transform: translate(2px, 2px) rotate(0.4deg);
}

#viewport li.in-deck:nth-child(2) {
  top: 4px; transform: translate(-4px, -2px) rotate(-1deg);
}
.thrown-out {
  display: none;
}
</style>
