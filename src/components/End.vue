<template>
  <div>
    <h1>Players</h1>
    <ul class="list-group list">
      <li v-for="(leader, index) in leaders" v-bind:key="index" class="list-group-item d-flex justify-content-between align-items-center">
        {{ leader.username }}
         <span class="badge badge-primary badge-pill">{{ leader.correct }}</span>
      </li>
    </ul>
    <div class="btns">
      <router-link class="btn btn-primary" v-bind:to="{name: 'Home'}">Home</router-link>
      <button @click="clearList" class="btn">Clear list</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'End',
  computed: {
    leaders () {
      return this.$store.state.leaders
    }
  },
  methods: {
    clearList () {
      this.$store.dispatch('clearList')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('./../scss/End.scss');

  a,
  button {
    margin-top: 2rem;
  }
</style>
