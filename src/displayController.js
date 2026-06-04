// Functional display controller (no class) that uses the HTML structure from template.html
function createElementsIfNeeded() {
    // projects list container lives inside .projects-div (after its header)
    const projectsDiv = document.querySelector('.projects-div');
    if (!projectsDiv) throw new Error('template missing .projects-div');

    // ensure a container for project items
    let list = projectsDiv.querySelector('.projects-list');
    if (!list) {
        list = document.createElement('div');
        list.className = 'projects-list';
        projectsDiv.appendChild(list);
    }

    // ensure content area exists
    const content = document.getElementById('content');
    if (!content) throw new Error('template missing #content');
    return { projectsList: list, content };
}

function renderProjects(projectService, projectsList, taskService) {
    projectsList.innerHTML = '';
    const projects = projectService.getProjects();
    projects.forEach(p => {
        const el = document.createElement('div');
        el.className = 'project-item';
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pound</title><path d="M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z" /></svg> ${p.getName?.() ?? p.name}`;
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => renderProjectView(p));
        projectsList.appendChild(el);
    });

    function renderProjectView(project) {
        // show tasks that belong directly to project (not in sections) for now
        const content = document.getElementById('content');
        content.innerHTML = `<h2>${project.getName?.() ?? project.name}</h2>`;
        const wrapper = document.createElement('div');
        const projId = project.getId?.() ?? project.id;
        const tasks = (taskService && typeof taskService.getTasks === 'function')
            ? taskService.getTasks().filter(t => {
                const pid = (typeof t.getProjectId === 'function') ? t.getProjectId() : t.projectId;
                return pid == projId && !(t.getDone?.() || t.done);
            })
            : (project.getTasks?.() ?? project.tasks ?? []);
        if (tasks.length === 0) wrapper.textContent = 'No tasks in this project.';
        tasks.forEach(t => {
            
            console.log('renderProjectView:', { id: t.getId?.() ?? t.id, done: t.getDone?.() ?? t.done, projectId: t.getProjectId?.() ?? t.projectId });
            renderTaskItem(t, taskService, () => renderProjectView(project));

            wrapper.appendChild(renderTaskItem(t, taskService, () => renderProjectView(project)));
        });
        content.appendChild(wrapper);
    }
}




function showAddTaskForm(taskService, projectService, content) {
    const addTaskDialog = document.createElement('dialog');
    const form = document.createElement('form');
    addTaskDialog.appendChild(form);

    const titleInput = document.createElement('input');
    titleInput.placeholder = 'Title';
    titleInput.required = true;
    const desc = document.createElement('input');
    desc.placeholder = 'Description';
    const due = document.createElement('input');
    due.type = 'date';
    const time = document.createElement('input');
    time.type = 'time';
    const priority = document.createElement('select');
    ['','Low','Medium','High'].forEach(v => {
        const o = document.createElement('option'); o.value = v; o.textContent = v || 'Priority';
        priority.appendChild(o);
    });

    const projectSelect = document.createElement('select');
    projectSelect.classList.add('project-select');
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Lonely Tasks';
    defaultOption.value = 'lonely-tasks';
    projectSelect.appendChild(defaultOption);
    const projects = projectService.getProjects?.() ?? [];
    projects.forEach(p => {
        const o = document.createElement('option');
        o.value = p.getId?.() ?? p.id;
        o.textContent = p.getName?.() ?? p.name;
        projectSelect.appendChild(o);
    });


    const actionDiv = document.createElement('div');
    actionDiv.classList.add('form-actions');

    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancel';
    cancel.addEventListener('click', () => addTaskDialog.close());
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Create';

    const lastRow = document.createElement('div');
    lastRow.classList.add('form-last-row');

    form.appendChild(titleInput);
    form.appendChild(desc);
    form.appendChild(due);
    form.appendChild(time);
    form.appendChild(priority);
    form.appendChild(lastRow);
    lastRow.appendChild(projectSelect);
    actionDiv.appendChild(cancel);
    actionDiv.appendChild(submit);
    lastRow.appendChild(actionDiv);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        try {
            const projectId = projectSelect.value === 'lonely-tasks' ? null : projectSelect.value;
            const task = taskService.addTask(titleInput.value, desc.value, due.value || null, time.value || null, priority.value || null, projectId);
            if (projectId) {
                projectService.addTaskToProject?.(projectId, task);
            }
        } catch (err) {
            alert(err.message || 'Failed to create task');
        }
        showLonelyTasks(taskService, content); // refresh view (could be smarter and only refresh if added to current view)
        addTaskDialog.close();
    });


    document.body.appendChild(addTaskDialog);
    addTaskDialog.showModal();
}


function showLonelyTasks(taskService, content) {
    content.innerHTML = '<h1>Lonely Tasks</h1>';
    content.classList.add('lonely-tasks-view');
    const list = document.createElement('div');
        const tasks = taskService.getTasks().filter(t => {
            const done = t.getDone?.() ?? t.done;
            const projectId = (typeof t.getProjectId === 'function') ? t.getProjectId() : t.projectId;
            return !done && (projectId == null);
        });
    if (tasks.length === 0) list.textContent = 'No lonely tasks. Great job!';
    tasks.forEach(t => {
        console.log(t.getProjectId?.());
        list.appendChild(renderTaskItem(t, taskService, () => showLonelyTasks(taskService, content)));
    });
    content.appendChild(list);
}

function renderTaskItem(task, taskService, refreshCallback) {
    const row = document.createElement('div');
    row.classList.add('task-item');
    const circleCb = document.createElement('label');
    circleCb.classList.add('circle-checkbox');
    const cb = document.createElement('input'); 
    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');
    circleCb.appendChild(cb);
    circleCb.appendChild(checkmark);
    cb.type = 'checkbox'; cb.checked = !!(task.getDone?.() ?? task.done);
    const check = document.createElement('span');
    cb.appendChild(check);
    cb.addEventListener('change', () => { 
        taskService.toggleTaskDone(task.getId?.() ?? task.id); 
        if (typeof refreshCallback === 'function') {
            refreshCallback();
        }
    });
    row.appendChild(cb);
    row.appendChild(document.createTextNode(task.getTitle?.() ?? task.title));
    return row;
}

function showTodayTasks(taskService, content) {
    content.innerHTML = '<h1>Today</h1>';
    const list = document.createElement('div');
    const today = new Date().toISOString().slice(0,10);
    const tasks = taskService.getTasks().filter(t => (t.dueDate === today) && !(t.getDone?.() || t.done));
    if (tasks.length === 0) list.textContent = 'No tasks for today.';
    tasks.forEach(t => {
        const render = renderTaskItem(t, taskService, () => showTodayTasks(taskService, content));
        list.appendChild(render);
    });
    content.appendChild(list);
}

function showcompletedTasks(taskService, content) {
    content.innerHTML = '<h1>Completed Tasks</h1>';
    const list = document.createElement('div');
    const tasks = taskService.getTasks().filter(t => t.getDone?.() || t.done);
    if (tasks.length === 0) list.textContent = 'No completed tasks yet.';
    tasks.forEach(t => {
        list.appendChild(renderTaskItem(t, taskService, () => showcompletedTasks(taskService, content)));
    });
    content.appendChild(list);
}   

function createNewProject(projectService, projectsList) {
    const newProjectInput = document.createElement('form');
    const input = document.createElement('input');
    const submit = document.createElement('button');
    const cancel = document.createElement('button');
    newProjectInput.classList.add('new-project-input');
    submit.classList.add('new-project-submit-btn');
    submit.textContent = `Add`;
    cancel.classList.add('new-project-cancel-btn');
    cancel.textContent = 'Cancel';
    projectsList.appendChild(newProjectInput);
    newProjectInput.appendChild(input);
    newProjectInput.appendChild(cancel);
    newProjectInput.appendChild(submit);
    input.focus();
    input.required = true;

    cancel.type = 'button';
    cancel.addEventListener('click', () => newProjectInput.remove());
    // ensure the button is explicitly a non-form button (avoid unexpected submit behavior)
    submit.type = 'submit';
    newProjectInput.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = input.value;
        if (name?.trim()) {
            projectService.addProject(name.trim());
        }
        newProjectInput.remove();
        renderProjects(projectService, projectsList);
    });

    // listen on the text input for Enter (and Escape to cancel) — keydown on the button
    // won't fire when the input has focus, so this ensures Enter works as expected.
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            submit.click();
        } else if (e.key === 'Escape') {
            cancel.click();
        }
    });


}


function initDisplay(taskService, projectService) {
    // use explicit taskService parameter instead of storing a global on window

    const { projectsList, content } = createElementsIfNeeded();

    // wire side-nav buttons
    const sideNav = document.querySelector('.side-nav');
    if (sideNav) {
        const children = sideNav.querySelectorAll('div');
        // first div is Add Task
        if (children[0]) children[0].addEventListener('click', () => showAddTaskForm(taskService, projectService, content));
        // second - lonely tasks
        if (children[1]) children[1].addEventListener('click', () => {
            showLonelyTasks(taskService, content);
        });
        // third - today (simple filter by dueDate===today)
        if (children[2]) children[2].addEventListener('click', () => { 
            showTodayTasks(taskService, content);
        });
        if (children[3]) children[3].addEventListener('click', () => {
            showcompletedTasks(taskService, content);
        });
    }
    
    const addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.classList.add('add-project-btn');
    addProjectBtn.type = 'button';

    addProjectBtn.addEventListener('click', () => {
        createNewProject(projectService, projectsList);
    });

    // render initial lists
    showLonelyTasks(taskService, content);
    renderProjects(projectService, projectsList, taskService);

    // refresh projects list when tasks change (simple event)
    projectsList.addEventListener('refresh', () => renderProjects(projectService, projectsList, taskService));
}

export default initDisplay;
