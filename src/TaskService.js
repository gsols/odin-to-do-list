import { Priority } from "./Priority.js";
import { TaskFactory } from "./TaskFactory";
import * as Storage from "./Storage.js";

class TaskService {
    constructor(initialTasks = []) {
        this.tasks = initialTasks;
        this.STORAGE_KEY = "tasks";
    }

    loadFromLocalStorage() {
        this.tasks = Storage.loadList(this.STORAGE_KEY, TaskFactory);
    }

    saveToLocalStorage() {
        Storage.saveList(this.STORAGE_KEY, this.tasks);
    }

    addTask(title, description, dueDate, time, priority, projectId = null) {
        const task = TaskFactory.createTask(title, description, dueDate, time, priority, projectId);
        this.tasks.push(task);
        this.saveToLocalStorage();
        return task;
    }

    getTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.getId() === id);
    }

    toggleTaskDone(id) {
        const task = this.getTaskById(id);
        if (task) {
            task.toggleDone();
            this.saveToLocalStorage();
            return task;
        }
        return null;
    }

    updateTask(id, updates = {}) {
        const task = this.getTaskById(id);
        if (!task) {
            return null;
        }
        const { title, description, dueDate, time, priority, projectId } = updates;
        if (title !== undefined) task.setTitle(title);
        if (description !== undefined) task.setDescription(description);
        if (dueDate !== undefined) task.setDueDate(dueDate);
        if (time !== undefined) task.setTime(time);
        if (priority !== undefined) this.setTaskPriority(id, priority);
        if (projectId !== undefined) this.setProjectId(id, projectId)
        this.saveToLocalStorage();
        return task;
    }

    setTaskPriority(id, priority) {
        if (!Object.values(Priority).includes(priority)) {
            throw new Error("Invalid priority value");
        }
        const task = this.getTaskById(id);
        task.setPriority(priority);
        this.saveToLocalStorage();
        return task;
    }

    getTaskByProjectId(projectId) {
        return this.tasks.filter(task => task.projectId === projectId);
    }
    
    setProjectId(taskId, projectId) {
        const task = this.getTaskById(taskId);
        if (task) {
            task.projectId = projectId;
            this.saveToLocalStorage();
            return task;
        }
        return null;
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.getId() !== id);
        this.saveToLocalStorage();
    }

    
}
    
export { TaskService };
