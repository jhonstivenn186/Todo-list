import React, { useState } from "react";

function Form(props) {

    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
    }

    function handleChange(e) {
        setName(e.target.value);
    }
      

    return (
      <form onSubmit={handleSubmit}>
        <h3 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
          ¿Qué se necesita hacer?
          </label>
        </h3>
        <input
            type="text"
            id="new-todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Añadir tarea
        </button>
      </form>
    );
  }
  
  export default Form;