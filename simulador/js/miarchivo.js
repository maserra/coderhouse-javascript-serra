// Simulador
// Finanzas personales cargando ingresos, costos, etc

// Cargar ingresos
let ingreso_pregunta = prompt("¿Desea cargar un ingreso? (Y/N)");
let ingresos = 0;
let ingreso = 0;
while(ingreso_pregunta == "Y"){
    ingreso = prompt("Cargar ingreso");
    ingresos = ingresos + parseInt(ingreso);
    ingreso_pregunta = prompt("¿Desea cargar otro ingreso? (Y/N)");
}

// Cargar gastos
let gasto_pregunta = prompt("¿Desea cargar un gasto? (Y/N)");
let gastos = 0;
let gasto = 0;
while(gasto_pregunta == "Y"){
    gasto = prompt("Cargar gasto");
    gastos = gastos + parseInt(gasto);
    gasto_pregunta = prompt("¿Desea cargar otro gasto? (Y/N)");
}

// Cargar inversión
let inversion_pregunta = prompt("¿Desea guardar un porcentaje para invertir? Si es así ingrese el porcentaje (solo número de 1 a 100), sino escriba 0");
let resultado = ingresos - gastos;
let inversion = resultado * inversion_pregunta/100;
resultado = resultado - inversion;

alert("El ingreso total es: $" + ingresos);
alert("El gasto total es: $" + gasto);
alert("El monto a invertir es: $" + inversion);
alert("El monto restante es: $" + resultado);