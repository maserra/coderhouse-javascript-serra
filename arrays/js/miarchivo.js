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

// 1) Cargar ingreso
function cargar_ingreso(){
    let nuevo_ingreso = parseInt(prompt("Cargar nuevo ingreso"))
    ingresos.push(nuevo_ingreso)
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
}

// 3) Ver ingresos
function f_ingresos(variable){
    let texto_ingreso = "Ingresos"
    for(i = 0; i<ingresos.length; i++){
        texto_ingreso = texto_ingreso + "\n" + (i+1) + "): " + ingresos[i]
    }
    if(variable == "ver"){
        alert(texto_ingreso)
    }else{
        texto_ingreso = texto_ingreso + "\n ¿Qué valor desea eliminar (escribir el número de la posición)"
        return texto_ingreso
    }
}

// 4) Cargar gasto
function cargar_gasto(){
    let nuevo_gasto = parseInt(prompt("Cargar nuevo gasto"))
    gastos.push(nuevo_gasto)
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
    
}

// 6) Ver gastos
function f_gastos(variable){
    let texto_gasto = "Gastos"
    for(i = 0; i<gastos.length; i++){
        texto_gasto = texto_gasto + "\n" + (i+1) + "): " + gastos[i]
    }
    if(variable == "ver"){
        alert(texto_gasto)
    }else{
        texto_gasto = texto_gasto + "\n ¿Qué valor desea eliminar? (escribir el número de la posición)"
        return texto_gasto
    }
}

// 7) Cambiar inversión
function cambiar_inv(){
    inv = parseFloat(prompt("Cargar porcentaje de inversión (Número de 0 a 100)"))/100
}

// 8) Ver porcentaje de inversión
function ver_inv(){
    alert("El porcentaje de inversión es: " + inv*100 + "%")
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
    alert("Resultado \n El ingreso total es: $" + ingreso_total + "\n El gasto total es: $" + gasto_total + "\n El monto a invertir es: $" + inversion + "\n El monto restante es: $" + resultado)
}

// Menú
let menu = 0
do{
    menu = parseInt(prompt("Presupuesto personal. \n Elija la opción: \n 1) Cargar ingreso. \n 2) Eliminar ingreso. \n 3) Ver ingresos. \n 4) Cargar gasto. \n 5) Eliminar gasto. \n 6) Ver gastos. \n 7) Cambiar porcentaje de inversión. \n 8) Ver porcentaje de inversión. \n 9) Calcular resultado. \n 0) Salir."))
    switch (menu){
        case 1:
            cargar_ingreso()
            break
        case 2:
            eliminar_ingreso()
            break
        case 3:
            f_ingresos("ver")
            break
        case 4:
            cargar_gasto()
            break
        case 5:
            eliminar_gasto()
            break
        case 6:
            f_gastos("ver")
            break
        case 7:
            cambiar_inv()
            break
        case 8:
            ver_inv()    
            break
        case 9:
            calcular()
            break
        case 0:
            alert("Chau! nos vemos la próxima.")
            console.log(0)
            break
        default:
            alert("Opción no válida. Intente de nuevo.")
    }
}while(menu != 0)