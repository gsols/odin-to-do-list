import { Project } from "./Project.js";
import { SectionFactory } from "./SectionFactory.js";
import { TaskFactory } from "./TaskFactory.js";

class ProjectFactory { 
    static createProject(name) {
        if (!name?.trim()) {
            throw new Error("Project name is required");
        }
        return new Project(name.trim());
    }

    // revive a Project instance from plain JSON produced by Project.toJSON()
    static fromJSON(data) {
        if (!data) return null;
        const { id, name, tasks, sections } = data;
        const project = new Project(name);
        if (id !== undefined) project.id = id;
        project.tasks = Array.isArray(tasks)
            ? tasks.map(t => {
                // if tasks were saved as full objects, revive and use their id; if already ids, keep them
                if (typeof t === 'string') return t;
                const revived = (TaskFactory?.fromJSON ? TaskFactory.fromJSON(t) : t);
                return revived?.getId?.() ?? revived?.id ?? null;
            }).filter(Boolean)
            : [];
        project.sections = Array.isArray(sections)
            ? sections.map(s => SectionFactory.fromJSON(s))
            : [];
        return project;
    }
}

export { ProjectFactory };