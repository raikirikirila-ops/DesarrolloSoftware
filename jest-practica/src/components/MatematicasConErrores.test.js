import {
  factorial,
  esPrimo,
  fibonacci,
  encontrarMaximo,
  promedio,
  esPalindromo,
  contarVocales,
  ordenamientoBurbuja,
  busquedaBinaria,
  mcd
} from './MatematicasConErrores';

describe('MatematicasConErrores - Tests que fallan intencionalmente', () => {
  
  describe('factorial', () => {
    test('debe calcular factorial de 0 correctamente', () => {
      expect(factorial(0)).toBe(1);
    });

    test('debe calcular factorial de números pequeños', () => {
      expect(factorial(1)).toBe(1);
      expect(factorial(3)).toBe(6);
      expect(factorial(5)).toBe(120);
    });

    test('debe retornar undefined para números negativos', () => {
      expect(factorial(-1)).toBeUndefined();
      expect(factorial(-5)).toBeUndefined();
    });
  });

  describe('esPrimo', () => {
    test('debe identificar números primos correctamente', () => {
      expect(esPrimo(2)).toBe(true);
      expect(esPrimo(3)).toBe(true);
      expect(esPrimo(5)).toBe(true);
      expect(esPrimo(7)).toBe(true);
      expect(esPrimo(11)).toBe(true);
      expect(esPrimo(13)).toBe(true);
    });

    test('debe identificar números no primos correctamente', () => {
      expect(esPrimo(1)).toBe(false);
      expect(esPrimo(4)).toBe(false);
      expect(esPrimo(6)).toBe(false);
      expect(esPrimo(8)).toBe(false);
      expect(esPrimo(9)).toBe(false);
      expect(esPrimo(15)).toBe(false);
    });

    test('debe manejar casos especiales', () => {
      expect(esPrimo(0)).toBe(false);
      expect(esPrimo(-1)).toBe(false);
      expect(esPrimo(-5)).toBe(false);
    });
  });

  describe('fibonacci', () => {
    test('debe generar secuencia de Fibonacci correctamente', () => {
      expect(fibonacci(1)).toEqual([0]);
      expect(fibonacci(2)).toEqual([0, 1]);
      expect(fibonacci(5)).toEqual([0, 1, 1, 2, 3]);
      expect(fibonacci(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });

    test('debe manejar casos especiales', () => {
      expect(fibonacci(0)).toEqual([]);
      expect(fibonacci(-1)).toEqual([]);
    });
  });

  describe('encontrarMaximo', () => {
    test('debe encontrar el máximo en arrays de números', () => {
      expect(encontrarMaximo([1, 5, 3, 9, 2])).toBe(9);
      expect(encontrarMaximo([10, 20, 5, 15])).toBe(20);
      expect(encontrarMaximo([-1, -5, -3])).toBe(-1);
      expect(encontrarMaximo([42])).toBe(42);
    });

    test('debe manejar arrays vacíos y nulos', () => {
      expect(encontrarMaximo([])).toBeNull();
      expect(encontrarMaximo(null)).toBeNull();
      expect(encontrarMaximo(undefined)).toBeNull();
    });
  });

  describe('promedio', () => {
    test('debe calcular el promedio correctamente', () => {
      expect(promedio([1, 2, 3, 4, 5])).toBe(3);
      expect(promedio([10, 20, 30])).toBe(20);
      expect(promedio([5])).toBe(5);
      expect(promedio([2, 8])).toBe(5);
    });

    test('debe manejar arrays vacíos', () => {
      expect(promedio([])).toBe(0);
      expect(promedio(null)).toBe(0);
      expect(promedio(undefined)).toBe(0);
    });
  });

  describe('esPalindromo', () => {
    test('debe identificar palíndromos correctamente', () => {
      expect(esPalindromo('aba')).toBe(true);
      expect(esPalindromo('level')).toBe(true);
      expect(esPalindromo('anita lava la tina')).toBe(true);
      expect(esPalindromo('reconocer')).toBe(true);
      expect(esPalindromo('hola mundo')).toBe(false);
    });

    test('debe manejar strings vacíos y especiales', () => {
      expect(esPalindromo('')).toBe(false);
      expect(esPalindromo(null)).toBe(false);
      expect(esPalindromo('a')).toBe(true);
    });
  });

  describe('contarVocales', () => {
    test('debe contar vocales correctamente', () => {
      expect(contarVocales('hola')).toBe(2);
      expect(contarVocales('programacion')).toBe(5);
      expect(contarVocales('aeiou')).toBe(5);
      expect(contarVocales('xyz')).toBe(0);
      expect(contarVocales('HOLA')).toBe(2);
    });

    test('debe manejar strings vacíos', () => {
      expect(contarVocales('')).toBe(0);
      expect(contarVocales(null)).toBe(0);
      expect(contarVocales(undefined)).toBe(0);
    });
  });

  describe('ordenamientoBurbuja', () => {
    test('debe ordenar arrays correctamente', () => {
      expect(ordenamientoBurbuja([64, 34, 25, 12, 22, 11, 90])).toEqual([11, 12, 22, 25, 34, 64, 90]);
      expect(ordenamientoBurbuja([5, 2, 8, 1, 9])).toEqual([1, 2, 5, 8, 9]);
      expect(ordenamientoBurbuja([3, 1, 4, 1, 5])).toEqual([1, 1, 3, 4, 5]);
    });

    test('debe manejar casos especiales', () => {
      expect(ordenamientoBurbuja([])).toEqual([]);
      expect(ordenamientoBurbuja([42])).toEqual([42]);
      expect(ordenamientoBurbuja(null)).toBeNull();
      expect(ordenamientoBurbuja(undefined)).toBeUndefined();
    });
  });

  describe('busquedaBinaria', () => {
    test('debe encontrar elementos en arrays ordenados', () => {
      const arregloOrdenado = [1, 3, 5, 7, 9, 11, 13, 15];
      
      expect(busquedaBinaria(arregloOrdenado, 7)).toBe(3);
      expect(busquedaBinaria(arregloOrdenado, 1)).toBe(0);
      expect(busquedaBinaria(arregloOrdenado, 15)).toBe(7);
      expect(busquedaBinaria(arregloOrdenado, 5)).toBe(2);
    });

    test('debe retornar -1 para elementos no encontrados', () => {
      const arregloOrdenado = [1, 3, 5, 7, 9];
      
      expect(busquedaBinaria(arregloOrdenado, 2)).toBe(-1);
      expect(busquedaBinaria(arregloOrdenado, 10)).toBe(-1);
      expect(busquedaBinaria(arregloOrdenado, 0)).toBe(-1);
    });

    test('debe manejar arrays vacíos', () => {
      expect(busquedaBinaria([], 5)).toBe(-1);
      expect(busquedaBinaria(null, 5)).toBe(-1);
      expect(busquedaBinaria(undefined, 5)).toBe(-1);
    });
  });

  describe('mcd (Máximo Común Divisor)', () => {
    test('debe calcular MCD correctamente', () => {
      expect(mcd(48, 18)).toBe(6);
      expect(mcd(54, 24)).toBe(6);
      expect(mcd(17, 13)).toBe(1);
      expect(mcd(100, 25)).toBe(25);
    });

    test('debe manejar casos especiales', () => {
      expect(mcd(0, 5)).toBe(5);
      expect(mcd(5, 0)).toBe(5);
      expect(mcd(-12, 8)).toBe(4);
      expect(mcd(12, -8)).toBe(4);
    });
  });
});