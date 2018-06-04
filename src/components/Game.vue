<template>
  <div>
    <h1 class="title">Question {{ current }}</h1>
    <div class="question-container">
      <p class="question" v-html="question.question"></p>
      <div class="options">
        <span v-for="(option, index) in options" v-bind:key="index">
          <input type="radio" v-bind:disabled="disable" v-model="answer" name="question" v-bind:value="option">
          <span class="option" v-html="option"></span>
        </span>
      </div>
    </div>
    <div class="btns">
      <div>
        <button @click="submit" v-bind:disabled="answer === '' || disable" class="btn btn-primary">Submit</button>
        <button @click="next" v-bind:disabled="!disable" class="btn btn-primary">Next</button>
      </div>
      <div>
        <router-link class="btn" v-bind:to="{name: 'Home'}">Home</router-link>
        <router-link class="btn" v-bind:to="{name: 'Settings'}">Settings</router-link>
      </div>
    </div>
    <span class="answer" v-bind:class="{correct: correct === true, incorrect: correct === false}">{{ msg }}</span>
  </div>
</template>

<script>
const { shuffle } = require('./../js/Util.js')

export default {
  name: 'Game',
  data () {
    return {
      current: 1,
      answer: '',
      correct: null,
      disable: false,
      msg: '',
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions || []
    },
    question () {
      return this.questions[this.current - 1] || {question: 'Loading...'}
    },
    options () {
      if (this.question.incorrect_answers !== undefined) {
        let options = this.question.incorrect_answers.slice()
        options.push(this.question.correct_answer)
        options = shuffle(options)

        return options
      }

      return []
    },
    correctAnswer () {
      return this.question.correct_answer
    }
  },
  methods: {
    submit () {
      if (this.answer === this.correctAnswer) {
        this.correct = true
        this.msg = 'You\'re right'
        this.$store.commit('addCorrect')
      } else {
        this.correct = false
        this.msg = 'You\'re wrong'
      }

      this.disable = true
    },
    next () {
      if (this.current < this.questions.length) {
        this.current += 1
        this.answer = ''
        this.correct = null
        this.disable = false
        this.msg = ''
      } else {
        this.$store.commit('addLeader', this.questions.length)
        this.$router.push({name: 'End'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import url('./../scss/Game.scss');
</style>
