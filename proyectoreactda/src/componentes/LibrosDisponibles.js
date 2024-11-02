import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../rutasegura/context';
import { useNavigate } from 'react-router-dom';

const LibrosDisponibles = () => {
    const [libros, setLibros] = useState([]);
    const [librosSeleccionados, setLibrosSeleccionados] = useState([]);
    const { DNI } = useAuth();
    const navigate = useNavigate();
    const getLibros = () => {
        Axios.get("http://localhost:3100/getlibros").then((response) => {
            setLibros(response.data);
            console.log(response.data);
            console.log("libros sacados de backend");
        });
    };

    const checklistLibro = (libro) => {
        setLibrosSeleccionados((prevSeleccionados) => {
            if (prevSeleccionados.some(item => item.idli === libro.idli)) {
                return prevSeleccionados.filter((item) => item.idli !== libro.idli);
            } else {
                return [...prevSeleccionados, libro];
            }
        });
    }

    const realizarCompra = () =>{
        if (librosSeleccionados.length === 0) {
            alert("No hay libros seleccionados.");
            return;
        }
        
        Axios.post("http://localhost:3100/comprarLibros", {
            DNI, librosSeleccionados: librosSeleccionados.map(libro => ({
                
                idli: libro.idli,
                cantidad: 1, 
                precio: libro.prec
            }))
            
        }).then(() => {
            alert("Compra realizada con éxito!");
            getLibros();
            setLibrosSeleccionados([]);
        }).catch((err)=> {
            console.log(err);
        })
        
    }

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
                            <input type="checkbox" style={{ verticalAlign: 'middle' }} 
                            onChange={() => checklistLibro(val)} 
                            checked={librosSeleccionados.some(item => item.idli === val.idli)}
                            />
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
                }}
                onClick={realizarCompra}
                >Comprar</button>
                
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
                    
                }}
                onClick={() => navigate('/login-seguro/libreria')}
                >Cancelar</button>
            </div>
        </div>
    );
};

export default LibrosDisponibles;
