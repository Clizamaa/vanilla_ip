const selectEstablecimiento = document.getElementById('select_establecimiento');
const selectipOficina = document.getElementById('select_ipOficina');
const inputRut = document.getElementById('run');
const btnBuscar = document.getElementById('btnBuscar');
const nombreFuncionario = document.getElementById('nombre');
const apellidoFuncionario = document.getElementById('apellido');
const div_ip = document.getElementById('div_ip');

//patron iife

function principal (){
    selectEstablecimiento.addEventListener('change', () => {
        if (selectEstablecimiento.value == "Seremi Central") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCentral();
        } else if (selectEstablecimiento.value == "COMPIN CONCEPCION") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCompin();
        } else if (selectEstablecimiento.value == "Coronel") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCoronel();
        } else if (selectEstablecimiento.value == "Tome") {
            div_ip.removeAttribute('hidden');
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipTome();
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
            //  console.log(data[i].nombre)
         }
        //  console.log(data)
    } catch(error){
        console.log(error);
    }
}

const ipCentral = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/ipcentral');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].ip;
            option.text= data[i].ip;
            select_ipOficina.appendChild(option);
            // console.log(data[i].ip)
        }
    } catch(error){
        console.log(error);
    }
}

const ipCompin = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/ipcompin');
        const data = await response.json()
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            option = document.createElement("option");
            option.value= data[i].ip;
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
            option.value= data[i].ip;
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
            option.value= data[i].ip;
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
        if (inputRut.value.length == 9 || inputRut.value.length == 10) {
            buscarFuncionario();
        }
    })
}
inputBuscarRut();

const buscarFuncionario = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/funcionario');
        const data = await response.json()
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if(inputRut.value.length == 9 && inputRut.value == data[i].rut){
                nombreFuncionario.value = data[i].nombres;
                apellidoFuncionario.value = data[i].apellido_pat + " " + data[i].apellido_mat;
            }else if (inputRut.value.length == 10 && inputRut.value == data[i].rut){
                nombreFuncionario.value = data[i].nombres;
                apellidoFuncionario.value = data[i].apellido_pat + " " + data[i].apellido_mat;
            }             
        }
    } catch(error){
        console.log(error);
    }
}

const todoFuncionario = async () => {
    try{
        const response = await fetch('http://localhost:3000/api/funcionario');
        const data = await response.json()

    } catch(error){
        console.log(error);
    }
}
new gridjs.Grid({
    search: true,
    pagination: {
        enabled: true,
        limit: 10,
    },
    columns: ['Rut', 'Nombre', 'Apellido_pat', 'Apellido_mat'],
    server: {
        url: 'http://localhost:3000/api/funcionario',
        then: data => data.map(row => ({
            rut: row.rut,
            nombre: row.nombres,
            apellido_pat: row.apellido_pat,
            apellido_mat: row.apellido_mat,
        }))
    },

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
























            



