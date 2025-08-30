import { useState } from 'react'
import './App.css'
import Principal from './principal.jsx'
import Buscador from './buscador.jsx'
import Playlist from './playlist.jsx'

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
        {seccion === 'playlist' && <Playlist />}
      </main>
      <footer>Reproductor</footer>
    </div>
  )
}

export default App
