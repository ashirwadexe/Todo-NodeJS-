// Import the 'fs' module to work with the file system
const fs = require('fs');

// Define the path to the JSON file where tasks will be stored
const filePath = "./tasks.json";

// Extract the third argument from the command line which represents the command (like 'add', 'list', etc.)
const command = process.argv[2];

// Extract the fourth argument from the command line which will be used for commands like 'add' (the task description)
const argument = process.argv[3];

// Function to load tasks from the tasks.json file
const loadTask = () => {
    try {
        // Read the content of tasks.json file as a binary buffer
        const dataBuffer = fs.readFileSync(filePath);

        // Convert the binary buffer to a string (JSON format)
        const dataJSON = dataBuffer.toString();

        // Parse the JSON string into an array of tasks and return it
        return JSON.parse(dataJSON);
    } 
    catch {
        // If there's an error (like the file not existing), return an empty array as default
        return [];
    }
}

// Function to save the tasks back to the tasks.json file
const saveTask = (tasks) => {
    // Convert the array of tasks into a JSON string
    const dataJSON = JSON.stringify(tasks);

    // Write the JSON string into tasks.json, overwriting its content
    fs.writeFileSync(filePath, dataJSON);
}

// Function to add a task to the task list
const addTask = (task) => {
    // Load the current list of tasks from the tasks.json file
    const tasks = loadTask();

    // Add the new task as an object (with 'task' property) to the tasks array
    tasks.push({ task });

    // Save the updated task list back to the file
    saveTask(tasks);

    // Print a message confirming the task was added
    console.log("Task Added:", task);
}

// Function to list all tasks from the tasks.json file
const listTask = () => {
    // Load the current list of tasks from the tasks.json file
    const tasks = loadTask();

    // Iterate over the tasks and print each task with its index (starting from 1)
    tasks.forEach((task, index) => console.log(`${index + 1} - ${task.task}`));
}

// Add removeTask functionality to remove a task by its index
const removeTask = (taskIndex) => {
    // Load the current list of tasks from the tasks.json file
    const tasks = loadTask();

    // Check if the taskIndex is valid (i.e., within the array bounds)
    if (taskIndex > 0 && taskIndex <= tasks.length) {
        // Remove the task at the specified index (taskIndex - 1 because arrays are 0-based)
        const removedTask = tasks.splice(taskIndex - 1, 1);

        // Save the updated task list back to the file
        saveTask(tasks);

        // Print a message confirming the task was removed
        console.log("Task Removed:", removedTask[0].task);
    } else {
        // Print an error if the index is invalid
        console.log("Invalid task number");
    }
}

// Conditional to check the command passed from the command line
if (command === 'add') {
    // If the command is 'add', call the addTask function with the argument (task description)
    addTask(argument);
}
else if (command === 'list') {
    // If the command is 'list', call the listTask function to print the tasks
    listTask();
}
else if (command === 'remove') {
    // If the command is 'remove', call the removeTask function with the argument (task index, parsed as an integer)
    removeTask(parseInt(argument));
}
else {
    // If the command is not recognized, print an error message
    console.log("command not found");
}
