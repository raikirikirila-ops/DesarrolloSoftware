import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Boton from './Boton';

describe('Componente Boton', () => {
  // Prueba básica de renderizado
  test('renderiza el botón con el texto correcto', () => {
    render(<Boton>Haz clic aquí</Boton>);
    const boton = screen.getByTestId('boton');
    expect(boton).toBeInTheDocument();
    expect(boton).toHaveTextContent('Haz clic aquí');
  });

  // Prueba de evento click
  test('llama a onClick cuando se hace clic', async () => {
    const manejarClic = jest.fn();
    const usuario = userEvent.setup();
    
    render(<Boton onClick={manejarClic}>Haz clic aquí</Boton>);
    const boton = screen.getByTestId('boton');
    
    await usuario.click(boton);
    expect(manejarClic).toHaveBeenCalledTimes(1);
  });

  // Prueba de variantes
  test('aplica la clase correcta para diferentes variantes', () => {
    const { rerender } = render(<Boton variante="primario">Primario</Boton>);
    let boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--primario');

    rerender(<Boton variante="secundario">Secundario</Boton>);
    boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--secundario');

    rerender(<Boton variante="peligro">Peligro</Boton>);
    boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--peligro');
  });

  // Prueba de tamaños
  test('aplica la clase correcta para diferentes tamaños', () => {
    const { rerender } = render(<Boton tamanio="pequenio">Pequeño</Boton>);
    let boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--pequenio');

    rerender(<Boton tamanio="mediano">Mediano</Boton>);
    boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--mediano');

    rerender(<Boton tamanio="grande">Grande</Boton>);
    boton = screen.getByTestId('boton');
    expect(boton).toHaveClass('btn--grande');
  });

  // Prueba de estado deshabilitado
  test('no ejecuta onClick cuando está deshabilitado', async () => {
    const manejarClic = jest.fn();
    const usuario = userEvent.setup();
    
    render(
      <Boton onClick={manejarClic} deshabilitado>
        Botón Deshabilitado
      </Boton>
    );
    
    const boton = screen.getByTestId('boton');
    expect(boton).toBeDisabled();
    
    await usuario.click(boton);
    expect(manejarClic).not.toHaveBeenCalled();
  });

  // Prueba de atributo tipo
  test('establece el tipo correcto del botón', () => {
    const { rerender } = render(<Boton tipo="submit">Enviar</Boton>);
    let boton = screen.getByTestId('boton');
    expect(boton).toHaveAttribute('type', 'submit');

    rerender(<Boton tipo="reset">Resetear</Boton>);
    boton = screen.getByTestId('boton');
    expect(boton).toHaveAttribute('type', 'reset');
  });

  // Prueba de props por defecto
  test('usa props por defecto cuando no se especifican', () => {
    render(<Boton>Botón Predeterminado</Boton>);
    const boton = screen.getByTestId('boton');
    
    expect(boton).toHaveClass('btn--primario');
    expect(boton).toHaveClass('btn--mediano');
    expect(boton).toHaveAttribute('type', 'button');
    expect(boton).not.toBeDisabled();
  });

  // Prueba con fireEvent (método alternativo)
  test('maneja eventos con fireEvent', () => {
    const manejarClic = jest.fn();
    render(<Boton onClick={manejarClic}>Fire Event</Boton>);
    
    const boton = screen.getByTestId('boton');
    fireEvent.click(boton);
    
    expect(manejarClic).toHaveBeenCalledTimes(1);
  });

  // Prueba de renderizado condicional
  test('renderiza contenido JSX como children', () => {
    render(
      <Boton>
        <span>Icono</span> Haz clic aquí
      </Boton>
    );
    
    const boton = screen.getByTestId('boton');
    expect(boton).toHaveTextContent('Icono Haz clic aquí');
    expect(screen.getByText('Icono')).toBeInTheDocument();
  });
});