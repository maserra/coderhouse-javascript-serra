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
let eliminar = 0

// Clase
class item {
    constructor(monto, tipo, fecha, signo){
        this.monto = monto;
        this.tipo = tipo;
        this.fecha = fecha;
        this.signo = signo;
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
btn_mostrar_ingreso.onclick = () => mostrar_ingreso()
btn_mostrar_gasto.onclick = () => mostrar_gasto()
btn_cargar_ingreso.onclick = () => cargar_ingreso()
btn_eliminar_ingreso.onclick = () => eliminar_ingreso()
btn_cargar_gasto.onclick = () => cargar_gasto()
btn_eliminar_gasto.onclick = () => eliminar_gasto()
btn_cambiar_inv.onclick = () => cambiar_inv()
btn_calcular_resultado.onclick = () => calcular()

// 1) Cargar ingreso
function cargar_ingreso(){
    let monto = parseInt(document.getElementById("monto-ingreso").value)
    let fecha = document.getElementById("fecha-ingreso").value
    let tipo = document.getElementById("tipo-ingreso").value
    let signo = "ingreso" 
    let nuevo_ingreso = new item (monto, tipo, fecha, signo)
    ingresos.push(nuevo_ingreso)
    document.getElementById("tipo-ingreso").value = ""
    document.getElementById("fecha-ingreso").value = ""
    document.getElementById("monto-ingreso").value = ""
    div_ingresos.innerText = f_ingresos("ver")
}

// 2) Eliminar ingreso
function eliminar_ingreso(){
    eliminar = parseInt(prompt(f_ingresos("eliminar")))
    eliminar = eliminar-1
    if(eliminar >= 0 && eliminar < ingresos.length){
        ingresos.splice(eliminar,1)
    }else{
        alert("Opción no válida. Intente de nuevo.")
        eliminar_ingreso()
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

// 4) Cargar gasto
function cargar_gasto(){
    let monto = parseInt(document.getElementById("monto-gasto").value)
    let fecha = document.getElementById("fecha-gasto").value
    let tipo = document.getElementById("tipo-gasto").value
    let signo = "gasto" 
    let nuevo_gasto = new item (monto, tipo, fecha, signo)
    gastos.push(nuevo_gasto)
    document.getElementById("tipo-gasto").value = ""
    document.getElementById("fecha-gasto").value = ""
    document.getElementById("monto-gasto").value = ""
    div_gastos.innerText = f_gastos("ver")
}

// 5) Eliminar gasto
function eliminar_gasto(){
    eliminar = parseInt(prompt(f_gastos("eliminar")))
    eliminar = eliminar-1
    if(eliminar >= 0 && eliminar < gastos.length){
        gastos.splice(eliminar,1)
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

function mostrar_ingreso(){
    formulario_ingreso[0].style.display = "block"
}
function mostrar_gasto(){
    formulario_gasto[0].style.display = "block"
}   

function cerrar(){
    formulario_ingreso[0].style.display = "none"
    formulario_gasto[0].style.display = "none"
}

btn_close[0].onclick = () => cerrar()
btn_close[1].onclick = () => cerrar()