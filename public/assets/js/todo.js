  // Get references to the DOM elements
  const addBtn = document.getElementById('addBtn');
  const taskInput = document.getElementById('taskInput');
  const todoList = document.getElementById('todoList');

  // Function to add a new task
  addBtn.addEventListener('click', () => {
    console.log("addBtn clicked");
    const taskText = taskInput.value.trim();
    if (taskText) {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      // Create a checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      // Create a span for task text
      const span = document.createElement('span');
      span.textContent = taskText;

      // Append the checkbox and span to the list item
      li.appendChild(checkbox);
      li.appendChild(span);

      // Toggle strike-through effect on item click
      li.addEventListener('click', (event) => {
        // When clicking directly on the checkbox, avoid duplicate toggling
        if (event.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
        }
        li.classList.toggle('completed');
      });

      // Also, when clicking the checkbox, toggle the completed state
      checkbox.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from bubbling up to li
        li.classList.toggle('completed');
      });

      // Add the new task to the list and clear the input
      todoList.appendChild(li);
      taskInput.value = '';
    }
  });