const toggleBtn = document.querySelector("#toggle-theme");
toggleBtn.addEventListener("click", e => {
  if (document.cookie) {
    document.cookie = "theme=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.location.reload();
  } else {
    document.cookie = "theme=dark; expires=Thu, 01 Jan 3000 00:00:00 UTC;";
    document.location.reload();
  }
});