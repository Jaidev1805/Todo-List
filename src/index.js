import "./styles.css";
import Project from "./project.js";
import Todo from "./todo.js";
import { saveProject, loadProject, projects } from "./saveload.js";
import {addProjectForm, createTodoModal} from "./DOM.js";

export function addProject(name, description) {
    let project = new Project(name, description);
    projects.push(project);
    saveProject();
    renderProject();
}

function deleteProject(index) {
    projects.splice(index, 1);
    saveProject();
    renderProject();
}

export function addTodoToProject(projectIndex, title, description, dueDate, priority) {
    let todo = new Todo(title, description, dueDate, priority);
    projects[projectIndex].addTodo(todo);
    saveProject();
    renderProject();
}

function deleteTodoFromProject(projectIndex, todoIndex) {
    projects[projectIndex].removeTodo(todoIndex);
    saveProject();
    renderProject();
}

function renderProject(){
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = "";

    if (projects.length === 0) {
    projectList.innerHTML = "<p>No projects yet. Add one to get started!</p>";
    return;
    }

    projects.forEach ((project, pindex) => {
        const pdiv = document.createElement("div");
        pdiv.className = "Project";
        const ptitle = document.createElement("h2");
        ptitle.textContent = project.name;
        const pdesc = document.createElement("p");
        pdesc.textContent = project.description;
        const deletePBtn = document.createElement("button");
        deletePBtn.classList = "cancel-btn";
        deletePBtn.textContent = "Delete Project";
        deletePBtn.onclick = () => deleteProject(pindex);
        const AddTodoBtn = document.createElement("button");
        AddTodoBtn.classList = "add-todo-project-btn";
        AddTodoBtn.textContent = "Add Todo to " + project.name;
        AddTodoBtn.onclick = () =>{ 
            createTodoModal(pindex);}

        pdiv.appendChild(ptitle);
        pdiv.appendChild(pdesc);
        pdiv.appendChild(deletePBtn);
        pdiv.appendChild(AddTodoBtn);
        
        const todosHeader = document.createElement("h3");
        todosHeader.textContent = "Todos:";
        pdiv.appendChild(document.createElement("br"));
        if (project.todos.length === 0) {
            const noTodosMsg = document.createElement("p");
            noTodosMsg.textContent = "No Todos in this project.";
            const brElem = document.createElement("br");
            pdiv.appendChild(brElem);
            pdiv.appendChild(noTodosMsg);
        }else {
            pdiv.appendChild(todosHeader);
        }
        const todoList = document.createElement("ul");
        project.todos.forEach((todo, tindex) => {
        const titem = document.createElement("li");
        titem.className = "todo-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "todo-completed-checkbox";
        checkbox.checked = todo.isCompleted;
        checkbox.onchange = () => {
            todo.isCompleted = checkbox.checked;
            saveProject();
            renderProject();
        };

        const ttitle = document.createElement("strong");
        ttitle.textContent = todo.title;
        const tinfo = document.createElement("span");
        tinfo.innerHTML = ` ${todo.description}
                            Due : ${todo.dueDate}
                            Priority : ${todo.priority}`;
        
        const deleteTBtn = document.createElement("button");
        deleteTBtn.textContent = "Delete Todo";
        deleteTBtn.className = "cancel-btn";
        deleteTBtn.onclick = () => deleteTodoFromProject(pindex, tindex);

        const todoContent = document.createElement('div');
        todoContent.className = "todo-content";
        const align = document.createElement('div');
        align.className = "align-checkbox";

        if (todo.isCompleted) {
            align.classList.add("completed");
            tinfo.classList.add("completed");
        }

        align.appendChild(checkbox);
        align.appendChild(ttitle);
        titem.appendChild(tinfo);
        titem.appendChild(todoContent);
        titem.appendChild(deleteTBtn);
        todoList.appendChild(align);
        todoList.appendChild(titem);
    });
        pdiv.appendChild(todoList);
        projectList.appendChild(pdiv);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addProjectForm;
    loadProject();
    renderProject();
});