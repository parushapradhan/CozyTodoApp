const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

window.onload = loadTasks;

addBtn.addEventListener('click', async () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    await addTask(taskText);
    taskInput.value = '';
    loadTasks();
  }
});

async function addTask(description) {
  try {
    await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

async function loadTasks() {
  try {
    const response = await fetch('/tasks');
    const tasks = await response.json();
    todoList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      if (task.status === 'done') {
        li.classList.add('completed');
      }

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.status === 'done';

      const span = document.createElement('span');
      span.textContent = task.task_name;

      checkbox.addEventListener('click', async (event) => {
        event.stopPropagation();
        const newStatus = checkbox.checked ? 'done' : 'ongoing';
        await updateTaskStatus(index, newStatus);
        loadTasks();
      });

      li.addEventListener('click', async (event) => {
        if (event.target.tagName !== 'INPUT') {
          checkbox.checked = !checkbox.checked;
          const newStatus = checkbox.checked ? 'done' : 'ongoing';
          await updateTaskStatus(index, newStatus);
          loadTasks();
        }
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.style.marginLeft = '10px';
      deleteBtn.addEventListener('click', async (event) => {
        event.stopPropagation();
        await deleteTask(index);
        loadTasks();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });

  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

async function updateTaskStatus(index, newStatus) {
  try {
    await fetch(`/tasks/${index}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (error) {
    console.error('Error updating task:', error);
  }
}

async function deleteTask(index) {
  try {
    await fetch(`/tasks/${index}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}
