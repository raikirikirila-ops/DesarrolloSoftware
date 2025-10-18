import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useFetch, useToggle } from './index';

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: jest.fn((key) => { delete store[key]; }),
    clear: jest.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock de fetch
global.fetch = jest.fn();

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('devuelve valor inicial cuando localStorage está vacío', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    expect(result.current[0]).toBe('initial-value');
  });

  test('devuelve valor de localStorage cuando existe', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  test('actualiza localStorage cuando se cambia el valor', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  test('funciona con valores complejos (objetos)', () => {
    const initialValue = { name: 'test', count: 0 };
    const { result } = renderHook(() => useLocalStorage('test-key', initialValue));
    
    const newValue = { name: 'updated', count: 5 };
    
    act(() => {
      result.current[1](newValue);
    });
    
    expect(result.current[0]).toEqual(newValue);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(newValue));
  });

  test('funciona con función como setValue', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));
    
    act(() => {
      result.current[1](prev => prev + 5);
    });
    
    expect(result.current[0]).toBe(15);
  });

  test('maneja errores de JSON.parse gracefully', () => {
    localStorageMock.getItem.mockReturnValue('invalid-json{');
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    
    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});

describe('useFetch Hook', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('estado inicial es loading=true, data=null, error=null', () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' })
    });

    const { result } = renderHook(() => useFetch('https://api.test.com/data'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  test('retorna datos exitosamente', async () => {
    const mockData = { id: 1, name: 'Test' };
    
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => 
      useFetch('https://api.test.com/data')
    );
    
    // Esperar a que el estado se actualice
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test('maneja errores de red', async () => {
    fetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => 
      useFetch('https://api.test.com/data')
    );
    
    // Esperar a que el estado se actualice
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network error');
  });

  test('maneja errores HTTP', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 404
    });

    const { result } = renderHook(() => 
      useFetch('https://api.test.com/data')
    );
    
    // Esperar a que el estado se actualice
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('HTTP error! status: 404');
  });

  test('no hace fetch cuando url es null', () => {
    const { result } = renderHook(() => useFetch(null));
    
    expect(fetch).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(true);
  });
});

describe('useToggle Hook', () => {
  test('valor inicial es false por defecto', () => {
    const { result } = renderHook(() => useToggle());
    
    expect(result.current[0]).toBe(false);
  });

  test('acepta valor inicial personalizado', () => {
    const { result } = renderHook(() => useToggle(true));
    
    expect(result.current[0]).toBe(true);
  });

  test('toggle cambia el valor', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1].toggle();
    });
    
    expect(result.current[0]).toBe(true);
    
    act(() => {
      result.current[1].toggle();
    });
    
    expect(result.current[0]).toBe(false);
  });

  test('setTrue establece valor en true', () => {
    const { result } = renderHook(() => useToggle(false));
    
    act(() => {
      result.current[1].setTrue();
    });
    
    expect(result.current[0]).toBe(true);
  });

  test('setFalse establece valor en false', () => {
    const { result } = renderHook(() => useToggle(true));
    
    act(() => {
      result.current[1].setFalse();
    });
    
    expect(result.current[0]).toBe(false);
  });
});