//configuracion de la tabla
new gridjs.Grid({
    search: true,
    pagination: {
        enabled: true,
        limit: 5,
        resetPagesOnUpdate: true,
    },
    sort: true,
    columns: ['Rut', 'Nombres', 'Apellidos', 'IP', 'Acciones'],
    server: {
        url: 'http://localhost:3000/api/segmento/',
        then: data => data.map(row => ({
            rut: row.rut,
            nombres: row.nombres,
            apellidos: row.apellido_pat + " " +row.apellido_mat,
            ip: row.ip,

            acciones: 
            gridjs.html(
                `<button class="btn btn-danger mx-3" onclick="obtenerId(${row.id})"><i class="fa-sharp fa-solid fa-trash"></i></button>` 
                +
                `<button class="btn btn-warning" id="editar" onclick="modalEditar(${row.id})"><i class="fa-regular fa-pen-to-square"></i></button>`
            )
    })),//cierra el then
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
  }).render(document.getElementById("tabla_ip"))

  