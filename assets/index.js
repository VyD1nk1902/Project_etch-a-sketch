const body = document.querySelector("body");

const button = document.createElement("button");
button.setAttribute("class", "grid-btn");
body.appendChild(button);
button.textContent = "New Grid Layout";

const div = document.createElement("div");
div.setAttribute("class", "grid-container");
body.appendChild(div);

const gridLayout = document.querySelector(".grid-container");
for (let i = 0; i < 16 * 16; i++) {
  const square = document.createElement("div");
  square.setAttribute("class", "grid-square");
  gridLayout.appendChild(square);
}

// tạo button khi click vào -> xóa grid hiện tại -> tạo grid mới dựa trên input người dùng
// nhập 3 thì cho ra 3x3 , 4 thì 4x4)
// nếu nhập sai điều kiện thì sẽ cần nhập lại đến khi nào thỏa điều kiện (dùng While(true))
// nếu bấm cancel thì sẽ kết thúc hàm.

button.addEventListener("click", () => {
  let newLayoutInput;
  let userInput;

  while (true) {
    userInput = prompt("What size of the square (height x width) do you want ?(1 - 99)");

    if (userInput === null) {
      alert("You Canceled.");
      return;
    }

    newLayoutInput = Number(userInput);
    if (Number.isInteger(newLayoutInput) && newLayoutInput > 0 && newLayoutInput <= 99) {
      break;
    }
    alert("Invalid number. Please add number 1-99");
  }

  const gridInput = newLayoutInput * newLayoutInput;

  function newGrid(gridInput) {
    gridLayout.textContent = "";
    gridLayout.style.gridTemplateColumns = `repeat(${newLayoutInput}, 1fr)`;
    gridLayout.style.gridTemplateRows = `repeat(${newLayoutInput}, 1fr)`;
    for (let i = 0; i < gridInput; i++) {
      const square = document.createElement("div");
      square.setAttribute("class", "grid-square");
      gridLayout.appendChild(square);
    }
  }

  newGrid(gridInput);
});

//   let newLayoutInput = Number(prompt("How many number of squares per side do you want for the new grid ?(1 - 99)"));
//   newLayoutInput = Number(userInput);
//   const gridInput = newLayoutInput * newLayoutInput;

//   function newGrid(gridInput) {
//     gridLayout.textContent = "";
//     gridLayout.style.gridTemplateColumns = `repeat(${newLayoutInput}, 1fr)`;
//     gridLayout.style.gridTemplateRows = `repeat(${newLayoutInput}, 1fr)`;
//     for (let i = 0; i < gridInput; i++) {
//       const square = document.createElement("div");
//       gridLayout.appendChild(square);
//     }
//   }

//   if (Number.isInteger(newLayoutInput) && newLayoutInput > 0 && newLayoutInput <= 99) {
//     newGrid(gridInput);
//   } else alert("Invalid number. Please add number 1-99");
// });
