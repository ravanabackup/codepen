const mode = document.getElementById("mode");
mode.addEventListener("change", (e) => {
	document.body.style.setProperty("--enable-3d", e.currentTarget.value);
});

const playState = document.getElementById("animate");
playState.value = getComputedStyle(document.body)
	.getPropertyValue("--animate")
	.trim();
playState.addEventListener("change", (e) => {
	document.body.style.setProperty("--animate", e.currentTarget.value);
});