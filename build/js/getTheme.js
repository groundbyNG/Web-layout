function setTheme() {
  if (document.cookie) {
    document.documentElement.setAttribute("theme", "dark");
  } else {
    document.documentElement.removeAttribute("theme");
  }
}

setTheme();