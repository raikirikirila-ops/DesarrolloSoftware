import { useState } from 'react'
import './App.css'
import Principal from './principal.jsx'
import Buscador from './buscador.jsx'
import Playlist from './playlist.jsx'
import Usuario from './usuario.jsx'

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
          <li>
            <button className='usericon' onClick={() => setSeccion('usuario')}><img className='usericon' src="https://imgs.search.brave.com/uRLjIz0r9LwrGq9jagcfeSqoD188L_55nkk0IhaFSrw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTk5/NDQ1MzIyL3Bob3Rv/L25hbmR1LXJoZWEt/YW1lcmljYW5hLWdy/ZWF0ZXItcmhlYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/NGc2MDRpUFBPbDBH/LXlzalBKalVnTmdx/bnFvMGl4SFFGWGhK/dnRhMWRFWT0" alt="Icono" /> </button>
          </li>
        </ul>
      </nav>
      <main>
        {seccion === 'principal' && <Principal />}
        {seccion === 'buscador' && <Buscador />}
        {seccion === 'playlist' && <Playlist />}
        {seccion === 'usuario' && <Usuario />}

      </main>
      <footer>Reproductor</footer>
    </div>
  )
}

export default App
