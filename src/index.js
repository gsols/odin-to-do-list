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
			const taskId = projectTask.getId?.() ?? projectTask.id;
			const task = taskService.getTaskById(taskId);
			if (!task) return;

			const taskProjectId = task.getProjectId?.() ?? task.projectId;
			if (taskProjectId !== projectId) {
				task.setProjectId?.(projectId);
				if (!task.setProjectId) task.projectId = projectId;
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
