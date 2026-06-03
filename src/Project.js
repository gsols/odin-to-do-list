class Project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.tasks = [];
        this.sections = [];
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

    getSections(){
        return this.sections;
    }

    setName(name){
        this.name = name;
    }

    addTask(task){
        this.tasks.push(task);
    }

    addSection(section){
        this.sections.push(section);
    }

    removeTask(taskId){
        this.tasks = this.tasks.filter(task => task.getId() !== taskId);
    }

    removeSection(sectionId){
        this.sections = this.sections.filter(section => section.getId() !== sectionId);
    }
}

export { Project };