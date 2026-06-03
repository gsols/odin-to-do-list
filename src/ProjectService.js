import { ProjectFactory } from "./ProjectFactory.js";
import { SectionFactory } from "./SectionFactory.js";

class ProjectService {
    constructor(initialProjects = []) {
        this.projects = initialProjects;
    }

    addProject(name) {
        const project = ProjectFactory.createProject(name);
        this.projects.push(project);
        return project;
    }

    deleteProject(id) {
        this.projects = this.projects.filter(project => project.getId() !== id);
    }

    getProjects() {
        return this.projects;
    }

    getProjectById(id) {
        return this.projects.find(project => project.getId() === id);
    }

    addSectionToProject(projectId, sectionName) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        const section = SectionFactory.createSection(sectionName);
        project.addSection(section);
        return section;
    }

    removesectionFromProject(projectId, sectionId) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.removeSection(sectionId);
        return true;
    }

    addTaskToSection(projectId, sectionId, task) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        const section = project.getSectionById(sectionId);
        if (!section) {
            return null;
        }
        section.addTask(task);
        return task;
    }

    removeTaskFromSection(projectId, sectionId, taskId) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        const section = project.getSectionById(sectionId);
        if (!section) {
            return null;
        }
        section.removeTask(taskId);
        return true;
    }

    addTaskToProject(projectId, task) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.addTask(task);
        return task;
    }

    removeTaskFromProject(projectId, taskId) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.removeTask(taskId);
        return true;
    }
}

export { ProjectService };