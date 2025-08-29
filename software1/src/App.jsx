import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="sidebar">
        <ul>
          <li>Biblioteca</li>
          <li>Buscador</li>
          <li>Playlist</li>
        </ul>

      </nav>
      <main>


      </main>

      <footer>
        <nav ><img className='iconfooter' src="https://imgs.search.brave.com/tkett7u0p3_0IPTQHV8588S3yL6ZrIlLp-ueMuCuZkc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzQyL2Y2/LzUxLzQyZjY1MTJl/OGVlYjFhOTVmMmU2/ZDAxMTVlM2E0ZmUx/LmpwZw" alt="" /></nav>
        <h3>footer</h3>
      </footer>
    </>
  )
}

export default App
