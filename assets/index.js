const div = document.createElement("div");
div.setAttribute("class", "grid-container");
const body = document.querySelector("body");
body.appendChild(div);

const gridLayout = document.querySelector(".grid-container");
for (let i = 0; i < 16 * 16; i++) {
  const square = document.createElement("div");
  gridLayout.appendChild(square);
}
