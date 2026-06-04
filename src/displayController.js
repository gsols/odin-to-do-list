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

function renderProjects(projectService, projectsList) {
    projectsList.innerHTML = '';
    const projects = projectService.getProjects();
    projects.forEach(p => {
        const el = document.createElement('div');
        el.className = 'project-item';
        el.textContent = p.getName?.() ?? p.name;
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => renderProjectView(p));
        projectsList.appendChild(el);
    });

    function renderProjectView(project) {
        // show tasks that belong directly to project (not in sections) for now
        const content = document.getElementById('content');
        content.innerHTML = `<h2>${project.getName?.() ?? project.name}</h2>`;
        const wrapper = document.createElement('div');
        const tasks = project.getTasks?.() ?? project.tasks ?? [];
        if (tasks.length === 0) wrapper.textContent = 'No tasks in this project.';
        tasks.forEach(t => {
            const row = document.createElement('div');
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = !!(t.getDone?.() ?? t.done);
            cb.addEventListener('change', () => {
                // toggle via global taskService (look up by id)
                const globalTaskService = window.__taskService;
                if (globalTaskService) {
                    globalTaskService.toggleTaskDone(t.getId?.() ?? t.id);
                }
                renderProjectView(project);
            });
            row.appendChild(cb);
            const title = document.createElement('span');
            title.textContent = t.getTitle?.() ?? t.title;
            row.appendChild(title);
            wrapper.appendChild(row);
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
            taskService.addTask(titleInput.value, desc.value, due.value || null, time.value || null, priority.value || null, projectSelect.value === 'lonely-tasks' ? null : projectSelect.value);
        } catch (err) {
            alert(err.message || 'Failed to create task');
        }
        addTaskDialog.close();
    });


    document.body.appendChild(addTaskDialog);
    addTaskDialog.showModal();
}


function showLonelyTasks(taskService, content) {
    content.innerHTML = '<h1>Lonely Tasks</h1>';
    content.classList.add('lonely-tasks-view');
    const list = document.createElement('div');
    const tasks = taskService.getTasks().filter(t => !t.parentId && !(t.projectId));
    if (tasks.length === 0) list.textContent = 'No lonely tasks.';
    tasks.forEach(t => {
        const row = document.createElement('div');
        const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!(t.getDone?.() ?? t.done);
        cb.addEventListener('change', () => { taskService.toggleTaskDone(t.getId?.() ?? t.id); showLonelyTasks(taskService, content); });
        row.appendChild(cb);
        row.appendChild(document.createTextNode(t.getTitle?.() ?? t.title));
        list.appendChild(row);
    });
    content.appendChild(list);
}

function showAddProjectForm(projectService, projectsList) {
    const name = prompt('Enter project name:');
    if (name?.trim()) {
        projectService.addProject(name.trim());
        renderProjects(projectService, projectsList);
    }
}


function initDisplay(taskService, projectService) {
    // expose taskService for inner handlers that need it when rendering project views
    window.__taskService = taskService;

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
            content.innerHTML = '<h2>Today</h2>';
            const list = document.createElement('div');
            const today = new Date().toISOString().slice(0,10);
            const tasks = taskService.getTasks().filter(t => (t.dueDate === today));
            if (tasks.length === 0) list.textContent = 'No tasks for today.';
            tasks.forEach(t => {
                const row = document.createElement('div');
                const cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!(t.getDone?.() ?? t.done);
                cb.addEventListener('change', () => { taskService.toggleTaskDone(t.getId?.() ?? t.id); initDisplay(taskService, projectService); });
                row.appendChild(cb);
                row.appendChild(document.createTextNode(t.getTitle?.() ?? t.title));
                list.appendChild(row);
            });
            content.appendChild(list);
        });
    }

    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) {
        addProjectBtn.style.cursor = 'pointer';
        addProjectBtn.addEventListener('click', () => {
            const name = prompt('Enter project name:');
            if (name?.trim()) {
                projectService.addProject(name.trim());
                renderProjects(projectService, projectsList);
            }
        });
    }

    // render initial lists
    showLonelyTasks(taskService, content);
    renderProjects(projectService, projectsList);

    // refresh projects list when tasks change (simple event)
    projectsList.addEventListener('refresh', () => renderProjects(projectService, projectsList));
}

export default initDisplay;
