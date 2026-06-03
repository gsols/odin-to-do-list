import { Task } from "./Task.js";

class TaskFactory {
    static createTask(title, description, dueDate, time, priority) {
        if (!title?.trim()) {
            throw new Error("Title is required");
        }
        return new Task(title.trim(), description, dueDate, time, priority);
    }

    // revive a Task instance from plain JSON produced by Task.toJSON()
    static fromJSON(data) {
        if (!data) return null;
        const { id, title, description, dueDate, time, priority, done, subtasks } = data;
        const task = new Task(title, description, dueDate, time, priority);
        if (id !== undefined) task.id = id;
        task.done = !!done;
        task.subtasks = Array.isArray(subtasks)
            ? subtasks.map(st => TaskFactory.fromJSON(st))
            : [];
        return task;
    }
}

export { TaskFactory };