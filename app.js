function randomRGB() {
  const r = Math.floor(Math.random() * 0)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('.letter')

const intervalId = setInterval(function () {
  for (let letter of letters) {
    letter.style.color = randomRGB()
  }
}, 2000)

const form = document.querySelector('form')

form.addEventListener('click', function (evt) {
  const target = evt.target
  const searchVal = document.querySelector('.gif-text').value
  handleBtnClick(target.getAttribute('class'), searchVal)
})

async function getGiphy(term) {
  const endpoint = `http://api.giphy.com/v1/gifs/search?q=${term}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
  const res = await axios.get(endpoint)
  const { url } = res.data.data[0]
}

function handleBtnClick(att, search) {
  if (att === 'btn-search') {
    getGiphy(search)
  }
  if (att === 'btn-remove') {
    removeGifs()
  }
}

function removeGifs() {
  const gifContainer = document.querySelector('.gif-container')
  gifContainer.innerHTML = ''
}
