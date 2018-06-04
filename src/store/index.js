import Vue from 'vue'
import Vuex from 'vuex'

const $ = require('jquery')

function getQuestions (commit, n) {
  $.ajax({
    url: `https://opentdb.com/api.php?amount=${n}`,
    dataType: 'json',
    success (res, status, xhr) {
      commit('addQuestions', res.results)
    },
    error (xhr) {
      console.log(xhr)
    }
  })
}

const state = {
  username: 'Player',
  correct: 0,
  questions: [],
  leaders: []
}

const mutations = {
  addLeader (state, countQuestions) {
    state.leaders.push({
      username: state.username,
      questions: countQuestions,
      correct: state.correct
    })

    localStorage.setItem('leaders', JSON.stringify(state.leaders))
  },
  refreshLeaders (state) {
    state.leaders = JSON.parse(localStorage.getItem('leaders')) || []
  },
  refreshUser (state, user) {
    state.username = user.username
  },
  resetGame (state) {
    state.username = 'Player'
    state.questions = []
    state.correct = 0
  },
  addQuestions (state, questions) {
    state.questions = questions
  },
  addCorrect (state) {
    state.correct += 1
  },
  clearList (state) {
    localStorage.setItem('leaders', '""')
  }
}

const actions = {
  startGame ({ commit }, user) {
    commit('resetGame')
    commit('refreshLeaders')
    commit('refreshUser', user)
  },
  addQuestions ({ commit }, n) {
    getQuestions(commit, n)
  },
  clearList ({ commit }) {
    commit('clearList')
    commit('refreshLeaders')
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions
})
