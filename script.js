document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.querySelector('.task-input');
    const addTaskButton = document.querySelector('.add-task');
    const taskList = document.querySelector('.tasks');
    const totalTasksSpan = document.querySelector('.total-tasks');
    const remainingTasksSpan = document.querySelector('.remaining-tasks');
    const completedTasksSpan = document.querySelector('.completed-tasks');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            // Add dataset index for referencing task index
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-buttons">
                    <button class="complete-button">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-button">Remove</button>
                </div>
            `;
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
        updateTaskCounts();
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            renderTasks();
        }
    }

    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function updateTaskCounts() {
        const totalTasks = tasks.length;
        const remainingTasks = tasks.filter(task => !task.completed).length;
        const completedTasks = tasks.filter(task => task.completed).length;
        totalTasksSpan.textContent = totalTasks;
        remainingTasksSpan.textContent = remainingTasks;
        completedTasksSpan.textContent = completedTasks;
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('complete-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            toggleTaskCompletion(taskIndex);
        } else if (event.target.classList.contains('delete-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            deleteTask(taskIndex);
        }
    });

    renderTasks();
});

