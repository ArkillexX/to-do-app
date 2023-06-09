import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Se crea la tienda con ReduxToolKit --> Acceso global a los datos de la aplicación
//Se configura la Store pasando un objeto que le indica el reducer que debe utilizar y su nombre
const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
// Función para cambiar el título de la pestaña
const changeTabTitle = (text) => {
  document.title = text;
};

// // Evento visibilitychange: se activa cuando se cambia entre pestañas o se minimiza la ventana del navegador
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    changeTabTitle("Vuelve a esta pestaña!");
  }
  else{
    changeTabTitle("To-Do-App")
  }
});
// Evento blur: se activa cuando la pestaña pierde el enfoque
window.addEventListener("blur", (e) => {
  changeTabTitle();
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
