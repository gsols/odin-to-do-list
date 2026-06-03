import { Project } from "./Project.js";
import { Task } from "Task.js";
import { Section } from "Section.js";

class AppController {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProjects() {
    return this.projects;
  }
}

export const appController = new AppController();
