import { useState } from 'react'
import logoReact from './assets/react.svg'
import logoVite from '/vite.svg'
import './App.css'
import Boton from './components/Boton'
import Contador from './components/Contador'
import { useLocalStorage, useToggle } from './hooks'

function App() {
  const [cuenta, setCuenta] = useState(0)
  const [mensajeGuardado, setMensajeGuardado] = useLocalStorage('mensaje', '¡Hola Jest!')
  const [mostrarComponentes, { toggle }] = useToggle(true)

  return (
    <>
      <h1>React + Jest - Proyecto de Práctica</h1>
      
      <div className="card">
        <button onClick={() => setCuenta((cuenta) => cuenta + 1)}>
          la cuenta es {cuenta}
        </button>
        <p>
          Edita <code>src/App.jsx</code> y guarda para probar HMR
        </p>
      </div>

      <div className="examples">
        <h2>Componentes de Ejemplo para Testing</h2>
        
        <div className="toggle-section">
          <Boton onClick={toggle} variante="secundario">
            {mostrarComponentes ? 'Ocultar' : 'Mostrar'} Componentes
          </Boton>
        </div>

        {mostrarComponentes && (
          <>
            <div className="button-examples">
              <h3>Botones de Ejemplo</h3>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Boton onClick={() => alert('¡Primario!')}>
                  Primario
                </Boton>
                <Boton variante="secundario" onClick={() => alert('¡Secundario!')}>
                  Secundario
                </Boton>
                <Boton variante="peligro" onClick={() => alert('¡Peligro!')}>
                  Peligro
                </Boton>
                <Boton deshabilitado>
                  Deshabilitado
                </Boton>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                <Boton tamanio="pequenio">Pequeño</Boton>
                <Boton tamanio="mediano">Mediano</Boton>
                <Boton tamanio="grande">Grande</Boton>
              </div>
            </div>

            <div className="counter-example">
              <h3>Contador con Límites</h3>
              <Contador valorInicial={5} paso={2} minimo={0} maximo={20} />
            </div>

            <div className="localstorage-example">
              <h3>Hook LocalStorage</h3>
              <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                <p>Mensaje guardado: <strong>{mensajeGuardado}</strong></p>
                <input
                  type="text"
                  value={mensajeGuardado}
                  onChange={(e) => setMensajeGuardado(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  style={{ padding: '0.5rem', margin: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                  Este mensaje se guarda automáticamente en localStorage
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="instructions">
        <h3>🧪 Comandos de Testing</h3>
        <div style={{ textAlign: 'left', background: '#f5f5f5', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
          <code>npm test</code> - Ejecutar todas las pruebas<br/>
          <code>npm run test:watch</code> - Ejecutar pruebas en modo watch<br/>
          <code>npm run test:coverage</code> - Ejecutar pruebas con reporte de cobertura
        </div>
      </div>

      <p className="read-the-docs">
        Los componentes Boton y Contador incluyen pruebas completas con Jest y React Testing Library
      </p>
    </>
  )
}

export default App
