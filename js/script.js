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

//localStorage.removeItem("ingreso")

// Traer datos de Storage
if(localStorage.getItem("ingreso") != null){
    importar_datos(ingresos, "ingreso")
    div_ingresos.innerText = f_ingresos("ver")
}
if(localStorage.getItem("gasto") != null){
    importar_datos(gastos, "gastos")
    div_gastos.innerText = f_gastos("ver")
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
let btn_calcular_resultado = document.getElementById("btn_cal")

// Funciones de los botones
btn_mostrar_ingreso.onclick = (k) => mostrar("mi")
btn_mostrar_gasto.onclick = (k) => mostrar("mg")
btn_cargar_ingreso.onclick = (k) => cargar("ingreso")
btn_eliminar_ingreso.onclick = (k) => eliminar("ingreso")
btn_cargar_gasto.onclick = (k) => cargar("gasto")
btn_eliminar_gasto.onclick = () => eliminar_gasto()
btn_cambiar_inv.onclick = () => cambiar_inv()
btn_calcular_resultado.onclick = () => calcular()

// Cargar
function cargar(k){
    let monto = parseInt(document.getElementById("monto-"+k).value)
    let fecha = document.getElementById("fecha-"+k).value
    let tipo = document.getElementById("tipo-"+k).value
    let signo = k 
    let nuevo = new item (monto, tipo, fecha, signo)
    if(k=="ingreso"){
        ingresos.push(nuevo)
        guardar_datos(ingresos_storage, nuevo, "ingreso")
        div_ingresos.innerText = f_ingresos("ver")
    }else{
        gastos.push(nuevo)
        guardar_datos(gastos_storage, nuevo, "gasto")
        div_gastos.innerText = f_gastos("ver")
    }
    document.getElementById("tipo-"+k).value = ""
    document.getElementById("fecha-"+k).value = ""
    document.getElementById("monto-"+k).value = ""
}

// Eliminar
function eliminar(k){
    el = parseInt(prompt(f_ingresos("eliminar")))
    el = el-1
    if(el >= 0 && el < ingresos.length){
        ingresos.splice(el,1)
        eliminar_datos(ingresos_storage, el, "ingreso")
    }else{
        alert("Opción no válida. Intente de nuevo.")
        eliminar(k)
    }
    div_ingresos.innerText = f_ingresos("ver")
}

// 3) Ver ingresos
function f_ingresos(variable){
    let texto_ingreso = ""
    for(i = 0; i<ingresos.length; i++){
        texto_ingreso = texto_ingreso + (i+1) + ") " + ingresos[i].fecha + " -> $" + ingresos[i].monto + "\n"
    }
    if(variable == "ver"){
        return texto_ingreso
    }else{
        texto_ingreso = texto_ingreso + "\n ¿Qué valor desea eliminar (escribir el número de la posición)"
        return texto_ingreso
    }
}

// 5) Eliminar gasto
function eliminar_gasto(){
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
}

// 6) Ver gastos
function f_gastos(variable){
    let texto_gasto = ""
    for(i = 0; i<gastos.length; i++){
        texto_gasto = texto_gasto + (i+1) + ") " + gastos[i].fecha + " -> $" + gastos[i].monto + "\n"
    }
    if(variable == "ver"){
        return texto_gasto
    }else{
        texto_gasto = texto_gasto + "\n ¿Qué valor desea eliminar? (escribir el número de la posición)"
        return texto_gasto
    }
}

// 7) Cambiar inversión
function cambiar_inv(){
    inv = parseFloat(prompt("Cargar porcentaje de inversión (Número de 0 a 100)"))/100
    localStorage.setItem("inv", inv)
    div_inv.innerText = ver_inv()
}

// 8) Ver porcentaje de inversión
function ver_inv(){
    return "El porcentaje de inversión es: " + inv*100 + "%"
}

// 9) Calcular resultado
function calcular(){
    ingreso_total = 0
    gasto_total = 0
    for(i = 0; i < ingresos.length; i++){
        ingreso_total = ingreso_total + ingresos[i].monto
    }
    for(i = 0; i < gastos.length; i++){
        gasto_total = gasto_total + gastos[i].monto
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

function mostrar(k){
    if(k == "mi"){
        formulario_ingreso[0].style.display = "block"
    }else{
        formulario_gasto[0].style.display = "block"
    }
}   

function cerrar(){
    formulario_ingreso[0].style.display = "none"
    formulario_gasto[0].style.display = "none"
}

btn_close[0].onclick = () => cerrar()
btn_close[1].onclick = () => cerrar()

// Guardar y eliminar datos
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
function borrar_todo(tipo){
    localStorage.removeItem(tipo)
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


