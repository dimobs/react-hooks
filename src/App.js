import { TaskContext } from './contexts/TaskContext'; //react
import useFetch from './hooks/useFetch'; //loading..., fetch
import useTodosApi from './hooks/useTodos';  //CRUD

import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask'; //add task
import styles from './App.module.css';
import DropDwonsMenu from './components/dropDwnMu/DropDownMenu';

function App() {
    const [tasks, setTasks, isLoading] = useFetch('http://localhost:3030/jsonstore/todos', []);
    const { removeTodo, createTodo, updateTodo } = useTodosApi();

    const taskCreateHandler = async (newTask) => {
        const createdTask = await createTodo(newTask)
        setTasks(state => [
            ...state,
            createdTask,
        ]);
    };

    const taskDeleteHandler = async (taskId) => {
        await removeTodo(taskId);

        setTasks(state => state.filter(x => x._id != taskId));
    };

    const toggleTask = async (task) => {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };

        await updateTodo(task._id, updatedTask);

        setTasks(state => state.map(x => x._id == task._id ? updatedTask : x))
    };

    const taskEditHandler = async (task, newTitle) => {
        const updatedTask = { ...task, title: newTitle };

        await updateTodo(task._id, updatedTask);

        setTasks(state => state.map(x => x._id == task._id ? updatedTask : x))
    }

    return (
        <TaskContext.Provider value={{ tasks, taskDeleteHandler, toggleTask, taskEditHandler }}>
            <div className={styles['site-wrapper']}>

                <header>
                    <h1>TODO App</h1>
                </header>
                <main>
                    {isLoading
                        ? <p>Loading...</p>
                        : <TaskList />
                    }

                    <CreateTask taskCreateHandler={taskCreateHandler} />
                </main>
                <section>
                  <DropDwonsMenu />
                    {isLoading 
                        ? <p>Loading...</p>  
                        : <p>Done!</p> 
                    }
                </section>

            </div>
        </TaskContext.Provider>
    );
}

export default App;
