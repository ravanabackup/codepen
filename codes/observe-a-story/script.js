const sky = Array.from(document.querySelectorAll('div'));

if (sky[0].animate) {
  sky.forEach(band => {
    band.animate({
      transform: [
        'translate(-50%,-50%) rotate(0deg)',
        'translate(-50%,-50%) rotate(360deg)'
      ]
    }, {
      duration: 26000 + (Math.random() * 30000),
      delay: Math.random() * -30000,
      iterations: Infinity
    })
  })
}