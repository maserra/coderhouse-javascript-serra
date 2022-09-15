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

//html
let div_ingresos = document.getElementById("ingresos")
let div_gastos = document.getElementById("gastos")
let div_inv = document.getElementById("inv")
let div_resultado = document.getElementById("resultado")

let btn_cargar_ingreso = document.getElementById("btn_ci")
let btn_eliminar_ingreso = document.getElementById("btn_ei")
let btn_cargar_gasto = document.getElementById("btn_cg")
let btn_eliminar_gasto = document.getElementById("btn_eg")
let btn_cambiar_inv = document.getElementById("btn_inv")
let btn_calcular_resultado = document.getElementById("btn_cal")

btn_cargar_ingreso.onclick = cargar_ingreso
btn_eliminar_ingreso.onclick = eliminar_ingreso
btn_cargar_gasto.onclick = cargar_gasto
btn_eliminar_gasto.onclick = eliminar_gasto
btn_cambiar_inv.onclick = cambiar_inv
btn_calcular_resultado.onclick = calcular

// 1) Cargar ingreso
function cargar_ingreso(){
    let nuevo_ingreso = parseInt(prompt("Cargar nuevo ingreso"))
    ingresos.push(nuevo_ingreso)
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
    let texto_ingreso = "Ingresos"
    for(i = 0; i<ingresos.length; i++){
        texto_ingreso = texto_ingreso + "\n" + (i+1) + "): " + ingresos[i]
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
    let nuevo_gasto = parseInt(prompt("Cargar nuevo gasto"))
    gastos.push(nuevo_gasto)
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
    let texto_gasto = "Gastos"
    for(i = 0; i<gastos.length; i++){
        texto_gasto = texto_gasto + "\n" + (i+1) + "): " + gastos[i]
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
        ingreso_total = ingreso_total + ingresos[i]
    }
    for(i = 0; i < gastos.length; i++){
        gasto_total = gasto_total + gastos[i]
    }
    resultado = ingreso_total - gasto_total
    inversion = resultado * inv
    resultado = resultado - inversion
    div_resultado.innerText = "Resultado \n El ingreso total es: $" + ingreso_total + "\n El gasto total es: $" + gasto_total + "\n El monto a invertir es: $" + inversion + "\n El monto restante es: $" + resultado
}