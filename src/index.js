import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const DATA = [
  { id: "todo-0", name: "Comer", completed: true },
  { id: "todo-1", name: "Dormir", completed: false },
  { id: "todo-2", name: "Hacer ejercicio", completed: false }
];


ReactDOM.render(<App tasks={DATA} />, document.getElementById('root'));
