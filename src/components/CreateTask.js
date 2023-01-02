import { useState } from "react";

const CreateTask = ({
    taskCreateHandler
    // const taskCreateHandler = async (newTask) => {
//     const createdTask = await createTodo(newTask)
//     setTasks(state => [
//         ...state,
//         createdTask,
//     ]);
// };

// const taskCreateHandler = async (newTask) => {
//     const createdTask = await createTodo(newTask)
//     setTasks(state => [
//         ...state,
//         createdTask,
//     ]);
// };
}) => {
    const [task, setTask] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        if (task === "") {return}

        taskCreateHandler(task.trim())
        setTask('');
    }

    const onChagne = (e) => {
        setTask(e.target.value);
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="taskName"
                value={task}
                onChange={onChagne}
                placeholder="Do the dishes"
            />

            <input type="submit" value="Add" />
        </form>
    );
};

export default CreateTask;


