const filter = document.querySelector('#filter');

filter.addEventListener('click', e => {
  document.body.style.setProperty('--filter', filter.checked ? 'url(#drawn)' : 'none')
})