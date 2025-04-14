const body = document.querySelector("body");

// Tạo button
// const button = document.createElement("button");
// button.setAttribute("class", "grid-btn");
// body.appendChild(button);
// button.textContent = "New Grid Layout";
const button = Object.assign(document.createElement("button"), {
  className: "grid-btn",
  textContent: "New Grid Layout",
});
body.appendChild(button);

// Tạo container
// const div = document.createElement("div");
// div.setAttribute("class", "grid-container");
// body.appendChild(div);
// const gridLayout = document.querySelector(".grid-container");
const gridLayout = document.createElement("div");
gridLayout.className = "grid-container";
body.appendChild(gridLayout);

// Hàm tạo grid
function createGrid(size) {
  gridLayout.textContent = "";
  gridLayout.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridLayout.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.setAttribute("class", "grid-square");
    gridLayout.appendChild(square);
  }
}

// Grid mặc định
createGrid(16);

// tạo button khi click vào -> xóa grid hiện tại -> tạo grid mới dựa trên input người dùng
// nhập 3 thì cho ra 3x3 , 4 thì 4x4)
// nếu nhập sai điều kiện thì sẽ cần nhập lại đến khi nào thỏa điều kiện (dùng While(true))
// nếu bấm cancel thì sẽ kết thúc hàm.
// Xử lý click event
button.addEventListener("click", () => {
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
