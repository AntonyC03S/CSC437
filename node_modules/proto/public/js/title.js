const darkmode_button = document.getElementById("checkbox")



darkmode_button.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", darkmode_button.checked);
});


// 
const browser_theme = window.matchMedia("(prefers-color-scheme: dark)");

browser_theme.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode", browser_theme.matches);
});
document.body.classList.toggle("dark-mode", browser_theme.matches);


