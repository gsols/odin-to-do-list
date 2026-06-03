class Section {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getTasks(){
        return this.tasks;
    }

    setName(name){
        this.name = name;
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(taskId){
        this.tasks = this.tasks.filter(task => task.getId() !== taskId);
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks.map(task => task.toJSON())
        };
    }
}
