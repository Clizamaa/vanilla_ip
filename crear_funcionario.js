const run = document.getElementById('run');
const nombre = document.getElementById('nombre');
const paterno = document.getElementById('paterno');
const materno = document.getElementById('materno');

function insertar(){
// console.log('run');
    const url = 'http://localhost:3000/api/funcionario';
    const data = { 
        run: run.value,
        nombre: nombre.value,
        paterno: paterno.value,
        materno: materno.value,
    };
    console.log(data);

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

