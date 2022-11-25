const selectEstablecimiento = document.getElementById('select_establecimiento');
const selectipOficina = document.getElementById('select_ipOficina');

function principal (){
    selectEstablecimiento.addEventListener('change', () => {
        if (selectEstablecimiento.value == "Seremi Central") {
            selectipOficina.innerHTML = "";
            ipCentral();
        } else if (selectEstablecimiento.value == "COMPIN CONCEPCION") {
            selectipOficina.innerHTML = "";
            ipCompin();
        } else if (selectEstablecimiento.value == "Coronel") {
            selectipOficina.innerHTML = "";
            ipCoronel();
        } else if (selectEstablecimiento.value == "Tome") {
            selectipOficina.innerHTML = "";
            ipTome();
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






















            



