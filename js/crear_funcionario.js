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
        limit: 10,
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
            acciones: gridjs.h('button', {
                className: 'btn btn-danger',
                onClick: () => {
                    Swal.fire({
                        title: '¿Está seguro?',
                        text: "No podrá revertir estos cambios",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, eliminar'
                      }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire(
                                'Eliminado!',
                                'El funcionario ha sido eliminado.',
                                'success'
                              )
                            fetch('http://localhost:3000/api/funcionario/:id', {
                                method: 'DELETE',
                                body: JSON.stringify({rut: row.rut}),
                                headers:{
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => console.log('Success:', response));
                        }
                      })
                }
            }, 'Eliminar'),

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

