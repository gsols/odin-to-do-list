class Section {
    constructor(name, projectId){
        this.id = crypto.randomUUID();
        this.name = name;
        this.projectId;
        this.tasks = [];
    }

    getId(){
        return this.id;
    }

    getName(){
        return this.name;
    }

    getProjectId(){
        return this.projectId;
    }

    
    getTasks(){
        return this.tasks;
    }

    setProjectId(projectId){
        this.projectId = projectId;
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
