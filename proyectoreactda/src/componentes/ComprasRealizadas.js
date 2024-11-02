import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../rutasegura/context';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const ComprasRealizadas = () => {
    const [compras, setCompras] = useState([]);
    const { DNI } = useAuth();
    const navigate = useNavigate(); // Inicializa useNavigate

    const getCompras = () => {
        try {
            Axios.get("http://localhost:3100/getcompras", { params: { DNI } })
                .then((response) => {
                    setCompras(response.data);
                    console.log(response.data);
                })
                .catch((err) => {
                    console.log("Error al obtener compras:", err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCompras();
        console.log("Compras cargadas a la lista");
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center" style={{ fontFamily: 'Verdana, sans-serif', color: '#9b9b9b' }}>Compras Realizadas</h1>
            {
                compras.length > 0 ? (
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col" style={{ fontFamily: 'Verdana, sans-serif', color: '#538fc6' }}>ID Compra</th>
                                <th scope="col" style={{ fontFamily: 'Verdana, sans-serif', color: '#538fc6' }}>Fecha de Compra</th>
                                <th scope="col" style={{ fontFamily: 'Verdana, sans-serif', color: '#538fc6' }}>Precio Total</th>
                                <th scope="col" style={{ fontFamily: 'Verdana, sans-serif', color: '#538fc6' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((compra, index) => (
                                <tr key={index}>
                                    <td style={{ fontFamily: 'Verdana, sans-serif' }}>{compra.idco}</td>
                                    <td style={{ fontFamily: 'Verdana, sans-serif' }}>{new Date(compra.feco).toLocaleDateString()}</td>
                                    <td style={{ fontFamily: 'Verdana, sans-serif' }}>${compra.prec}</td>
                                    <td style={{ fontFamily: 'Verdana, sans-serif' }}>
                                        {compra.stat === 1 ? "Pagado" : "No pagado"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No hay compras realizadas.</p>
                )
            }
            <div className="text-center mt-4">
                <button className="btn" style={{
                    backgroundColor: '#538fc6',
                    color: 'white',
                    borderRadius: '15px',
                    border: 'none',
                    padding: '10px 20px',
                }} onClick={() => navigate('/login-seguro/libreria')}>
                    Regresar a Librería
                </button>
            </div>
        </div>
    );
};

export default ComprasRealizadas;
