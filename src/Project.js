class Project {
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        // store task ids only to avoid duplicate task objects
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

    addTask(taskOrId){
        // accept either a Task object or a task id string
        if (!taskOrId) return;
        const id = (typeof taskOrId === 'string') ? taskOrId : (taskOrId.getId?.() ?? taskOrId.id);
        if (!this.tasks.includes(id)) this.tasks.push(id);
    }

    addSection(section){
        this.sections.push(section);
    }

    removeTask(taskId){
        this.tasks = this.tasks.filter(id => id !== taskId);
    }

    removeSection(sectionId){
        this.sections = this.sections.filter(section => section.getId() !== sectionId);
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            // tasks are stored as ids
            tasks: this.tasks.slice(),
            sections: this.sections.map(section => section.toJSON())
        };
    }
}

export { Project };