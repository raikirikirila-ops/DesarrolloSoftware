import { canciones } from "./canciones";
import { useState } from "react";

function Buscador() {
    const [busqueda, setBusqueda] = useState("");

    let resultados = canciones
    if (busqueda) {
        const texto = busqueda.toLowerCase()
        resultados = canciones.filter(
            c =>
                c.titulo.toLowerCase().includes(texto) ||
                c.autor.toLowerCase().includes(texto)
        )
    }

    return (
        <div>
            <h1>Buscar música</h1>
            <input type="text" placeholder="Buscar..." onChange={e => setBusqueda(e.target.value)} />
            <div className="canciones-lista">
                {resultados.length > 0 ? (
                resultados.map((cancion, idx) => (
                    <div className="cancion-card" key={idx}>
                    <img src={cancion.imagen} alt={cancion.titulo} className="cancion-img" />
                    <div className="cancion-info">
                        <strong>{cancion.titulo}</strong>
                        <div>{cancion.autor}</div>
                    </div>
                    </div>
                ))
                ) : (
                <div>No se encontraron resultados.</div>
                )}
            </div>
            <h1>Escuchadas recientemente.</h1>
            <p>Explora tu biblioteca, busca canciones y crea listas de reproducción.</p>
            <div className="canciones-lista">
            {canciones.map((cancion, index) => (
                <div className="cancion-card" key={index}>
                    <img src={cancion.imagen} className='cancion-img' alt='Portada de la canción'></img>
                    <div className='cancion-info'>
                        <h2>{cancion.titulo}</h2>
                        <p>{cancion.autor}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
    )
}

export default Buscador;