import { TaskContext } from "../contexts/TaskContext"; //from react
import { useEffect, useContext, useState } from "react";
import styles from './TaskItem.module.css';

const TaskItem = ({
    task
}) => {
    const [isEdit, setIsEdit] = useState(false);

    const { taskDeleteHandler, toggleTask, taskEditHandler } = useContext(TaskContext);

    useEffect(() => {
        // console.log('Mount');

        return () => {
            // console.log('Unmount');
        };
    }, []);

    const taskEditClickHandler = () => {
        setIsEdit(true);
    };

    const onEdit = (e) => {
        e.preventDefault();
        
        const { title } = Object.fromEntries(new FormData(e.target));
        taskEditHandler(task, title);

        setIsEdit(false);
    };

    const classNames = [
        task.isCompleted ? styles.completed : '',
        styles['task-item']
    ];

    return (
        <li>
            {isEdit
                ? <form onSubmit={onEdit}>
                    <input type="text" name="title" defaultValue={task.title} />
                    <input type="submit" value="edit" />
                </form>
                : <>
                    <span
                        className={classNames.join(' ')}
                        onClick={() => toggleTask(task)}
                    >
                        {task.title}
                    </span>
                    <button onClick={taskEditClickHandler}>edit</button>
                    <button onClick={() => taskDeleteHandler(task._id)}>x</button>
                </>
            }
        </li>
    );
};

export default TaskItem;
 //resurse: https://codesandbox.io/s/o6gdnj?file=/public/index.html