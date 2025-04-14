const body = document.querySelector("body");
const section = document.createElement("section");
section.className = "container";
body.appendChild(section);

// Tạo title

const title = Object.assign(document.createElement("h1"), {
  className: "title",
  textContent: "Etch-A-Sketch🖌️",
});
section.appendChild(title);

// Tạo container
// const div = document.createElement("div");
// div.setAttribute("class", "grid-container");
// body.appendChild(div);
// const gridLayout = document.querySelector(".grid-container");
const gridLayout = document.createElement("div");
gridLayout.className = "grid-container";
section.appendChild(gridLayout);

// Group button
const buttonGroup = document.createElement("div");
buttonGroup.className = "btn-group";
section.appendChild(buttonGroup);

// Tạo button
// const button = document.createElement("button");
// button.setAttribute("class", "grid-btn");
// body.appendChild(button);
// button.textContent = "New Grid Layout";
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

// Hàm tạo grid
function createGrid(size) {
  gridLayout.textContent = "";
  gridLayout.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridLayout.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.setAttribute("class", "grid-square");
    gridLayout.appendChild(square);

    // Khi rê và và giữ chuột
    square.addEventListener("mouseenter", () => {
      if (isMouseDown) {
        square.classList.add("active");
      }
    });

    // Khi click chuột trực tiếp vào ô
    square.addEventListener("mousedown", () => {
      square.classList.add("active");
    });

    // Khi click reset
    resetButton.addEventListener("click", () => {
      square.classList.remove("active");
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
