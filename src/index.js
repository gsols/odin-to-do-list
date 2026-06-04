import "./styles.css";
import { TaskService } from "./TaskService.js";
import { ProjectService } from "./ProjectService.js";
import initDisplay from "./displayController.js";

const taskService = new TaskService();
taskService.loadFromLocalStorage();
const projectService = new ProjectService();
projectService.loadFromLocalStorage();

function reconcileTaskProjectIds(taskService, projectService) {
	let changed = false;

	projectService.getProjects().forEach(project => {
		const projectId = project.getId?.() ?? project.id;
		const tasks = project.getTasks?.() ?? project.tasks ?? [];

		tasks.forEach(projectTask => {
			// projectTask may be a task id (string) or a task object; normalize to id
			const taskId = (typeof projectTask === 'string') ? projectTask : (projectTask.getId?.() ?? projectTask.id);
			const task = taskService.getTaskById(taskId);
			if (!task) return;

			const taskProjectId = task.getProjectId?.() ?? task.projectId;
			if (taskProjectId !== projectId) {
				if (typeof task.setProjectId === 'function') task.setProjectId(projectId);
				else task.projectId = projectId;
				changed = true;
			}
		});
	});

	if (changed) {
		taskService.saveToLocalStorage();
	}
}

reconcileTaskProjectIds(taskService, projectService);

// initialize UI after DOM is parsed so elements from template.html exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => initDisplay(taskService, projectService));
} else {
	initDisplay(taskService, projectService);
}
