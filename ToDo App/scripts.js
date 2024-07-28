// Initializing an empty array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput'); // Gets the input element
    const taskText = taskInput.value.trim(); 
    
    // Check if the input is empty
    if (taskText === '') {
        alert('Please enter a task.'); // Alert the user if the input is empty
        return; // Exits the function if input is empty
    }
    
    // Creates a new task object
    const task = {
        id: Date.now(), // Unique ID based on the current timestamp
        text: taskText, // Task text
        completed: false, // Task completion status
        createdAt: new Date().toLocaleString(), // Timestamp when the task was created
        completedAt: null // Timestamp when the task is completed (null initially)
    };
    
    // Adds the new task to the tasks array
    tasks.push(task);
    taskInput.value = ''; // Clears the input field
    renderTasks(); // Renders the updated tasks list
}

// Function to render the tasks on the page
function renderTasks() {
    const pendingTasks = tasks.filter(task => !task.completed); // Filters pending tasks
    const completedTasks = tasks.filter(task => task.completed); // Filters completed tasks
    
    const pendingTasksList = document.getElementById('pendingTasks'); // Gets the pending tasks list element
    const completedTasksList = document.getElementById('completedTasks'); // Gets the completed tasks list element
    
    pendingTasksList.innerHTML = ''; // Clears the pending tasks list
    completedTasksList.innerHTML = ''; // Clears the completed tasks list
    
    // Creates and append task items for pending tasks
    pendingTasks.forEach(task => {
        const taskItem = createTaskItem(task); // Creates a task item element
        pendingTasksList.appendChild(taskItem); // Appends the task item to the pending tasks list
    });
    
    // Creates and append task items for completed tasks
    completedTasks.forEach(task => {
        const taskItem = createTaskItem(task); // Creates a task item element
        completedTasksList.appendChild(taskItem); // Appends the task item to the completed tasks list
    });
}

// Function to create a task item element
function createTaskItem(task) {
    const taskItem = document.createElement('li'); // Creates a new list item element
    taskItem.className = task.completed ? 'completed' : ''; // Adds 'completed' class if the task is completed
    taskItem.innerHTML = `
        <span>${task.text} (Created at: ${task.createdAt})</span>
        <div>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Unmark' : 'Complete'}</button>
        </div>
    `;
    return taskItem; // Returns the created task item element
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); // Remove the task with the specified ID from the tasks array
    renderTasks(); // Render the updated tasks list
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId); // Find the task with the specified ID
    const newText = prompt('Edit the task:', task.text); // Prompt the user to enter new text for the task
   
    // Update the task text if the input is not empty
    if (newText !== null && newText.trim() !== '') {
      task.text = newText.trim(); // Update the task text
      renderTasks(); // Render the updated tasks list
  }
}

// Function to toggle the completion status of a task
function toggleComplete(taskId) {
  const task = tasks.find(task => task.id === taskId); // Find the task with the specified ID
  task.completed = !task.completed; // Toggle the completion status
  task.completedAt = task.completed ? new Date().toLocaleString() : null; // Update the completion timestamp
  renderTasks(); // Render the updated tasks list
}

// Event listener to render tasks when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderTasks);
