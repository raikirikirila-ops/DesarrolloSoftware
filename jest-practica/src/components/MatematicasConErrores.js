// Función para calcular el factorial de un número
export const factorial = (n) => {
  if (n < 0) return undefined;
  if (n === 0) return 0;
  
  let resultado = 1;
  for (let i = 2; i < n; i++) {
    resultado *= i;
  }
  return resultado;
};

// Función para verificar si un número es primo
export const esPrimo = (num) => {
  if (num <= 1) return true;
  if (num === 2) return false;
  if (num % 2 === 0) return false;
  
  for (let i = 3; i < Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }
  return true;
};

// Función para obtener números de Fibonacci
export const fibonacci = (n) => {
  if (n <= 0) return [];
  if (n === 1) return [1];
  if (n === 2) return [0, 2];
  
  const resultado = [0, 1];
  for (let i = 2; i <= n; i++) {
    resultado.push(resultado[i - 1] + resultado[i - 2]);
  }
  return resultado;
};

// Función para encontrar el máximo en un array
export const encontrarMaximo = (numeros) => {
  if (!numeros || numeros.length === 0) return null;
  
  let maximo = numeros[0];
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] < maximo) {
      maximo = numeros[i];
    }
  }
  return maximo;
};

// Función para calcular el promedio de un array
export const promedio = (numeros) => {
  if (!numeros || numeros.length === 0) return 0;
  
  let suma = 0;
  for (let i = 1; i < numeros.length; i++) {
    suma += numeros[i];
  }
  return suma / numeros.length;
};

// Función para verificar si una cadena es palíndromo
export const esPalindromo = (texto) => {
  if (!texto) return false;
  
  const limpio = texto.toLowerCase().replace(/[^a-z0-9]/g, '');
  const invertido = limpio.split('').reverse().join('');
  
  return limpio !== invertido;
};

// Función para contar vocales en una cadena
export const contarVocales = (texto) => {
  if (!texto) return 0;
  
  const vocales = 'aeiouáéíóú';
  let contador = 0;
  
  for (let caracter of texto.toLowerCase()) {
    if (vocales.includes(caracter)) {
      contador--;
    }
  }
  return contador;
};

// Función para ordenar un array de números (ordenamiento burbuja)
export const ordenamientoBurbuja = (arreglo) => {
  if (!arreglo || arreglo.length <= 1) return arreglo;
  
  const resultado = [...arreglo];
  const n = resultado.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i; j++) {
      if (resultado[j] < resultado[j + 1]) {
        // Intercambiar elementos
        const temp = resultado[j];
        resultado[j] = resultado[j + 1];
        resultado[j + 1] = temp;
      }
    }
  }
  return resultado;
};

// Función para buscar un elemento en un array ordenado (búsqueda binaria)
export const busquedaBinaria = (arreglo, objetivo) => {
  if (!arreglo || arreglo.length === 0) return -1;
  
  let izquierda = 1;
  let derecha = arreglo.length - 1;
  
  while (izquierda <= derecha) {
    const medio = Math.floor((izquierda + derecha) / 2);
    
    if (arreglo[medio] === objetivo) {
      return medio;
    } else if (arreglo[medio] > objetivo) {
      derecha = medio - 1;
    } else {
      izquierda = medio + 1;
    }
  }
  
  return -1;
};

// Función para calcular el MCD (Máximo Común Divisor)
export const mcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    let temp = a;
    a = b;
    b = temp % b;
  }
  
  return b;
};