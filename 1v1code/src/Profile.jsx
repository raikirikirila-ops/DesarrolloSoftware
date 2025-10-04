
import { useState } from "react";
import './Profile.css';

export default function Profile() {
  // Input del usuario: declarativo
  const [js, setJs] = useState(`
barco gray (12,14) vertical 2

`);


  const filas = 15;
  const columnas = 15;

  // -------------------------
  // MATRIZ PREESTABLECIDA (Expected)
  // -------------------------
  const expected = Array.from({ length: filas + 1 }, () =>
    Array.from({ length: columnas + 1 }, () => "lightblue")
  );
  for (let j = 3; j <= 6; j++) expected[3][j] = "gray";
  for (let i = 5; i <= 9; i++) expected[i][10] = "darkgray";
  expected[12][4] = "black";
  expected[12][5] = "black";

  // -------------------------
  // MATRIZ DEL USUARIO (Preview)
  // -------------------------
  const preview = Array.from({ length: filas + 1 }, () =>
    Array.from({ length: columnas + 1 }, () => "lightblue")
  );

  js.trim().split("\n").forEach((line) => {
    const match = line.match(
      /barco\s+(\w+)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\s*(horizontal|vertical)?\s*(\d+)?/i
    );
    if (!match) return;

    const color = match[1];
    const fila = parseInt(match[2]);
    const col = parseInt(match[3]);
    const dir = match[4] ? match[4].toLowerCase() : null;
    const length = match[5] ? parseInt(match[5]) : 1;

    if (dir === "horizontal") {
      for (let j = 0; j < length; j++) {
        if (col + j <= columnas && fila >= 1 && fila <= filas) preview[fila][col + j] = color;
      }
    } else if (dir === "vertical") {
      for (let i = 0; i < length; i++) {
        if (fila + i <= filas && col >= 1 && col <= columnas) preview[fila + i][col] = color;
      }
    } else {
      if (fila >= 1 && fila <= filas && col >= 1 && col <= columnas) preview[fila][col] = color;
    }
  });

  // Tamaño más pequeño de los bloques
  const blockSize = 18;

  // Componente para renderizar tablero sin encabezados
  function Board({ matrix, blockSize }) {
    return (
      <table
        style={{
          borderCollapse: "collapse",
          tableLayout: "fixed",
          minWidth: `${columnas * blockSize}px`,
        }}
      >
        <tbody>
          {matrix.slice(1).map((fila, i) => (
            <tr key={i + 1}>
              {fila.slice(1).map((color, j) => (
                <td
                  key={j + 1}
                  style={{
                    width: `${blockSize}px`,
                    height: `${blockSize}px`,
                    backgroundColor: color,
                    border: "1px solid #333",
                  }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div style={{ display: "flex", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {/* Input */}
          <div style={{ minWidth: 320, maxWidth: 320 }}>
        <h3>JS Input</h3>
        <textarea
          value={js}
          onChange={(e) => setJs(e.target.value)}
          rows={10}
          cols={40}
            />
            <p style={{ width: "100%", marginTop: 8, marginBottom: 0, wordBreak: "break-word" }}>
              Como jugar: para crear un barco y colocarlo sigue las indicaciones:-barco -color -(pos x, pos y) -direccion -tamaño</p>
      </div>

      {/* Tableros */}
      <div style={{ display: "flex", gap: 10 }}>
        {/* Preview */}
        <div>
          <h3>Preview</h3>
          <Board matrix={preview} blockSize={blockSize} />
        </div>

        {/* Expected */}
        <div>
          <h3>Expected </h3>
          <Board matrix={expected} blockSize={blockSize} />
        </div>
      </div>
    </div>
  );
}
