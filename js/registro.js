const selectEstablecimiento = document.getElementById('select_establecimiento');
const selectipOficina = document.getElementById('select_ipOficina');
const inputRut = document.getElementById('run');
const btnBuscar = document.getElementById('btnBuscar');
const nombreFuncionario = document.getElementById('nombre');
const apellidoFuncionario = document.getElementById('apellido');
const div_ip = document.getElementById('div_ip');

//patron iife

let persona= {
    id: "",
    rut: "",
    nombres: "",
    apellido_pat: "",
    apellido_mat: "",
    id_listadoIpes: "",
    
}

function principal (){
    selectEstablecimiento.addEventListener('change', () => {
        if (selectEstablecimiento.value == "Seremi Central") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCentral();
        } else if (selectEstablecimiento.value == "COMPIN") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCompin();
        } else if (selectEstablecimiento.value == "Oficina Tome") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipTome();
        } else if (selectEstablecimiento.value == "Oficina Coronel") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCoronel();
        } else if (selectEstablecimiento.value == 1) {
            div_ip.setAttribute('hidden', true);
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = true;
        }
    })
}
principal();

const select_oficina = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/establecimiento');
        const data = await response.json()
         for (let i = 0; i < data.length; i++) {
             option = document.createElement("option");
             option.value= data[i].nombre;
             option.text= data[i].nombre;
             selectEstablecimiento.appendChild(option);
              //console.log(data[i])
         }
        //  console.log(data)
    } catch(error){
        console.log(error);
    }
}

const ipCentral = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/ipCentral');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].id;
            option.text= data[i].ip;
            selectipOficina.appendChild(option);
            // console.log(data[i].ip)
        }
    } catch(error){
        console.log(error);
    }
}

const ipCompin = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/ipCompin');
        const data = await response.json()
        // console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].id;
            option.text= data[i].ip;
            select_ipOficina.appendChild(option);
            // console.log(data[i].ip)
        }
    } catch(error){
        console.log(error);
    }
}

const ipCoronel = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/ipcoronel');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].id;
            option.text= data[i].ip;
            select_ipOficina.appendChild(option);
            // console.log(data[i].ip)
        }
    } catch(error){
        console.log(error);
    }
}

const ipTome = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/iptome');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].id;
            option.text= data[i].ip;
            select_ipOficina.appendChild(option);
            // console.log(data[i].ip)
        }
    } catch(error){
        console.log(error);
    }
}

select_oficina();

function inputBuscarRut(){
    inputRut.addEventListener('keyup', () => {
        if (inputRut.value.length >= 9) {
            buscarFuncionario();
        }
    })
}
inputBuscarRut();

const buscarFuncionario = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/funcionario');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            if( inputRut.value == data[i].rut){
            // si lo ingresado en input rut coincide con el rut de la base de datos
                    nombreFuncionario.value = data[i].nombres; // se muestra el nombre del funcionario en el input
                    apellidoFuncionario.value = data[i].apellido_pat + " " + data[i].apellido_mat; // se muestra los apellidow del funcionario en el input
                    persona.id = data[i].id; // se guarda el id del funcionario en el objeto persona
                    persona.rut = data[i].rut; // se guarda el rut del funcionario en el objeto persona
                    persona.nombres = data[i].nombres; // se guarda el nombre del funcionario en el objeto persona
                    persona.apellido_pat = data[i].apellido_pat; // se guarda el apellido paterno del funcionario en el objeto persona
                    persona.apellido_mat = data[i].apellido_mat; // se guarda el apellido materno del funcionario en el objeto persona    

            }if (!inputRut.value == "") { // si el input rut no esta vacio
                persona.id_listadoIpes = selectipOficina.value; // se guarda el id de la ip seleccionada en el objeto persona
            }
        }
    } catch(error){
        console.log(error);
    }
}

// funcion listar funcionarios en tabla
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
                    <td>${user.ip}</td>
                    <td>
                     
                    <button type="button" onclick="deleteIPUser('${user.id}')" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
        // console.log(data);
        tableBody_users.innerHTML= content;
    } catch (error) {
        alert(error);
    }
};

//funcion actualizar el funcionario
const updateUser = async () => {
    try{
        console.log(persona)
        const response = await fetch(`http://localhost:3000/api/funcionario/${persona.id}`, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(persona)
        },
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ip Asignada!',
            showConfirmButton: false,
            timer: 2000
          }),   
          setTimeout(() => {
            window.location.reload();
        }, 2000)
        );
        const data = await response.json()
        console.log(data)
    } catch(error){
        console.log(error);
    }
}

//funcion eliminar la ip de un funcionario
const deleteIPUser = async (id) => {
    try{
        // console.log(id)
        const response = await fetch(`http://localhost:3000/api/funcionario/ip/${id}`, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        },
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ip eliminada!',
            showConfirmButton: false,
            timer: 2000
          }),   
        );
        const data = await response.json()
        console.log(data)
    } catch(error){
        console.log(error);
    }
}







































            



