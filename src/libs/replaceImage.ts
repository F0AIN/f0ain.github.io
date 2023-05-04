import { fetchCat } from "./fetchCatApi"

const loading = document.getElementById("loading");

fetchCat().then(image => {
  const catImg = document.createElement("img");

  catImg.src = image.url;
  catImg.width = image.width;
  catImg.height = image.height;

  loading?.replaceWith(catImg);
})
