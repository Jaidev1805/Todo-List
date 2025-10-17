import { addProject, addTodoToProject } from "./index.js";
import { projects } from "./saveload.js";

export const addProjectForm = document.getElementById("add-project-btn");
addProjectForm.addEventListener("click", () => {
    const input = document.createElement("modal");
    input.id = "project-input-modal";

    const name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Project Name";
    const description = document.createElement("textarea");
    description.placeholder = "Project Description";
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Add Project";
    submitBtn.onclick = () => {
        if (name.value && description.value) {
            addProject(name.value, description.value);
            document.body.removeChild(input);
        } else {
            alert("Please fill in all fields.");
        }
    };
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
        document.body.removeChild(input);
    };
    input.appendChild(name);
    input.appendChild(document.createElement("br"));
    input.appendChild(description);
    input.appendChild(document.createElement("br"));
    input.appendChild(document.createElement("br"));
    input.appendChild(submitBtn);
    input.appendChild(cancelBtn);
    document.body.appendChild(input);
});

export const createTodoModal = (projectIndex) => {
    const input = document.createElement("modal"); 
    input.id = "todo-input-modal";

    const projectDisplay = document.createElement("h3");
    projectDisplay.textContent = `Adding Todo to: ${projects[projectIndex].name}`;
    
    const title = document.createElement("input");
    title.type = "text";
    title.placeholder = "Todo Title";

    const description = document.createElement("textarea"); 
    description.placeholder = "Todo Description";
    
    const dueDate = document.createElement("input");
    dueDate.type = "date";
    
    const priority = document.createElement("select");
    ["Low", "Medium", "High"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        priority.appendChild(option);
    });
    
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Add Todo";
    submitBtn.onclick = () => {
        if (title.value && description.value && dueDate.value && priority.value) {
            addTodoToProject(projectIndex, title.value, description.value, dueDate.value, priority.value);
            document.body.removeChild(input);
            
        } else {
            alert("Please fill in all fields.");
        }
    };
    
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => {
        document.body.removeChild(input);
    };

    input.appendChild(projectDisplay);
    input.appendChild(document.createElement("br"));
    input.appendChild(title);
    input.appendChild(document.createElement("br"));
    input.appendChild(description);
    input.appendChild(document.createElement("br"));
    input.appendChild(dueDate);
    input.appendChild(document.createElement("br"));
    input.appendChild(priority);
    input.appendChild(document.createElement("br"));
    input.appendChild(document.createElement("br"));
    input.appendChild(submitBtn);
    input.appendChild(cancelBtn);
    document.body.appendChild(input);
};