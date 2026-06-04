import "./styles.css";
import { TaskService } from "./TaskService.js";
import { ProjectService } from "./ProjectService.js";
import initDisplay from "./displayController.js";

const taskService = new TaskService();
taskService.loadFromLocalStorage();
const projectService = new ProjectService();
projectService.loadFromLocalStorage();

// initialize UI after DOM is parsed so elements from template.html exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => initDisplay(taskService, projectService));
} else {
	initDisplay(taskService, projectService);
}

