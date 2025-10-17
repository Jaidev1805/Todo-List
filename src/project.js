function Project(name, description) {
    this.name = name;
    this.description = description;
    this.todos = [];
}

Project.prototype.addTodo = function(todo) {
    this.todos.push(todo);
};

Project.prototype.removeTodo = function(index) {
    this.todos.splice(index, 1);
};

export default Project;