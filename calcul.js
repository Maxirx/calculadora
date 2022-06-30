var cadenaString = "4-7+8+9/2*3"

const SUMA = "+"
const RESTA = "-"
const MULTIPLICACION = "*"
const DIVISION = "/"


function separarTerminos(cadenaString, operaciones) { // [4-7+8] [+] [[9/2] [*] [3]]
  cadenaString = cadenaString + "+"
  let operadores = []
  for (let index = 0; index < cadenaString.length; index++) {
    const element = cadenaString[index];


    if (element === SUMA) {
      operadores.push({ propiedad: SUMA, posicion: index, izquierda: numIzquierda(cadenaString, index) })

    } else {
      if (element === RESTA) {
        operadores.push({ propiedad: RESTA, posicion: index, izquierda: numIzquierda(cadenaString, index) })
      }
      else {
        if (element === MULTIPLICACION) {
          operadores.push({ propiedad: MULTIPLICACION, posicion: index, izquierda: numIzquierda(cadenaString, index) })
        }
        else {
          if (element === DIVISION)
            operadores.push({ propiedad: DIVISION, posicion: index, izquierda: numIzquierda(cadenaString, index) })
        }
      }
    }

  }
  var contador = 0
  operaciones(operadores, contador, operadoresMult)

}


function numIzquierda(cadenaString, pos) { //indice devolver hasta el operador anterior

  const numIzquierda = cadenaString.slice(0, pos)
  let cont = pos
  //"44-12"
  if (!Number(numIzquierda)) {
    while (!isOperador(numIzquierda[cont])) {
      cont--
    }
    elVerdaderoNumero = cadenaString.slice(cont + 1, pos)
  } else {
    elVerdaderoNumero = Number(numIzquierda)
  }


  return elVerdaderoNumero


}




function isOperador(valor) {//separador de operadores
  let val = false
  if (valor == SUMA) {
    val = true
  }
  if (valor == RESTA) {
    val = true
  }
  if (valor == MULTIPLICACION) {
    val = true
  }
  if (valor == DIVISION) {
    val = true
  }
  return val
}



function operaciones(operadores, contador, operadoresMult) { //operacion con division

  for (let i = 0; i < operadores.length; i++) {
    if (operadores[i].propiedad == DIVISION) {
      contador = operadores[i].izquierda / operadores[i + 1].izquierda

      operadores.splice(i, { izquierda: contador })
    }

  }

  operadoresMult(operadores, contador, operadoresRes)
  return contador
}

function operadoresMult(operadores, contador, operadoresRes) {// operacion con multiplicaciones
  for (let i = 0; i < operadores.length; i++) {

    if (operadores[i].propiedad == MULTIPLICACION) {
      contador = operadores[i + 1].izquierda * contador

      operadores.splice(i + 1, i, { izquierda: contador })
    }


  }

  operadoresRes(operadores, contador, operadoresSum)
  return contador
}


function operadoresRes(operadores, contador, operadoresSum) {// operaciones con resta
  for (let i = 0; i < operadores.length; i++) {

    if (operadores[i].propiedad == RESTA) {
      contador = contador - Number(operadores[i + 1].izquierda)

      operadores.splice(i + 1, i + 1, { izquierda: contador })
    }


  }

  operadoresSum(operadores, contador, resultado)
  return contador
}

function operadoresSum(operadores, contador, resultado) {// operaciones con suma

  operadores.forEach(element => {
    if (element.propiedad == SUMA) {
      contador = contador + Number(element.izquierda)


    } else { contador }
  });
  contador = contador + Number(operadores[0].izquierda)//se toma el numero de la derecha del operador, por lo que este queda solo y al solo ser positivo(si fuera negativo pasaria al siguiente lugar del array y el primero quedaria en 0), se agrega al ultimo



  console.log(contador);
  resultado(contador)
  return contador

}


const resultado = function res(contador) {
  return contador
}

console.log(separarTerminos(cadenaString, operaciones))