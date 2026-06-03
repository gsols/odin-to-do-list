const Priority = Object.freeze({
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
});

class Task{
    constructor(title, description, dueDate, time, priority){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.time = time;
        this.priority = priority;
        this.done = false;
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
}

export { Task, Priority };