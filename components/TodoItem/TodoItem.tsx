import styles from "./TodoItem.module.scss";
import { Todo } from "../../lib/types";
type TodoItemProps = {
    todo: Todo;
    onComplete: Function;
};

export default function TodoItem({
    todo,
    onComplete,
}: TodoItemProps): JSX.Element {
    
    return (
        <li className={styles.todo} onClick={() => onComplete()}>
            {todo.isComplete ? (
                <span className={styles.complete}>{todo.text}</span>
            ) : (
                <span>{todo.text}</span>
            )}
        </li>
    );
}
