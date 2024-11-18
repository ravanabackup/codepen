const loop = 100000
const separation = 10

const result = document.querySelector('.result')
const overview = document.querySelector('.overview')
const button = document.querySelector('.button')
const rateInput = document.querySelector('.input')

button.addEventListener('click', run)
run()

function run () {
  let rate = Number(rateInput.value) / 100
  let counter = 0
  let resultText = ''
  let hitCount = 0

  for (let i = 0; i < loop; i++) {
    if (Math.random() < rate) {
      resultText += '<span class="hit">1</span>'
      hitCount++
    } else {
      resultText += '0'
    }

    counter++
    if (counter >= separation) {
      counter = 0
      resultText += ' '
    }
  }

  result.innerHTML = resultText
  overview.innerText = 'LOOP ' + loop.toLocaleString() + ' / HIT ' + hitCount.toLocaleString()
}