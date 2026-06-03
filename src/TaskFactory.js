import { Task } from "./Task.js";

class TaskFactory {
    static createTask(title, description, dueDate, time, priority) {
        if (!title?.trim()) {
            throw new Error("Title is required");
        }
        return new Task(title.trim(), description, dueDate, time, priority);
    }
}

export { TaskFactory };