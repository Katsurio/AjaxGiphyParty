const randomRGB = () => {
  const r = Math.floor(Math.random() * 0)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r},${g},${b})`
}

const letters = document.querySelectorAll('.letter')

const intervalId = setInterval(() => {
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
  try {
    const endpoint = `http://api.giphy.com/v1/gifs/search`
    const params = {
      params: {
        q: term,
        api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym',
      },
    }
    const res = await axios.get(endpoint, params)
    const { url } = res.data.data[0].images.downsized
    appendGif(url)
    form.reset()
  } catch (e) {
    console.log(e.message)
  }
}

const handleBtnClick = (att, search) => {
  if (att === 'btn-search') {
    getGiphy(search)
  }
  if (att === 'btn-remove') {
    removeGifs()
  }
}

const removeGifs = () => {
  const gifbox = document.querySelector('.gifbox')
  gifbox.innerHTML = ''
}

const appendGif = (url) => {
  const gifImg = document.createElement('img')
  gifImg.classList.add('gif-img')
  gifImg.setAttribute('src', url)
  const gifbox = document.querySelector('.gifbox')
  gifbox.appendChild(gifImg)
}
