const $ = (selector) => document.querySelector(selector);

function App() {
  $(".todo-box").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#input-todo").addEventListener("keypress", (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      const inputToDo = $("#input-todo").value;
      const listTemplate = (inputToDo) => {
        return `
        <li class="todo-list-item">
          <span class="todo-item">${inputToDo}</span>
          <div class="btn-box">
            <button type="button" class="todo-edit-button">수정</button>
            <button type="button" class="todo-done-button">완료</button>
          </div>
        </li>
      `
      };
      $("#todo-list").insertAdjacentHTML(
        "beforeend",
        listTemplate(inputToDo)
      )
    }
  });
}

const app = new App();
