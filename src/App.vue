<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="wrapper col-md-8 offset-md-2">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.commit('refreshLeaders')
  }
}
</script>

<style lang="scss">
  @import url('./scss/App.scss');
</style>


