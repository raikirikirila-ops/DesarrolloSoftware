import { useState } from 'react';
import { canciones } from './canciones.js'
function playlist() {

    const [busquedas, setBusqueda] = useState("");

    let resultados = canciones
    if (busquedas) {
        const texto = busquedas.toLowerCase()
        resultados = canciones.filter(
            c =>
                c.titulo.toLowerCase().includes(texto) ||
                c.autor.toLowerCase().includes(texto)
        )
    }

    return (
        <div>
            <input type="text" placeholder="Buscar..." onChange={e => setBusqueda(e.target.value)} />

            <table className='tabla'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Autor</th>
                        <th>Titulo</th>
                        <th>Duracion</th>
                    </tr>
                </thead>
                <tbody>
                    {resultados.length > 0 ? (
                        resultados.map((cancion, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{cancion.autor}</td>
                                <td>{cancion.titulo}</td>
                                <td>{cancion.duracion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No se encontraron resultados.</td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
    )
}

export default playlist;