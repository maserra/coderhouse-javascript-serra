// Variables
let ingresos = []
let ingreso = []
let gastos = []
let gasto = []
let inv = 0
let resultado = 0
let inversion = 0
let ingreso_total = 0
let gasto_total = 0
let variable = "-"
let el = 0

localStorage.removeItem("ingreso")
localStorage.removeItem("gasto")

// Traer datos de Storage
if(localStorage.getItem("ingreso") != null){
    importar_datos(ingresos, "ingreso")
    presentar(ingresos, div_ingresos, "ingreso")
}
if(localStorage.getItem("gasto") != null){
    importar_datos(gastos, "gastos")
    presentar(gastos, div_gastos, "gastos")
}

// Clase
class item {
    constructor(monto, tipo, fecha, signo){
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
        this.signo = signo;
    }
}
class Item{
    constructor(obj){
        this.monto = obj.monto;
        this.tipo = obj.tipo;
        this.fecha = obj.fecha;
        this.signo = obj.signo;
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
let btn_cambiar_inv = document.getElementById("btn_inv")
let btn_calcular_resultado = document.getElementById("btn_res")

// Funciones de los botones
btn_mostrar_ingreso.onclick = (formulario_k) => mostrar(formulario_ingreso)
btn_mostrar_gasto.onclick = (k) => mostrar(formulario_gasto)
btn_cargar_ingreso.onclick = (k, lista, k_storage, div_k) => cargar("ingreso", ingresos, ingresos_storage, div_ingresos)
btn_cargar_gasto.onclick = (k, lista, k_storage, div_k) => cargar("gasto", gastos, gastos_storage, div_gastos)
btn_eliminar_ingreso.onclick = (k, k_storage, lista, div_k) => borrar_todo("ingreso", ingresos_storage, ingresos, div_ingresos)
btn_eliminar_gasto.onclick  = (k, k_storage, lista, div_k) => borrar_todo("gasto", gastos_storage, gastos, div_gastos)
btn_cambiar_inv.onclick = () => cambiar_inv()
btn_calcular_resultado.onclick = () => calcular()

// Cargar
function cargar(k, lista, k_storage, div_k){
    let monto = parseInt(document.getElementById("monto-"+k).value)
    let fecha = document.getElementById("fecha-"+k).value
    let tipo = document.getElementById("tipo-"+k).value || "Otro"
    let signo = k
    let nuevo = new item (monto, tipo, fecha, signo)
    lista.push(nuevo)
    guardar_datos(k_storage, nuevo, k)
    presentar(lista, div_k, k)
    document.getElementById("tipo-"+k).value = ""
    document.getElementById("fecha-"+k).value = ""
    document.getElementById("monto-"+k).value = ""
}

// Borrar_todo
function borrar_todo(k, k_storage, lista, div_k){
    localStorage.removeItem(k)
    k_storage = k_storage.splice(0, k_storage,length)
    lista = lista.splice(0, lista.length)
    while (div_k.firstChild){
        div_k.removeChild(div_k.firstChild);
}
}

// Presentar
function presentar(lista, div_k, k){
    while (div_k.firstChild){
            div_k.removeChild(div_k.firstChild);
    }
    for(i = 0; i<lista.length; i++){
        let contenedor = document.createElement("div")
        let texto = (i+1) + ") " + lista[i].fecha + " (" + lista[i].tipo + ")" + " -> $" + lista[i].monto
        contenedor.innerHTML = `<p> ${texto} <p> <button type="button" class="btn-close btn-delete" aria-label="Close" id=${k}-${i}></button>`
        contenedor.id = `${k}-${i}`
        contenedor.className = `contenedor-presentar`
        div_k.append(contenedor)
    }
}

// Eliminar
/* function eliminar_gasto(){
    el = parseInt(prompt(f_gastos("eliminar")))
    el = el-1
    if(el >= 0 && el < gastos.length){
        gastos.splice(el,1)
        eliminar_datos(gastos_storage, el, "gasto")
    }else{
        alert("Opción no válida. Intente de nuevo.")
        eliminar_gasto()
    }
    div_gastos.innerText = f_gastos("ver")
} */

// Cambiar inversión
function cambiar_inv(){
    inv = parseFloat(prompt("Cargar porcentaje de inversión (Número de 0 a 100)"))/100
    localStorage.setItem("inv", inv)
    div_inv.innerText = ver_inv()
}

// Ver porcentaje de inversión
function ver_inv(){
    return "El porcentaje de inversión es: " + inv*100 + "%"
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
let btn_close = document.getElementsByClassName("btn-close")
let formulario_ingreso = document.getElementsByClassName("carga-ingreso")
let formulario_gasto = document.getElementsByClassName("carga-gasto")

function mostrar(formulario_k){
    formulario_k[0].style.display = "block"
}   

function cerrar(){
    formulario_ingreso[0].style.display = "none"
    formulario_gasto[0].style.display = "none"
}

btn_close[0].onclick = () => cerrar()
btn_close[1].onclick = () => cerrar()

// Guardar y eliminar datos del storage 
let ingresos_storage = []
let gastos_storage = []
function guardar_datos(lista, nuevo, tipo){
    lista.push(JSON.stringify(nuevo))
    lista.push("-")
    localStorage.setItem(tipo, lista)
}
function eliminar_datos(lista, i, tipo){
    lista.splice(i,1)
    localStorage.setItem(tipo, lista)
}
function importar_datos(lista, tipo){
    aux = localStorage.getItem(tipo)
    aux_split2 = aux.split(",-")
    aux_split = aux[0].split(",-,")
    console.log(aux)
    console.log(aux_split2)
    console.log(typeof aux_split)
    for(let objeto of aux_split){
        console.log(objeto)
        lista_aux = JSON.parse(objeto)
        lista.push(lista_aux)
        //lista.push(new item(lista_aux))
    }
    if(tipo = "ingreso"){
        ingresos_storage = aux
    }else{
        gastos_storage = aux
    }
}


