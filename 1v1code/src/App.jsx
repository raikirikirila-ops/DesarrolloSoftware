import { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import JSgame from './JSgame';
import './App.css';

function App() {
  const [section, setSection] = useState("home");

  return (
    <>
      <section className='boxApp' style={{ display: section === "home" ? "block" : "none" }}>
        <h1>Bienvenido a 1v1Code!</h1>
        <button className="botoncenter" onClick={() => setSection("mode")}>jugar</button>
        <button className="botoncenter" onClick={() => setSection("user")}>Ver perfil</button>
      </section>
      <section style={{ display: section === "mode" ? "block" : "none" }}>
        <h2>Selecciona un modo de juego</h2>
        <button className="botoncenter" onClick={() => setSection("user")}>JS game</button>
        <button className="botoncenter" onClick={() => setSection("code")}>CSS game</button>
        <button className="botoncenter" onClick={() => setSection("home")}>Volver</button>
      </section>
      <section style={{ display: section === "code" ? "block" : "none" }}>
        <CodeEditor setSection={setSection} />
      </section>
      <section style={{ display: section === "user" ? "block" : "none" }}>
        <JSgame setSection={setSection} />
      </section>
    </>
  );
}

export default App;