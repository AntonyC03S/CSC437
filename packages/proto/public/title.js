const darkmode_button = document.getElementById("darkmode-input")

darkmode_button.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkmode_button.checked);
});
