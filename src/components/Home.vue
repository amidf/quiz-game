<template>
  <div>
    <h1>Quiz game</h1>
    <p>Simple application for fun.</p>
    <router-link class="btn btn-primary" v-bind:to="{name: 'Settings'}">Play</router-link>
    <router-link class="btn" v-bind:to="{name: 'End'}">Leaders</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.$store.commit('resetGame')
  }
}
</script>

<style lang="scss" scoped>
  @import url('./../scss/Home.scss');
</style>
