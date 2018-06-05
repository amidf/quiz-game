import Vue from 'vue'
import Vuex from 'vuex'

import { getQuestions } from './../js/Util'

const state = {
  username: 'Player',
  correct: 0,
  questions: [],
  leaders: [],
  difficulties: [
    {name: 'Any', value: ''},
    {name: 'Easy', value: 'easy'},
    {name: 'Medium', value: 'medium'},
    {name: 'Hard', value: 'hard'}
  ],
  types: [
    {type: 'Any', value: ''},
    {type: 'Multitple', value: 'multiple'},
    {type: 'True or False', value: 'boolean'}
  ],
  categories: [
    'Any',
    'General Knowledge',
    'Entertainment: Books',
    'Entertainment: Film',
    'Entertainment: Music',
    'Entertainment: Musicals & Theatres',
    'Entertainment: Television',
    'Entertainment: Video Games',
    'Entertainment: Board Games',
    'Science & Nature',
    'Science: Computers',
    'Science: Mathematics',
    'Mythology',
    'Sports',
    'Geography',
    'History',
    'Politics',
    'Art',
    'Celebrities',
    'Animals',
    'Vehicles',
    'Entertainment: Comics',
    'Science: Gadgets',
    'Entertainment: Japanese Anime & Manga',
    'Entertainment: Cartoon & Animations'
  ]
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
  startGame ({ commit, dispatch }, user) {
    commit('refreshUser', user)
    dispatch('addQuestions', user.questions)
  },
  addQuestions ({ commit }, options) {
    getQuestions(commit, options)
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
