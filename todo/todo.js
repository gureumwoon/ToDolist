const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(todo) {
    localStorage.setItem("todo", JSON.stringify(todo));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("todo"));
  },
};

function App() {
  this.todo = [];
  // this.currentCategory =""
  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.todo = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.todo.map((todoItem, index) => {
      return `
      <li data-todo-id="${index}" class="todo-list-item">
        <span class="todo-item  ${todoItem.done ? "done" : ""}">${todoItem.todo}</span>
        <div class="btn-box">
          <button type="button" class="todo-done-button">완료</button>
          <button type="button" class="todo-delete-button">삭제</button>
        </div>
      </li>
    `
    }).join("");

    $("#todo-list").innerHTML = template;
    updateTodoCount();
  }

  const updateTodoCount = () => {
    const listCount = $("#todo-list").querySelectorAll("li").length;
    $(".list-count").innerText = `총 ${listCount} 개`
  };

  const addList = () => {
    const inputToDo = $("#input-todo").value;
    this.todo.push({ todo: inputToDo });
    store.setLocalStorage(this.todo);
    render();
    $("#input-todo").value = "";
  };

  const deleteToDo = (e) => {
    const todoId = e.target.closest("li").dataset.todoId;
    this.todo.splice(todoId, 1);
    store.setLocalStorage(this.todo);
    e.target.closest("li").remove();
    updateTodoCount();
  }

  const doneTodo = (e) => {
    const todoId = e.target.closest("li").dataset.todoId;
    this.todo[todoId].done =
      !this.todo[todoId].done;
    store.setLocalStorage(this.todo);
    render();
  };

  $("#todo-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-delete-button")) {
      deleteToDo(e);
      return;
    }
    if (e.target.classList.contains("todo-done-button")) {
      doneTodo(e);
      return;
    }
  })

  $(".todo-box").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#todo-btn").addEventListener("click", addList);


  $("#input-todo").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") {
      return
    };
    addList();
  });
}

const app = new App();
app.init();
