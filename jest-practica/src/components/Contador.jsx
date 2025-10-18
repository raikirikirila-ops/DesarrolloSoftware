import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Boton from './Boton';
import './Contador.css';

/**
 * Componente Contador con controles de incremento, decremento y reset
 * @param {Object} props
 * @param {number} props.valorInicial
 * @param {number} props.paso
 * @param {number} props.minimo
 * @param {number} props.maximo
 */
const Contador = ({ valorInicial = 0, paso = 1, minimo, maximo }) => {
  const [cuenta, setCuenta] = useState(valorInicial);

  const incrementar = () => {
    setCuenta(cuentaPrevia => {
      const nuevoValor = cuentaPrevia + paso;
      return maximo !== undefined ? Math.min(nuevoValor, maximo) : nuevoValor;
    });
  };

  const decrementar = () => {
    setCuenta(cuentaPrevia => {
      const nuevoValor = cuentaPrevia - paso;
      return minimo !== undefined ? Math.max(nuevoValor, minimo) : nuevoValor;
    });
  };

  const resetear = () => {
    setCuenta(valorInicial);
  };

  const puedeIncrementar = maximo === undefined || cuenta < maximo;
  const puedeDecrementar = minimo === undefined || cuenta > minimo;

  return (
    <div className="contador" data-testid="contador">
      <h2>Contador</h2>
      <div className="contador__pantalla" data-testid="valor-contador">
        {cuenta}
      </div>
      <div className="contador__controles">
        <Boton
          onClick={decrementar}
          deshabilitado={!puedeDecrementar}
          variante="secundario"
          data-testid="boton-decrementar"
        >
          -
        </Boton>
        <Boton
          onClick={resetear}
          variante="peligro"
          tamanio="pequenio"
          data-testid="boton-resetear"
        >
          Resetear
        </Boton>
        <Boton
          onClick={incrementar}
          deshabilitado={!puedeIncrementar}
          variante="primario"
          data-testid="boton-incrementar"
        >
          +
        </Boton>
      </div>
      <div className="contador__info">
        <p>Paso: {paso}</p>
        {minimo !== undefined && <p>Mínimo: {minimo}</p>}
        {maximo !== undefined && <p>Máximo: {maximo}</p>}
      </div>
    </div>
  );
};

Contador.propTypes = {
  valorInicial: PropTypes.number,
  paso: PropTypes.number,
  minimo: PropTypes.number,
  maximo: PropTypes.number,
};

export default Contador;