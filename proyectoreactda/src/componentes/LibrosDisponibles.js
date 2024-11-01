import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const LibrosDisponibles = () => {
    const [libros, setLibros] = useState([]);
    const getLibros = () => {
        Axios.get("http://localhost:3100/getlibros").then((response) => {
            setLibros(response.data);
            console.log(response.data);
            console.log("libros sacados de backend");
        });
    };

    useEffect(() => {
        getLibros();
        console.log("Libros cargados a lista");
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center" style={{fontFamily: 'Verdana, sans-serif', color: '#9b9b9b'}}>Libros Disponibles</h1>
            {
                libros.length > 0 ? (
                    <table class="table caption-top">
                <thead>
                    <tr>
                    <th scope="col" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>Título</th>
                    <th scope="col" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>Autor</th>
                    <th scope="col" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>Categoría</th>
                    <th scope="col" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>Stock</th>
                    <th scope="col" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>Precio</th>
                    <th scope="col" className="text-center">
                        <img 
                            src="/imagenes/check.png" 
                            alt="Seleccionar" 
                            style={{ width: '20px', height: '20px' }} 
                        />
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {libros.length > 0 ? (
                    libros.map((val, key) => (
                        <tr key={key}>
                        <td style={{fontFamily: 'Verdana, sans-serif'}}>{val.titl}</td>
                        <td style={{fontFamily: 'Verdana, sans-serif'}}>{val.auto}</td>
                        <td style={{fontFamily: 'Verdana, sans-serif'}}>{val.cate}</td>
                        <td style={{fontFamily: 'Verdana, sans-serif'}}>{val.stck}</td>
                        <td style={{fontFamily: 'Verdana, sans-serif'}}>${val.prec}</td>
                        <td className="text-center">
                                        <input type="checkbox" style={{ verticalAlign: 'middle' }} />
                        </td>
                        </tr>
                    ))
                ) : (
                <tr>
                    <td colspan="6" className="text-center">No hay libros disponibles.</td>
                </tr>
                )}
            </tbody>
            </table>
                ) : (
                    <p className="text-center">No hay libros disponibles.</p>
                )
            }
            <div className="text-center mt-4">
                <button type="submit" className="btn" style={{
                    alignContent: 'center',
                    backgroundColor: '#538fc6',
                    color: 'white',
                    borderRadius: '15px',
                    border: 'none',
                    padding: '10px 20px',
                    width: '160px',
                    height: '60px'
                }}>Comprar</button>
                
            </div>
            <div className="text-center mt-4">
                <button className="btn" style={{
                    alignContent: 'center',
                    backgroundColor: '#c8d7e4',
                    color: '#6298ca',
                    borderRadius: '15px',
                    border: 'none',
                    padding: '10px 20px',
                    width: '160px',
                    
                }}>Cancelar</button>
            </div>
        </div>
    );
};

export default LibrosDisponibles;
