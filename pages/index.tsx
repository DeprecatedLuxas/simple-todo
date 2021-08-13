import { useEffect, useState, useRef, useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import TodoItem from "../components/TodoItem/TodoItem";
import { Todo } from "../lib/types";
import { getTodos, saveTodos } from "../lib/todos";

const Home: NextPage = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setTodos(getTodos());
    }, []);

    const completeTodo = (todo: Todo) => {
        const updatedTodos = todos;
        updatedTodos[todos.indexOf(todo)].isComplete = !todo.isComplete;

        saveTodos(updatedTodos);
        setTodos(updatedTodos);
    };
    const addTodoHandler = useCallback(
        (todo: Todo) => {
            const newTodoItems: Todo[] = [
                {
                    id: `todo-${todos.length + 1}`,
                    isComplete: false,
                    text: todo.text,
                },
                ...todos,
            ];

            setTodos(newTodoItems);

            saveTodos(newTodoItems);
        },
        [todos]
    );

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Simple Todo App</title>
                <meta name="description" content="Simple Todo App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1 className={styles.header}>Simple Todo App</h1>
                    <form
                        className={styles.input_wrapper}
                        onSubmit={(e) => {
                            e.preventDefault();

                            if (inputRef && inputRef.current) {
                                if (inputRef.current.value !== "") {
                                    addTodoHandler({
                                        isComplete: false,
                                        text: inputRef.current.value,
                                    });
                                    inputRef.current.value = "";
                                }
                            }
                        }}
                    >
                        <input
                            className={styles.input}
                            ref={inputRef}
                            type="text"
                            placeholder="Write your todo"
                        />
                        <button type="submit" className={styles.button}>
                            Add
                        </button>
                    </form>

                    {todos.length > 0 ? (
                        <ul className={styles.todos_container}>
                            {todos.map((todo, index) => (
                                <TodoItem
                                    key={`todo-${index}`}
                                    todo={todo}
                                    onComplete={() => completeTodo(todo)}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className={styles.no_todos}>
                            You haven&apos;t created any todos
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
