import React from 'react';
import PropTypes from 'prop-types';
import './Boton.css';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {Function} props.onClick
 * @param {string} props.variante
 * @param {string} props.tamanio
 * @param {boolean} props.deshabilitado
 * @param {string} props.tipo
 */
const Boton = ({ 
  children, 
  onClick, 
  variante = 'primario', 
  tamanio = 'mediano', 
  deshabilitado = false,
  tipo = 'button',
  ...otrosProps
}) => {
  const claseBase = 'btn';
  const claseVariante = `btn--${variante}`;
  const claseTamanio = `btn--${tamanio}`;
  
  const nombreClase = [claseBase, claseVariante, claseTamanio]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={tipo}
      className={nombreClase}
      onClick={onClick}
      disabled={deshabilitado}
      data-testid={otrosProps['data-testid'] || 'boton'}
      {...otrosProps}
    >
      {children}
    </button>
  );
};

Boton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variante: PropTypes.oneOf(['primario', 'secundario', 'peligro']),
  tamanio: PropTypes.oneOf(['pequenio', 'mediano', 'grande']),
  deshabilitado: PropTypes.bool,
  tipo: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Boton;