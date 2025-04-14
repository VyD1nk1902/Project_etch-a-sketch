const body = document.querySelector("body");
const section = document.createElement("section");
section.className = "container";
body.appendChild(section);

// Tạo grid-container
const gridLayout = document.createElement("div");
gridLayout.className = "grid-container";
section.appendChild(gridLayout);

// Group button
const buttonGroup = document.createElement("div");
buttonGroup.className = "btn-group";
section.appendChild(buttonGroup);

// Tạo title
const title = Object.assign(document.createElement("h1"), {
  className: "title",
  textContent: "Etch-A-Sketch🖌️",
});
buttonGroup.appendChild(title);

// Tạo button
const createButton = Object.assign(document.createElement("button"), {
  className: "btn",
  id: "grid-btn",
  textContent: "New Grid Layout",
});
buttonGroup.appendChild(createButton);

const resetButton = Object.assign(document.createElement("button"), {
  className: "btn",
  id: "resetBTN",
  textContent: "Reset Grid",
});
buttonGroup.appendChild(resetButton);

const randomColorButton = Object.assign(document.createElement("button"), {
  className: "btn",
  id: "randomBTN",
  textContent: "Random Mode: Off",
});
buttonGroup.appendChild(randomColorButton);

let isRandom = false;
randomColorButton.addEventListener("click", () => {
  isRandom = !isRandom;
  randomColorButton.textContent = isRandom ? "Random Mode: On" : "Random Mode: Off";
});

// Hàm tạo grid
function createGrid(size) {
  gridLayout.textContent = "";
  gridLayout.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridLayout.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.setAttribute("class", "grid-square");
    gridLayout.appendChild(square);
    square.dataset.darken = 0;

    // Hàm này check chế độ random color
    // Khi bật on -> dataset.darken (số lần tô) sẽ đc tăng dần qa mỗi lần tô
    // nếu chưa có màu -> random RGB
    // từ đó cứ ô nào trống thì sẽ random RGB, ô nào đã có màu dataset.darken sẽ tối dần đi
    const applyColor = () => {
      if (isRandom) {
        let darken = +square.dataset.darken;
        if (darken < 10) darken++;
        square.dataset.darken = darken;

        if (!square.dataset.rgb) {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          square.dataset.rgb = `${r}, ${g}, ${b}`;
        }

        const [r, g, b] = square.dataset.rgb.split(",").map(Number);
        const factor = (10 - darken) / 10;
        square.style.background = `rgb(${r * factor}, ${g * factor}, ${b * factor}) `;
      } else {
        square.classList.add("active");
      }
    };

    // Khi rê và và giữ chuột
    square.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        applyColor();
      }
    });

    // Khi click chuột trực tiếp vào ô
    square.addEventListener("mousedown", applyColor);

    // Khi click reset
    resetButton.addEventListener("click", () => {
      square.classList.remove("active");
      square.removeAttribute("style");
      square.dataset.darken = 0;
      delete square.dataset.rgb;
    });
  }
}

document.body.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.body.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Grid mặc định
createGrid(16);

// tạo button khi click vào -> xóa grid hiện tại -> tạo grid mới dựa trên input người dùng
// nhập 3 thì cho ra 3x3 , 4 thì 4x4)
// nếu nhập sai điều kiện thì sẽ cần nhập lại đến khi nào thỏa điều kiện (dùng While(true))
// nếu bấm cancel thì sẽ kết thúc hàm.
// Xử lý click event
createButton.addEventListener("click", () => {
  let size;

  while (true) {
    const input = prompt("What size of the square (height x width) do you want ?(1 - 99)");

    if (input === null) {
      alert("You Canceled.");
      return;
    }

    size = Number(input);

    if (Number.isInteger(size) && size > 0 && size <= 99) {
      break;
    }
    alert("Invalid number. Please add number 1-99");
  }

  createGrid(size);
});
