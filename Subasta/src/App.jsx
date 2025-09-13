import { useState } from 'react'
import './App.css'
import Principal from './principal.jsx'
//import Buscador from './buscador.jsx'
//import Playlist from './playlist.jsx'
//import Usuario from './usuario.jsx'

function App() {
  const [seccion, setSeccion] = useState('principal')

  return (
    <div>
      <nav>
        <ul>
          <li>
            <button onClick={() => setSeccion('principal')}>Principal</button>
          </li>
          
          
        </ul>
      </nav>
      <main>
        {seccion === 'principal' && <Principal />}
        

      </main>
      <footer>Hola</footer>
    </div>
  )
}

export default App
