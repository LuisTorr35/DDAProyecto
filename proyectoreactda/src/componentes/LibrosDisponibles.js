import React, { useEffect, useState } from 'react';
import Axios from 'axios';
const LibrosDisponibles = () =>{
    const [libros, setLibros] = useState([]);
    const getLibros = () => {
        Axios.get("http://localhost:3100/getlibros").then((response) => {
            setLibros(response.data);
            console.log(response.data);
            console.log("libros sacados de backend");
        })
    }
    useEffect(() => {
        getLibros();
        console.log("Libros cargados a lista");
    }, [])
    return (
        <div>
            <div><h1>Libros Disponibles</h1></div>
            {
                libros.length > 0 ? (
                    libros.map((val, key) => (
                        <div key={key}>
                            <p>Título: {val.titl}</p>
                            <p>Autor: {val.auto}</p>
                            <p>Categoría: {val.cate}</p>
                            <p>Stock: {val.stck}</p>
                            <p>Precio: ${val.prec}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No hay libros disponibles.</p>
                )
            }
        </div>
    )
}

export default LibrosDisponibles;