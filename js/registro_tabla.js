window.addEventListener('load', async()=>{
  await initDataTable();
 });
 const btnRegistar= document.getElementById('btnRegistrar');

//configuracion de la tabla
let dataTable;
let dataTableIsInitialized = false;

const initDataTable = async() => {
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listUser();
    dataTable = $("#datatable_users").dataTable({
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

//funcion editar un usuario
const editUser= async(id)=>{
    try {
        const response= await fetch(`http://localhost:3000/api/segmento/${id}`);
        const data= await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};








  





  

  
