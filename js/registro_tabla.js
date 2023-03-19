//configuracion de la tabla
let dataTable;
let dataTableIsInitialized = false;

const initDataTable = async() => {
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listUser();
    dataTable = $("#datatable_users").dataTable({});
    dataTableIsInitialized = true;
};


const listUser= async()=>{
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
                    <button type="button" class="btn btn-warning"><i class="fa-solid fa-pencil"></i></button> 
                    <button type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        tableBody_users.innerHTML= content;
    } catch (error) {
        alert(error);
    }
};

window.addEventListener('load', async()=>{
 await initDataTable();
});



  





  

  
