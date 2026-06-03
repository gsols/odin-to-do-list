import "./styles.css"
import { Priority } from "./Priority.js";
import { saveToLocalStorage } from "./Storage.js";
import { TaskService } from "./TaskService.js";
import { ProjectService } from "./ProjectService.js";

const taskService = new TaskService();
taskService.loadFromLocalStorage();
const projectService = new ProjectService();
projectService.loadFromLocalStorage();
