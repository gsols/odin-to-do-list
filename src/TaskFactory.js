import { Task } from "./Task.js";

class TaskFactory {
    static createTask(title, description, dueDate, time, priority, projectId = null) {
        if (!title?.trim()) {
            throw new Error("Title is required");
        }
        const task = new Task(title.trim(), description, dueDate, time, priority);
        task.projectId = projectId;
        return task;
    }

    // revive a Task instance from plain JSON produced by Task.toJSON()
    static fromJSON(data) {
        if (!data) return null;
        const { id, title, description, dueDate, time, priority, done, subtasks, projectId } = data;
        const task = new Task(title, description, dueDate, time, priority);
        if (id !== undefined) task.id = id;
        if (projectId !== undefined) task.projectId = projectId;
        task.done = !!done;
        task.subtasks = Array.isArray(subtasks)
            ? subtasks.map(st => TaskFactory.fromJSON(st))
            : [];
        return task;
    }
}

export { TaskFactory };