const HEIGHT = 38;

const main = () => {
  // Adds ZERO-WIDTH-SPACEs between the characters of a word for nicer wrapping,
  // and replaces spaces with non-breaking ones.
  const spaceify =
  word => ['', ...word.replace(/ /g, '\u00A0').split(''), ''].join('\u200B');

  // DOM.
  const ascii = document.querySelector('.ascii');
  const p = document.querySelector('.output p');
  const speed = document.querySelector('.speed');

  // Derive the number of characters that fit on a single line.
  const charsPerLine = (() => {
    const prevHTML = p.innerHTML;
    p.textContent = 'A';
    const lineHeight = p.offsetHeight;
    let charsPerLine = 0;
    for (; p.offsetHeight === lineHeight; ++charsPerLine) p.textContent += 'A';
    p.innerHTML = prevHTML;
    return charsPerLine;
  })();
  p.style.minHeight = 'calc(100% + 1em)';
  p.style.visibility = 'visible';

  // State.
  let word = spaceify(ascii.value);
  let period = 40; // ~24fps.
  let timeout = period;
  let tPrev = 0;
  let i = 0;
  // Main animation loop.
  (function print(t = Date.now()) {
    const gap = tPrev && t - tPrev - timeout;

    // Clear some of the old characters if we fall well below `period`.
    if (gap > period / 2) {
      const unspaced = p.textContent.replace(/\u200B/g, '');
      const charsToKeep = HEIGHT * charsPerLine + unspaced.length % charsPerLine;
      p.textContent = spaceify(unspaced.slice(-charsToKeep));
    }
    p.textContent += word;

    // Update state.
    tPrev = t;
    timeout = Math.max(period - gap, 0);
    setTimeout(print, timeout);
  })();

  ascii.addEventListener('keyup', e => {
    word = spaceify(ascii.value), p.textContent = '';
  });
  speed.addEventListener('input', e => {
    period = 1000 / speed.value, tPrev = 0;
  });
};

setTimeout(main, 1000);