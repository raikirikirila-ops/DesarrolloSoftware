import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Principal from './principal.jsx'
import Buscador from './buscador.jsx'

function App() {
  const [seccion, setSeccion] = useState('principal')

  return (
    <div> 
      <nav>
        <ul>
          <li>
            <button onClick={() => setSeccion('principal')}>Biblioteca</button>
          </li>
          <li>
            <button onClick={() => setSeccion('buscador')}>Buscador</button>
          </li>
          <li>
            <button onClick={() => setSeccion('playlist')}>Playlist</button>
          </li>
        </ul>
      </nav>
      <main>
        {seccion === 'principal' && <Principal />}
        {seccion === 'buscador' && <Buscador />}
      </main>
      <footer>Reproductor</footer>
    </div>
  )
}

export default App
