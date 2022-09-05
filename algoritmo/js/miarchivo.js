// Ejemplo For
let jugadores = prompt("Ingrese la cantidad de jugadores");
for(let i = 0; i < jugadores; i++){
    let nombre = prompt("Ingrese el nombre del jugador " + (i+1));
    alert("El nombre del jugador " + (i+1) + " es " + nombre);
    console.log("Jugador " + (i+1) + ": " + nombre) 
}

// Ejemplo While
let siguiente = prompt("¿Nuevo lanzamiento de moneda? (Y/N)");
while(siguiente == "Y"){
    n = Math.random();
    if(n<0.5){
        console.log(n + " - Cara");
        alert("Cara");
    }else{
        console.log(n + " - Cruz");
        alert("Cruz");
    }
    siguiente = prompt("¿Nuevo lanzamiento de moneda? (Y/N)");
}

// Ejemplo Do While
let p = 1;
let goles = 0;
let goles_totales = 0;
do{
    goles = prompt("Ingrese la cantidad de goles del partido " + p);
    goles_totales = goles_totales + parseInt(goles);
    p = p + 1;
}while(goles>0);
alert("Cantidad de partidos seguidos metiendo por lo menos un gol: " + (p-2));
console.log("Cantidad de partidos seguidos metiendo por lo menos un gol: " + (p-2));
alert("Cantidad de goles: " + goles_totales);
console.log("Cantidad de goles: " + goles_totales);
let promedio = goles_totales/(p-2);
alert("Promedio de goles por partido: " + promedio);
console.log("Promedio de goles por partido: " + promedio);