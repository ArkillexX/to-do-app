import { createSlice } from '@reduxjs/toolkit';

//Creamos un slice con ReduxToolKit que define el estado inicial de la aplicación
//Y todas las funciones que desencadenan los eventos para exportarlas más tarde.
const todoSlice = createSlice({
  name: 'todoList',
  initialState: [],
  reducers: {
    addTarea: (state, action) => {
      state.push(action.payload);
    },
    deleteTarea: (state, action) => {
      return state.filter((tarea) => tarea.id !== action.payload);
    },
    editTarea: (state, action) => {
      const { id, text } = action.payload;
      const todoToEdit = state.find((tarea) => tarea.id === id);
      if (todoToEdit === true) {
        todoToEdit.texto = text;
      }
    },
  },
});

//Se deben indicar las funciones como "actions"
//Se debe indicar también que el Slice es el reducer
export const { addTarea, deleteTarea, editTarea } = todoSlice.actions;
export default todoSlice.reducer;
