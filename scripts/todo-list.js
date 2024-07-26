/*
document.addEventListener('DOMContentLoaded', (event) => {
    const checkbox = document.getElementById('myCheckbox');

    // Retrieve the state from localStorage and set the checkbox accordingly
    const isChecked = localStorage.getItem('checkboxState') === 'true';
    checkbox.checked = isChecked;

    // Add event listener to the checkbox
    checkbox.addEventListener('change', function() {
        // Save the state to localStorage
        localStorage.setItem('checkboxState', checkbox.checked);
    });
});
*/

let todoList = [];

renderTodoList();

function renderTodoList() {
let todoListHTML = '';

  if (localStorage.getItem('todolist') !== null) {
     todoList = JSON.parse(localStorage.getItem('todolist'));
  };

for (let i = 0; i < todoList.length; i++) {
  const todoObject = todoList[i];
  //const name = todoObject.name;
  //const dueDate = todoObject.dueDate;
  const { name, dueDate, dueTime } = todoObject;
  const html = `
  <div>${name}</div>
  <div>${dueDate}</div>
  <div>${dueTime}</div>

  <input type="checkbox" class="js-finish">
  
  <button onclick="
      todoList.splice(${i}, 1);
      renderTodoList();
      localStorage.removeItem('todolist')
  " class="delete-todo-button">Delete</button>
  `;
  todoListHTML += html;
}
   
document.querySelector('.js-todo-list')
.innerHTML = todoListHTML;
};

function addTodo() {
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;

  const dateInputElement = document.querySelector('.js-date-input');
  let dueDate = new Date(dateInputElement.value).toLocaleDateString("en-GB");

  const timeInputElement = document.querySelector('.js-time-input');
  let dueTime = timeInputElement.value;

  if (!dateInputElement.value) {
      dueDate =  'Everyday';     
    };

    if (!timeInputElement.value) {
      dueTime =  'Any time';     
    };

    if (!nameInputElement.value) {
      alert('Please put a To do name');     
    } else {
    todoList.push({
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate,
    dueTime,
      });
    };

    localStorage.setItem('todolist', JSON.stringify(todoList));
 
  nameInputElement.value = '';
  dateInputElement.value = '';
  timeInputElement.value = '';
    
  renderTodoList();  
};

function handleCostKeydown(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
};
