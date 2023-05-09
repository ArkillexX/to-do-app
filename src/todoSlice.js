import { createSlice } from '@reduxjs/toolkit';

//Creamos un slice con ReduxToolKit que define el estado inicial de la aplicación
//Y todas las funciones que desencadenan los eventos para exportarlas más tarde.
let valorAnterior = "";
const guardarPrimerValor = (valor) =>{
  valorAnterior = valor;
}
const todoSlice = createSlice({
  name: 'todoList',
  initialState: [],
  reducers: {
    addTarea: (state, action) => {
      state.push(action.payload);
      guardarPrimerValor(action.payload.texto);
    },
    deleteTarea: (state, action) => {
      return state.filter((tarea) => tarea.id !== action.payload);
    },
    editTarea: (state, action) => {
      const { id, texto } = action.payload;
      const todoToEdit = state.find((tarea) => tarea.id === id);
      if (todoToEdit) {
        todoToEdit.texto = texto;
        //se genera un nuevo valor anterior al editarlo
        todoToEdit.valorAnterior = texto;
      }
    },
    checkBox:(state, action) => {
      const { id, checked} = action.payload;
      const todoToEdit = state.find((tarea) => tarea.id === id);
      if (checked) {
        todoToEdit.texto = "Completado";
      } else {
        todoToEdit.texto = todoToEdit.valorAnterior;
      }
    }
  },
});

//Se deben desestructurar las funciones como "actions" 
//Se debe indicar también que el Slice es el reducer
export const { addTarea, deleteTarea, editTarea, checkBox } = todoSlice.actions;
export default todoSlice.reducer;
