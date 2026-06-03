


const renderProjects = () => {
    const projects = projectService.getProjects();
    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.classList.add("project");
        projectElement.innerText = project.getName();
        document.getElementById("projects").appendChild(projectElement);
    });
};