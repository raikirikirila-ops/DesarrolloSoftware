import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contador from './Contador';

describe('Componente Contador', () => {
  // Prueba de renderizado inicial
  test('renderiza con valor inicial por defecto', () => {
    render(<Contador />);
    
    const valorContador = screen.getByTestId('valor-contador');
    expect(valorContador).toHaveTextContent('0');
  });

  test('renderiza con valor inicial personalizado', () => {
    render(<Contador valorInicial={5} />);
    
    const valorContador = screen.getByTestId('valor-contador');
    expect(valorContador).toHaveTextContent('5');
  });

  // Pruebas de incremento
  test('incrementa el contador cuando se hace clic en +', async () => {
    const usuario = userEvent.setup();
    render(<Contador />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const valorContador = screen.getByTestId('valor-contador');
    
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('1');
    
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('2');
  });

  test('incrementa con paso personalizado', async () => {
    const usuario = userEvent.setup();
    render(<Contador paso={5} />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const valorContador = screen.getByTestId('valor-contador');
    
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('5');
  });

  // Pruebas de decremento
  test('decrementa el contador cuando se hace clic en -', async () => {
    const usuario = userEvent.setup();
    render(<Contador valorInicial={10} />);
    
    const botonDecrementar = screen.getByTestId('boton-decrementar');
    const valorContador = screen.getByTestId('valor-contador');
    
    await usuario.click(botonDecrementar);
    expect(valorContador).toHaveTextContent('9');
  });

  // Pruebas de reset
  test('resetea el contador al valor inicial', async () => {
    const usuario = userEvent.setup();
    render(<Contador valorInicial={5} />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const botonResetear = screen.getByTestId('boton-resetear');
    const valorContador = screen.getByTestId('valor-contador');
    
    // Incrementar primero
    await usuario.click(botonIncrementar);
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('7');
    
    // Luego resetear
    await usuario.click(botonResetear);
    expect(valorContador).toHaveTextContent('5');
  });

  // Pruebas de límites máximos
  test('no permite incrementar más allá del máximo', async () => {
    const usuario = userEvent.setup();
    render(<Contador valorInicial={8} maximo={10} />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const valorContador = screen.getByTestId('valor-contador');
    
    // Incrementar hasta el límite
    await usuario.click(botonIncrementar);
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('10');
    
    // Intentar incrementar más allá del límite
    await usuario.click(botonIncrementar);
    expect(valorContador).toHaveTextContent('10');
    expect(botonIncrementar).toBeDisabled();
  });

  // Pruebas de límites mínimos
  test('no permite decrementar más allá del mínimo', async () => {
    const usuario = userEvent.setup();
    render(<Contador valorInicial={2} minimo={0} />);
    
    const botonDecrementar = screen.getByTestId('boton-decrementar');
    const valorContador = screen.getByTestId('valor-contador');
    
    // Decrementar hasta el límite
    await usuario.click(botonDecrementar);
    await usuario.click(botonDecrementar);
    expect(valorContador).toHaveTextContent('0');
    
    // Intentar decrementar más allá del límite
    await usuario.click(botonDecrementar);
    expect(valorContador).toHaveTextContent('0');
    expect(botonDecrementar).toBeDisabled();
  });

  // Pruebas de información mostrada
  test('muestra información de paso, mínimo y máximo', () => {
    render(<Contador paso={2} minimo={0} maximo={10} />);
    
    expect(screen.getByText('Paso: 2')).toBeInTheDocument();
    expect(screen.getByText('Mínimo: 0')).toBeInTheDocument();
    expect(screen.getByText('Máximo: 10')).toBeInTheDocument();
  });

  test('no muestra mínimo/máximo cuando no están definidos', () => {
    render(<Contador paso={1} />);
    
    expect(screen.getByText('Paso: 1')).toBeInTheDocument();
    expect(screen.queryByText(/Mínimo:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Máximo:/)).not.toBeInTheDocument();
  });

  // Prueba de estado inicial de botones
  test('botones tienen el estado correcto al inicio', () => {
    render(<Contador valorInicial={5} minimo={0} maximo={10} />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const botonDecrementar = screen.getByTestId('boton-decrementar');
    
    expect(botonIncrementar).not.toBeDisabled();
    expect(botonDecrementar).not.toBeDisabled();
  });

  // Prueba de múltiples interacciones
  test('maneja múltiples operaciones correctamente', async () => {
    const usuario = userEvent.setup();
    render(<Contador valorInicial={0} paso={3} minimo={-5} maximo={15} />);
    
    const botonIncrementar = screen.getByTestId('boton-incrementar');
    const botonDecrementar = screen.getByTestId('boton-decrementar');
    const botonResetear = screen.getByTestId('boton-resetear');
    const valorContador = screen.getByTestId('valor-contador');
    
    // Secuencia de operaciones
    await usuario.click(botonIncrementar); // 3
    await usuario.click(botonIncrementar); // 6
    await usuario.click(botonDecrementar); // 3
    expect(valorContador).toHaveTextContent('3');
    
    await usuario.click(botonResetear); // 0
    expect(valorContador).toHaveTextContent('0');
    
    await usuario.click(botonDecrementar); // -3
    expect(valorContador).toHaveTextContent('-3');
  });
});