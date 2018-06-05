const $ = require('jquery')

function shuffle (array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function getQuestions (commit, options) {
  console.log(options)
  $.ajax({
    url: `https://opentdb.com/api.php?amount=${options.amount}&category=${options.category}&difficulty=${options.difficulty}&type=${options.type}`,
    dataType: 'json',
    success (res, status, xhr) {
      if (res.response !== 1) {
        commit('addQuestions', res.results)
      }
    },
    error (xhr) {
      console.log(xhr)
    }
  })
}

module.exports = {
  shuffle,
  getQuestions
}
