import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTarea, checkBox, deleteTarea, editTarea } from './todoSlice';
//CSS files
import './App.css';

function App() {
//Datos de la aplición por defecto
  const metadata = {
    constantes:{
    Title:"Lista de tareas",
    inputPlaceHolder:"Añadir Tareas",
    addButton:"Añadir",
    deleteButton:"Eliminar",
    editButton:"Editar"}
  }

  //useSelector nos permite extraer datos de store de Redux
  //useDispatch nos permite lanzar las accciones del slice creado
  const tareas = useSelector((state) => state.todos);
  const dispatch = useDispatch();


  const [tarea, setTarea] = useState('');

  const handleAñadir = () => {
  //Verifica que el campo no este vacio,elimina los espacios y dispara la acción
  //El Date.now() se utiliza para generar un identificador unico basado en el tiempo de creación de la tarea
    if (tarea.trim() !== '') {
      const nuevaTarea = {
        id: Date.now(),
        texto: tarea,
        valorAnterior:tarea
      };
      dispatch(addTarea(nuevaTarea));
      setTarea('');
    }
  };

  const handleBorrar = (id) => {
  //dispara la action pasando el id asignado a la tarea
    dispatch(deleteTarea(id));
  };

  const handleEditar = (id) => {
  //Localiza la tarea y actualiza su texto
  //Verifica si el nuevo campo contiene texto, ademas elimina los espacios en blanco
    const input2 = prompt("Introduce los nuevos datos").trim();
    if (input2 !== '') {
    const editedTodo = {
      id,
      texto: input2,
    };
    dispatch(editTarea(editedTodo));}
  };
  const handleCheckBox = (id,check) =>{
    const editedTodo = {
      id,
      checked:check,
    };
    dispatch(checkBox(editedTodo));
  } 

  return (
    <div className="indexApp">
      <h1>{metadata.constantes.Title}</h1>
      <input
        type="texto"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        placeholder={metadata.constantes.inputPlaceHolder}
      />
      <button onClick={handleAñadir}>{metadata.constantes.addButton}</button>
      <ul>

        {tareas.map((tarea) => (
          <li key={tarea.id}>
            <input
        type="checkbox"
        onChange={(e) => handleCheckBox(tarea.id,e.target.checked,tarea.texto)}/>
            {tarea.texto}
            <button onClick={() => handleEditar(tarea.id)}>
              {metadata.constantes.editButton}
            </button>
            <button onClick={() => handleBorrar(tarea.id)}>{metadata.constantes.deleteButton}</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
