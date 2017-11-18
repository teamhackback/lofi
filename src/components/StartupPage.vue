<template>
  <div class="hello">
    Hello User
    <br>
    <button @click="start">Start</button>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  methods: {
    start () {
      this.$router.push('selection')
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style scoped>
</style>
