const run = document.getElementById('run');
const nombre = document.getElementById('nombre');
const paterno = document.getElementById('paterno');
const materno = document.getElementById('materno');


function insertar(){
    const url = 'http://localhost:3000/api/funcionario';
    const data = {
        //rut corresponde al nombre de la columna en la base de datos
        //run corresponde al id del input 
        rut: run.value,
        nombres: nombre.value,
        apellido_pat: paterno.value,
        apellido_mat: materno.value,
    };
    // console.log(data);
    //run.value.trim().length==0 es para que no se pueda ingresar un campo vacio
    if(run.value.trim().length==0 || nombre.value.trim().length==0 || paterno.value.trim().length==0 || materno.value.trim().length==0){
        Swal.fire(
            'Error',
            'Completa todos los campos!',
            'error'
          )
        return;
    }else{
        Swal.fire(
            'Exito',
            'Funcionario creado!',
            'success'
            )
        setTimeout(function(){ window.location.href = "http://127.0.0.1:5500/crear_funcionario.html"; }, 2000);
    }
        
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

    run.value = '';
    nombre.value = '';
    paterno.value = '';
    materno.value = '';
}

//configuracion de la tabla
new gridjs.Grid({
    search: true,
    pagination: {
        enabled: true,
        limit: 5,
        resetPagesOnUpdate: true,
    },
    sort: true,
    columns: ['Rut', 'Nombre', 'Apellido_pat', 'Apellido_mat', 'Acciones'],
    server: {
        url: 'http://localhost:3000/api/funcionario',
        then: data => data.map(row => ({
            rut: row.rut,
            nombre: row.nombres,
            apellido_pat: row.apellido_pat,
            apellido_mat: row.apellido_mat,
            acciones: 
            gridjs.html(
                `<button class="btn btn-danger mx-3" onclick="obtenerId(${row.id})"><i class="fa-sharp fa-solid fa-trash"></i></button>` 
                +
                `<button class="btn btn-warning" id="editar" onclick="modalEditar(${row.id})"><i class="fa-regular fa-pen-to-square"></i></button>`
            )
    })), //cierra el then
    }, //cierra server
    style: {
        table: {
          border: '3px solid #ccc',
          width: '100%'
        },
        th: {
          'background-color': 'rgba(0, 0, 0, 0.1)',
          color: '#000',
          'border-bottom': '3px solid #ccc',
          'text-align': 'center'
        },
        td: {
          'text-align': 'center'
        }
      }
  }).render(document.getElementById("wrapper"))


function obtenerId(id){
    console.log(id)
    Swal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
        if (result.isConfirmed) {
            eliminar(id)
        }
        }
    )
}

function eliminar(id){
    const url = `http://localhost:3000/api/funcionario/${id}`;
    fetch(url, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout(function(){ window.location.href = "http://127.0.0.1:5500/crear_funcionario.html"; }, 1000);
}

function editar(id){
    const url = `http://localhost:3000/api/funcionario/${id}`;
    fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    setTimeout(function(){ window.location.href = "http://127.0.0.1:5500/crear_funcionario.html"; }, 1000);
}

function modalEditar(id){
    console.log(id)
    Swal.fire({
        title: 'Editar',
        html:
        '<input id="swal-input1" class="swal2-input" placeholder="Rut">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Apellido paterno">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Apellido materno">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
            ]
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire(JSON.stringify(result.value))
            editar(id)
        }
    })

}


const allusers = () => {
    fetch ('http://localhost:3000/api/funcionario')
    .then (res => res.json())
    .then (data => {
        console.log(data)
    })
}







          





    


    


