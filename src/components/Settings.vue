<template>
  <div>
    <h1>Settings</h1>
    <div class="form">
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          class="form-control"
          type="text"
          name="username"
          id="username"
          v-model="username" 
          required
        >
        <div class="invalid-feedback" v-bind:class="{show: !check.username}">
          Please enter the name
        </div>
      </div>
      <div class="form-group">
        <label for="numberOfQuestions">How many questions? (Min 1 and max 20)</label>
        <input 
          class="form-control"
          type="number"
          min="1"
          max="20"
          v-model="numberOfQuestions"
          required
        >
        <div class="invalid-feedback" v-bind:class="{show: check.questions}">
          Please choose number from 1 to 20
        </div>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select
          name="category"
          class="form-control"
          id="category"
          v-model="category"
        >
          <option 
            v-bind:value="index"
            v-bind:key="index"
            v-for="(category, index) in categories"
          >
            {{ category }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="difficulty">Difficulty</label>
        <select
          name="difficulty"
          class="form-control"
          id="difficulty"
          v-model="difficulty"
        >
          <option
            v-bind:value="difficulty.value"
            v-bind:key="index"
            v-for="(difficulty, index) in difficulties"
          >
            {{ difficulty.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="type">Type</label>
        <select
          class="form-control"
          name="type"
          id="type"
          v-model="type"
        >
          <option
            v-for="(type, index) in types"
            v-bind:key="index"
            v-bind:value="type.value"
          >
          {{ type.type }}
          </option>
        </select>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" @click="startGame">Begin</button>
    <router-link class="btn" v-bind:to="{name: 'Home'}">Back</router-link>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  created () {
    this.username = this.$store.state.username
    this.$store.commit('resetGame')
  },
  data () {
    return {
      username: '',
      numberOfQuestions: 1,
      category: 0,
      type: '',
      difficulty: ''
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    types () {
      return this.$store.state.types
    },
    check () {
      return {
        username: this.username !== '',
        questions: (this.numberOfQuestions >= 1) && (this.numberOfQuestions <= 20)
      }
    },
    difficulties () {
      return this.$store.state.difficulties
    }
  },
  methods: {
    startGame () {
      if (this.username !== '' && (this.numberOfQuestions >= 1) && (this.numberOfQuestions <= 20)) {
        this.$store.dispatch('startGame', {
          username: this.username,
          questions: this.numberOfQuestions
        })

        if (this.category == 0) {
          this.category = ''
        } 
        
        this.$store.dispatch('addQuestions', {
          amount: this.numberOfQuestions,
          category: this.category,
          type: this.type,
          difficulty: this.difficulty
        })
        this.$router.push({name: 'Game'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('./../scss/Settings.scss');
  .invalid-feedback.show {
    display: block !important;
  }
</style>

