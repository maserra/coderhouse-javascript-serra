// Variables
let ingresos = []
let gastos = []
let inv = 0
let resultado = 0
let inversion = 0
let ingreso_total = 0
let gasto_total = 0
let n = 0

// Traer datos de Storage
for(let i=0; i<localStorage.length; i++) {
    let clave = localStorage.key(i)
    if(clave.substring(0,3) == "ing"){
        importar_datos(ingresos, clave)
    }else if(clave.substring(0,3) == "gas"){
        importar_datos(gastos, clave)
    }
}
n = parseInt(localStorage.getItem("n"))
inv = parseFloat(localStorage.getItem("inv"))

// Clase
class item {
    constructor(monto, tipo, fecha, signo){
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
        this.signo = signo;
        this.n = n;
    }
}

// Html
let div_ingresos = document.getElementById("ingresos")
let div_gastos = document.getElementById("gastos")
let div_inv = document.getElementById("inv")
let div_resultado = document.getElementById("resultado")

let btn_mostrar_ingreso = document.getElementById("btn_mi")
let btn_mostrar_gasto = document.getElementById("btn_mg")
let btn_cargar_ingreso = document.getElementById("btn_ci")
let btn_eliminar_ingreso = document.getElementById("btn_ei")
let btn_cargar_gasto = document.getElementById("btn_cg")
let btn_eliminar_gasto = document.getElementById("btn_eg")
let btn_mostrar_inv = document.getElementById("btn_inv")
let btn_cambiar_inv = document.getElementById("btn_cinv")
let btn_calcular_resultado = document.getElementById("btn_res")
let btn_comenzar_nuevo = document.getElementById("btn_nue")

// Presentar el html
for(i=0; i<ingresos.length; i++){
    presentar(ingresos[i], div_ingresos, "ing")
}
for(i=0; i<gastos.length; i++){
    presentar(gastos[i], div_gastos, "gas")
}
ver_inv()
calcular()

// Funciones de los botones
btn_mostrar_ingreso.onclick = (formulario_k) => mostrar(formulario_ingreso)
btn_mostrar_gasto.onclick = (k) => mostrar(formulario_gasto)
btn_cargar_ingreso.onclick = (k, lista, k_storage, div_k) => cargar("ing", ingresos, div_ingresos)
btn_cargar_gasto.onclick = (k, lista, k_storage, div_k) => cargar("gas", gastos, div_gastos)
btn_eliminar_ingreso.onclick = (k, k_storage, lista, div_k) => borrar_todo("ing", ingresos, div_ingresos)
btn_eliminar_gasto.onclick  = (k, k_storage, lista, div_k) => borrar_todo("gas", gastos, div_gastos)
btn_mostrar_inv.onclick = () => mostrar(formulario_inversion)
btn_cambiar_inv.onclick = () => cambiar_inv()
btn_calcular_resultado.onclick = () => calcular()
btn_comenzar_nuevo.onclick = () => comenzar_nuevo()

// Cargar
function cargar(k, lista, div_k){
    let monto = parseInt(document.getElementById("monto-"+k).value)
    let fecha = document.getElementById("fecha-"+k).value
    let tipo = document.getElementById("tipo-"+k).value || "Otro"
    let signo = k
    n = n + 1;
    let nuevo = new item (monto, tipo, fecha, signo, n)
    lista.push(nuevo)
    clave = k + "-" + n
    guardar_datos(nuevo, k, clave, n)
    presentar(nuevo, div_k, k)
    document.getElementById("tipo-"+k).value = ""
    document.getElementById("fecha-"+k).value = ""
    document.getElementById("monto-"+k).value = ""
}

// Eliminar
function eliminar(tipo, eliminado){
    clave = tipo + "-" + eliminado
    localStorage.removeItem(clave)
    if(tipo == "ing"){
        for(i=0; i<ingresos.length; i++){
            if(eliminado == ingresos[i].n){
                ingresos.splice(i,1)
                let div_eliminar =  document.getElementById(clave)
                div_ingresos.removeChild(div_eliminar)
            }
        }
    }else{
        console.log("a")
        for(i=0; i<gastos.length; i++){
            console.log(i)
            if(eliminado == gastos[i].n){
                console.log(gastos[i].n)
                gastos.splice(i,1)
                let div_eliminar =  document.getElementById(clave)
                div_gastos.removeChild(div_eliminar)
            }
        }
    }
}

// Borrar_todo
function borrar_todo(k, lista, div_k){
    let j=0
    for(i=0; i<localStorage.length+1; i++){
        clave = localStorage.key(j)
        if(clave!=null){
            if(clave.substring(0,3) == k){
                localStorage.removeItem(clave)
            }else{
                j++
            }
        }
    }
    lista.splice(0, lista.length)
    while (div_k.firstChild){
        div_k.removeChild(div_k.firstChild);
    }
}

// Presentar
function presentar(nuevo, div_k, k){
    let contenedor = document.createElement("div")
    let texto = (nuevo.n) + ") " + nuevo.fecha + "(" + nuevo.tipo + ")" + " -> $" + nuevo.monto
    contenedor.innerHTML = `<p> ${texto} </p> <button type="button" class="btn-close btn-delete" aria-label="Close" id="bot-"${k}-${nuevo.n} onclick="eliminar('${k}',${nuevo.n})"></button>`
    contenedor.id = `${k}-${nuevo.n}`
    contenedor.className = `contenedor-presentar`
    div_k.append(contenedor)
}

// Cambiar inversión
function cambiar_inv(){
    inv = parseInt(document.getElementById("monto-inv").value)/100
    localStorage.setItem("inv", inv)
    ver_inv()
    formulario_inversion[0].style.display = "none"
}

// Ver porcentaje de inversión
function ver_inv(){
    div_inv.innerText = "El porcentaje de inversión es: " + inv*100 + "%"
}

// Calcular resultado
function calcular(){
    ingreso_total = 0
    gasto_total = 0
    for(i = 0; i < ingresos.length; i++){
        ingreso_total += ingresos[i].monto
    }
    for(i = 0; i < gastos.length; i++){
        gasto_total += gastos[i].monto
    }
    resultado = ingreso_total - gasto_total
    inversion = resultado * inv
    resultado = resultado - inversion
    div_resultado.innerText = "El ingreso total es: $" + ingreso_total + "\n El gasto total es: $" + gasto_total + "\n El monto a invertir es: $" + inversion + "\n El monto restante es: $" + resultado
}

// Carga de datos
let btn_close_1 = document.getElementById("btn-close-1") 
let btn_close_2 = document.getElementById("btn-close-2")
let btn_close_3 = document.getElementById("btn-close-3")
let formulario_ingreso = document.getElementsByClassName("carga-ingreso")
let formulario_gasto = document.getElementsByClassName("carga-gasto")
let formulario_inversion = document.getElementsByClassName("carga-inversion")

function mostrar(formulario_k){
    formulario_k[0].style.display = "block"
}   

function cerrar(){
    formulario_ingreso[0].style.display = "none"
    formulario_gasto[0].style.display = "none"
    formulario_inversion[0].style.display = "none"
}

btn_close_1.onclick = () => cerrar()
btn_close_2.onclick = () => cerrar()
btn_close_3.onclick = () => cerrar()

// Guardar y eliminar datos del storage 
function guardar_datos(nuevo, tipo, clave, n){
    localStorage.setItem("n", n)
    let nuevo_json = JSON.stringify(nuevo)
    clave = tipo + "-" + n
    localStorage.setItem(clave, nuevo_json)
}
function importar_datos(lista, clave){
    aux = localStorage.getItem(clave)
    json_aux = JSON.parse(aux)
    if(lista == ingresos){
        lista.unshift(json_aux)
    }else{
        lista.push(json_aux)
    }
    
}

// Comenzar de nuevo
function comenzar_nuevo(){
    localStorage.setItem("n", 0)
    borrar_todo("ing", ingresos, div_ingresos)
    borrar_todo("gas", gastos, div_gastos)
    localStorage.setItem("inv", 0)
    n = 0
    inv = 0
    ver_inv()
    calcular()
}