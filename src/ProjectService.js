import { ProjectFactory } from "./ProjectFactory.js";
import { SectionFactory } from "./SectionFactory.js";
import * as Storage from "./Storage.js";

class ProjectService {
    constructor(initialProjects = []) {
        this.projects = initialProjects;
        this.STORAGE_KEY = "projects";
    }

    loadFromLocalStorage() {
        this.projects = Storage.loadList(this.STORAGE_KEY, ProjectFactory);
    }

    saveToLocalStorage() {
        Storage.saveList(this.STORAGE_KEY, this.projects);
    }

    addProject(name) {
        const project = ProjectFactory.createProject(name);
        this.projects.push(project);
        this.saveToLocalStorage();
        return project;
    }

    deleteProject(id) {
        this.projects = this.projects.filter(project => project.getId() !== id);
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
        return section;
    }

    removesectionFromProject(projectId, sectionId) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.removeSection(sectionId);
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
        return true;
    }

    addTaskToProject(projectId, task) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.addTask(task);
        this.saveToLocalStorage();
        return task;
    }

    removeTaskFromProject(projectId, taskId) {
        const project = this.getProjectById(projectId);
        if (!project) {
            return null;
        }
        project.removeTask(taskId);
        this.saveToLocalStorage();
        return true;
    }
}

export { ProjectService };