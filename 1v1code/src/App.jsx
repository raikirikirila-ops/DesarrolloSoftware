import { useState } from 'react';
import CodeEditor from './CodeEditor';
import './App.css';

function App() {
  const [section, setSection] = useState("home");

  return (
    <>
      <section className='boxApp' style={{ display: section === "home" ? "block" : "none" }}>
        <h1>Bienvenido a 1v1Code!</h1>
        <button className="botoncenter" onClick={() => setSection("code")}>jugar</button>
        <button className="botoncenter" onClick={() => setSection("user")}>Ver perfil</button>
      </section>
      <section style={{ display: section === "code" ? "block" : "none" }}>
        <CodeEditor />
      </section>    
      <section style={{ display: section === "user" ? "block" : "none" }}>
        
      </section>    
      </>
  );
}

export default App;