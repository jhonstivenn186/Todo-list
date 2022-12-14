import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function App(props) {

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  };

  const FILTER_NAMES = Object.keys(FILTER_MAP);

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

 /* const tasksNoun = tasks.length !== 1 ? 'tasks' : 'task';*/
  const tasksNoun = tasks.length !== 1 ? 'Tareas' : 'Tarea';
  const pendientesNoun = tasks.length !== 1 ? 'Pendientes' : 'Pendiente';
 /* const headingText = `${tasks.length} ${tasksNoun} Pendiente`;*/
 const headingText = ` ${tasks.length} ${tasksNoun} ${pendientesNoun}`;

  

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }  

  function FilterButton(props) {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.name)}
      >
        <span className="visually-hidden">Show </span>
        <span>{props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    );
  }
  
  const taskList = tasks.filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);  

  return (
    <div className="todoapp stack-large">
      <h1 className="t-stroke-shadow">TodoMatic</h1>
      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
