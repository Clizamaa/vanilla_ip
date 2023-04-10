// Constantes
const run = document.getElementById('run');
const nombre = document.getElementById('nombre');
const paterno = document.getElementById('paterno');
const materno = document.getElementById('materno');
const inputRut = document.getElementById('run');
const tableBody_usuarios = document.querySelector("#tableBodyUsuarios");

// Variables
let funcionarios = {
    id: '',
    rut: '',
    nombres: '',
    apellido_pat: '',
    apellido_mat: '',
};
let dataTable;
let dataTableIsInitialized = false;

// Funciones
async function initDataTable() {
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listUser();
    dataTable = $("#datatable_usuarios").dataTable({
        lengthMenu: [
            [5, 10, 15, -1],
            [5, 10, 15, "Todos"]
        ],
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Buscar...",
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        responsive: true,
        autoWidth: false,
    });
    dataTableIsInitialized = true;
};

async function listUser() {
    try {
        const response= await fetch('http://localhost:3000/api/funcionario');
        const data= await response.json();

        let content= ``;
        data.forEach((user, index)=>{
            content+= `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.rut}</td>
                    <td>${user.nombres}</td>
                    <td>${user.apellido_pat +" "+ user.apellido_mat}</td>
                    <td>
                    <button type="button" onclick="editModal('${user.id}')" class="btn btn-warning"><i class="fa-solid fa-edit"></i></button>
                    <button type="button" onclick="eliminar('${user.id}')" class="btn btn-danger\"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody_usuarios.innerHTML= content;
    } catch (error) {
        alert(error);
    }
};

async function buscarFuncionarios() {
    try{
        const response = await fetch('http://localhost:3000/api/funcionario');
        const data = await response.json()
        for (let i = 0; i < data.length; i++) {
            funcionarios.id = data[i].id;
            funcionarios.rut = data[i].rut;
            funcionarios.nombres = data[i].nombres;
            funcionarios.apellido_pat = data[i].apellido_pat;
            funcionarios.apellido_mat = data[i].apellido_mat;
        }
    } catch(error){
        console.log(error);
    }
}

async function crearFuncionario() {
    const url = 'http://localhost:3000/api/funcionario';
    toUpperCaseInputs();
    const data = {
        rut: run.value,
        nombres: nombre.value,
        apellido_pat: paterno.value,
        apellido_mat: materno.value,
    };

    if(run.value.trim().length == 0 || nombre.value.trim().length == 0 || paterno.value.trim().length == 0 || materno.value.trim().length == 0) {
        Swal.fire(
            'Error',
            'Completa todos los campos!',
            'error'
        )
        return;
    } else {
        Swal.fire(
            'Exito',
            'Funcionario creado!',
            'success',
            {
                timer: 2000
            }
        )
        setTimeout(function(){ window.location.href = "http://127.0.0.1:5500/crear_funcionario.html"; }, 2000);
    }
    
    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    });
   
    run.value = '';
    nombre.value = '';
    paterno.value = '';
    materno.value = '';
}

async function editModal(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/funcionario/${id}`);
        const data = await response.json();
        
        const { value: formValues } = await Swal.fire({
            title: "Editar",
            html:
                `<input id="runn" class="swal2-input" placeholder="Rut" value='${data.id}'>` +
                `<input id="nombress" class="swal2-input" placeholder="Nombre" value='${data.nombres}'>` +
                `<input id="apellido_pat" class="swal2-input" placeholder="Apellido paterno" value='${data.apellido_pat}'>` +
                `<input id="apellido_mat" class="swal2-input" placeholder="Apellido materno" value='${data.apellido_mat}'>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById("runn").value,
                    document.getElementById("nombress").value,
                    document.getElementById("apellido_pat").value,
                    document.getElementById("apellido_mat").value,
                ];
            },
        });

        if (formValues) {
            await Swal.fire({
                title: "Actualizado",
                text: "Usuario modificado correctamente",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });

            await editar(id, ...formValues);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        console.log(error);
    }
}

async function editar(id, run, nombre, apellido_pat, apellido_mat) {
    const url = `http://localhost:3000/api/funcionario/${id}`;
    await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rut: run,
            nombres: nombre,
            apellido_pat: apellido_pat,
            apellido_mat: apellido_mat
        })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}

function obtenerId(id) {
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

function eliminar(id) {
    Swal.fire({
        title: '¿Estas Seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            const url = `http://localhost:3000/api/funcionario/${id}`;
            fetch(url, {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(response => {
                Swal.fire(
                  'Eliminado',
                  'Usuario Eliminado Correctamente',
                  'success'
                );
                location.reload();
            })
            .catch(error => console.error('Error:', error))
       
