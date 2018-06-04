<template>
  <div>
    <h1>Settings</h1>
    <div class="form">
      <div class="form-group">
        <label for="username">Username</label>
        <input class="form-control" type="text" v-model="username" name="username" id="username">
      </div>
      <div class="form-group">
        <label for="numberOfQuestions">How many questions? (Min 1 and max 20)</label>
        <input class="form-control" type="number" min="1" max="20" v-model="numberOfQuestions">
      </div>
    </div>
    <button class="btn btn-primary" @click="startGame">Begin</button>
    <router-link class="btn" v-bind:to="{name: 'Home'}">Back</router-link>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  created () {
    this.username = this.$store.state.username
  },
  data () {
    return {
      username: '',
      numberOfQuestions: 1
    }
  },
  methods: {
    startGame () {
      this.$store.dispatch('startGame', {
        username: this.username
      })
      this.$store.dispatch('addQuestions', this.numberOfQuestions)
      this.$router.push({name: 'Game'})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('./../scss/Settings.scss');
</style>

