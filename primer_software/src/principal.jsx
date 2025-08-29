import { canciones } from "./canciones";

function Principal() {
return (
    <div>
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
};

export default Principal;