import { useState } from "react";
import './CodeEditor.css';
const CodeEditor = ({ setSection }) => {
  const [html, setHtml] = useState(`<h1>Hola mundo</h1>`);
  const [css, setCss] = useState(`h1 { color: teal; }body{  color:#fffacd;}`);
  const [js, setJs] = useState(`let a = 2; let b = 3; return '<p>Suma: ' + (a+b) + '</p>';`);

  // JS del usuario
  let outputHtml = "";
  try {
    const fn = new Function(js);
    outputHtml = fn();
  } catch (err) {
    outputHtml = `<pre style="color:red">${err.message}</pre>`;
  }
  // Respuesta esperada
  const expectedHTML = ``;
  const expectedCSS = ``;
  const expectedJS = `return ''`;

  let expectedOutput = "";
  try {
    const fnExp = new Function(expectedJS);
    expectedOutput = fnExp();
  } catch (err) {
    expectedOutput = `<pre style="color:red">${err.message}</pre>`;
  }

  // Iframe del usuario
  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        ${outputHtml}
      </body>
    </html>
  `;

  // Iframe Expected
  const expectedSrcDoc = `
    <html>
      <head>
        <style>${expectedCSS}</style>
      </head>
      <body>
        ${expectedHTML}
        ${expectedOutput}
      </body>
    </html>
  `;
console.log(css)
  return (
    <>
    
      <div className="navbar">
        <button className="icon" onClick={() => setSection("home")}>0
       <img src="https://imgs.search.brave.com/s-aZ6fzJ9UnDlpvQuPkQI1XUk3k5BcbO7ERREVFb2l8/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvNTg3NC81ODc0/MTE3LnBuZw" alt="" />
        </button>
        </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {/* Editor */}
        <div>
          <h3>HTML</h3>
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} rows={6} cols={40} />

          <h3>CSS</h3>
          <textarea value={css} onChange={(e) => setCss(e.target.value)} rows={4} cols={40} />

          <h3>JS</h3>
          <textarea value={js} onChange={(e) => setJs(e.target.value)} rows={6} cols={40} />
        </div>

        {/* Vista previa del usuario */}
        <div>
          <h3>Preview</h3>
          <iframe
            title="preview"
            sandbox="allow-scripts"
            srcDoc={srcDoc}
            style={{ width: "100%", height: "400px", border: "1px solid black" }}
          />
        </div>

        {/* Expected */}
        <div>
          <h3>Respuesta Esperada</h3>
          <iframe
            title="expected"
            sandbox="allow-scripts"
            srcDoc={expectedSrcDoc}
            style={{ width: "100%", height: "400px", border: "1px solid black" }}
          />
        </div>
      </div>
    </>
  );
}
export default CodeEditor;