import Project from "./project.js";
import Todo from "./todo.js";

export let projects = [];

function saveProject() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProject() {
    let stored = localStorage.getItem("projects");
    if (stored) {
        let parsed = JSON.parse(stored);
        projects = parsed.map(p => {
            let project = new Project(p.name, p.description);
            project.todos = p.todos.map(t => {
                let todo = new Todo(t.title, t.description, t.dueDate, t.priority, t.isCompleted);
                return todo;
            });
            return project;
        });
    }
}

export { saveProject, loadProject };