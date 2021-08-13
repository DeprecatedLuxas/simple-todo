type Todo = {
    isComplete: boolean;
    text: string;
};

export function getTodos() {
    try {
        const todos = window.localStorage.getItem("todos");
        let todosList = [];
        if (typeof todos === "string") {
            todosList = JSON.parse(todos);
        } else {
            todosList = [];
        }

        return todosList;
    } catch (e) {
        console.error(e);
    }
}

export function saveTodos(todos: Todo[]) {
    window.localStorage.setItem("todos", JSON.stringify(todos));
}
