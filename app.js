const selectEstablecimiento = document.getElementById('select_establecimiento');
const selectipOficina = document.getElementById('select_ipOficina');
const inputRut = document.getElementById('run');
const btnBuscar = document.getElementById('btnBuscar');
const nombreFuncionario = document.getElementById('nombre');
const apellidoFuncionario = document.getElementById('apellido');

//patron iife

function principal (){
    selectEstablecimiento.addEventListener('change', () => {
        if (selectEstablecimiento.value == "Seremi Central") {
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCentral();
        } else if (selectEstablecimiento.value == "COMPIN CONCEPCION") {
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCompin();
        } else if (selectEstablecimiento.value == "Coronel") {
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipCoronel();
        } else if (selectEstablecimiento.value == "Tome") {
            selectipOficina.innerHTML = "";
            document.getElementById("select_ipOficina").disabled = false;
            ipTome();
        } else if (selectEstablecimiento.value == 1) {
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
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
            // console.log(inputRut.value.length);
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
























            



