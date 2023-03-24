window.addEventListener('load', async()=>{
    await initDataTable();
   });

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
let dataTable;
let dataTableIsInitialized = false;

const initDataTable = async() => {
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

const listUser= async()=>{
    try {
        const response= await fetch('http://localhost:3000/api/segmento');
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
                    <button type="button" onclick="modalEditar('${user.id}')" class="btn btn-warning"><i class="fa-solid fa-edit"></i></button>
                    <button type="button" onclick="deleteIPUser('${user.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        // console.log(data);
        tableBody_usuarios.innerHTML= content;
    } catch (error) {
        alert(error);
    }
};


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







          





    


    


