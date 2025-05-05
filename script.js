document.addEventListener('DOMContentLoaded', () => { const taskInput = document.getElementById('taskInput'); const addTaskBtn = document.getElementById('addTaskBtn'); const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const duplicate = tasks.some(task => task.toLowerCase() === taskText.toLowerCase());
        if (duplicate) {
            alert('Task already exists. Please enter a different task.');
            return;
        }
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

});

