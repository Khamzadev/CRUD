//CRUD
//CREATE - создаваьб
//READ - читать
//UPDATE - обнолвять
//DELETE - удалять

//Общение с бэкендом происходит с помощью HTTP

// Метод GET - используют для чтения данных , когда днные уже существуют и мы никак не хотим их изменять
// Метод POST - используют для создания данных
// Методы PUT, PATCH - используют для обновления
// Метод PUT - используют для того чтобы  полностью струтктуру данных изменить
// Методы PATCH - используют для точечной замены данных
// Метод DELETE - используют для удаление данных

//Создание элементов
document.getElementById("addTodo").addEventListener("click", async () => {
  const input = document.getElementById("todoText");
  const title = input.value;

  if (title) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, completed: false }),
    });

    const todo = await res.json();
    todoHTML(todo);

    input.value = "";
  }
});

//Получаем все тудушки
async function getAllTodos() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const todos = await res.json();

  console.log(todos);

  todos.forEach((todo) => todoHTML(todo));
}

//Добавили обработчик событий для объекта window , чтоб при открытии вкладки все тудушки прогрузились
window.addEventListener("DOMContentLoaded", getAllTodos);

//Для отрисовки элемнтов
function todoHTML({ id, completed, title }) {
  const todoList = document.getElementById("todos");

  todoList.insertAdjacentHTML(
    "beforeend",
    `   <div class="form-check" id="todo${id}">
          <label class="form-check-label">
            <input onChange={toggleCompleteTodo(${id})} type="checkbox" class="form-check-input" ${
              completed && "checked"
            }/>
            ${title}
          </label>
          <button onClick={deleteTodo(${id})} class="btn-close"></button>
        </div>`
  );
}

//Удаление данных
async function deleteTodo(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  console.log(data);

  if (data) {
    document.getElementById(`todo${id}`).remove();
  }
}

async function toggleCompleteTodo(id) {
  const completed = document.querySelector(`#todo${id} input`).checked;

  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });

  const data = res.json();
}
