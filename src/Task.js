class Task{
    constructor(title, description, dueDate, time, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.time = time;
        this.priority = priority;
        this.done = false;
        this.subtasks = [];
    }

    setTitle(title){
        this.title = title;
    }

    setDescription(description){
        this.description = description;
    }

    setDueDate(dueDate){
        this.dueDate = dueDate;
    }

    setTime(time){
        this.time = time;
    }

    setPriority(priority){
        this.priority = priority;
    }

    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getDueDate(){
        return this.dueDate;
    }

    getTime(){
        return this.time;
    }

    getPriority(){
        return this.priority;
    }

    getId(){
        return this.id;
    }

    getDone(){
        return this.done;
    }
    
    toggleDone(){
        this.done = !this.done;
    }

    addSubtask(subtask) {
        this.subtasks.push(subtask);
    }

    getSubtasks() {
        return this.subtasks;
    }

    removeSubtask(subtaskId) {
        this.subtasks = this.subtasks.filter(subtask => subtask.getId() !== subtaskId);
    }

    toJSON(){
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            time: this.time,
            priority: this.priority,
            done: this.done,
            subtasks: this.subtasks.map(subtask => subtask.toJSON())
        };
    }
}
export { Task, Priority };