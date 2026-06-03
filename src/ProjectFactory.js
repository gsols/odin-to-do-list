import { Project } from "./Project.js";

class ProjectFactory { 
    static createProject(name) {
        if (!name?.trim()) {
            throw new Error("Project name is required");
        }
        return new Project(name.trim());
    }
}

export { ProjectFactory };