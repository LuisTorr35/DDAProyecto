import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../rutasegura/context';
import  Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Librohub = () => {
	
	const { DNI, setIsAuthenticated } = useAuth();
	const [nombre, setNombre] = useState('');
	const navigate = useNavigate();
	const getnomb = async(e) => {
		try {
			const response = await Axios.get('http://localhost:3100/getnombre', { params: { DNI } })
			console.log(response.data[0].nomb);
			setNombre(response.data[0].nomb.split(' ')[0]);
		} catch (error) {
			console.log(error)
		}
	}
	const cerrarSesion = () => {
		setIsAuthenticated(false);
		navigate('/');
	}
	useEffect(() => {
		getnomb();
		console.log("getnombre usando para extraer nombre");
	}, []);
	return (
		<div className="container vh-100 d-flex justify-content-center">
		<div className="align-self-center">
		<p> ¡HOLA: {nombre}! </p>
		<button onClick={() => navigate('/login-seguro/librosdisponibles')}>
		Ver Libros
		</button>
		<button onClick={() => navigate('/login-seguro/compras')}>
		Ver Compras
		</button>
		<button onClick={() => cerrarSesion()}>
		Cerrar Sesión
		</button>
		</div>
		</div>
	);
}
export default Librohub;