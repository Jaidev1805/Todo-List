function Todo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isCompleted = false;
}

Todo.prototype.toggleCompletion = function() {
    this.isCompleted = !this.isCompleted;
};

export default Todo;