import { login, logout } from './auth.js';

const loginApp = document.getElementById('login');
const logOut = document.getElementById('logOut');

let currentUser;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        console.log("Usuario Logeado:",currentUser.displayName);
        init();
    }else{
        console.log('No hay usuario');
    }
});


loginApp.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
       currentUser = await login();
    } catch (error) {
        console.log(error);
    }
});
logOut.addEventListener('click',  (e) => {
    logout();
});

function init(){
    window.location.href = "crear_funcionario.html";
  }
  