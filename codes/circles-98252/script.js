const all = document.querySelectorAll("div");

all.forEach((each) => {
  each.style.setProperty("--h", Math.random() * 360);
  const animation = each.animate(
    {
      transform: [
        `var(--base) rotate(0) scale(.6)`,
        `var(--base) rotate(${Math.random() * 1000}deg) scale(1)`
      ]
    },
    {
      duration: Math.random() * 10000 + 5000,
      iterations: Infinity,
      direction: "alternate",
      easing: "ease-in-out",
      delay: Math.random() * -5000
    }
  );

  if (matchMedia("prefers-reduced-motion: reduce").matches) {
    animation.pause();
  }
});

player.addEventListener("click", (e) => {
  document.getAnimations().forEach((animation) => {
    if (animation.playState === "paused") {
      animation.play();
    } else {
      animation.pause();
    }
  });
});