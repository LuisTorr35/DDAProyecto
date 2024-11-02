import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../rutasegura/context';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Librohub = () => {
	const { DNI, setIsAuthenticated } = useAuth();
	const [nombre, setNombre] = useState('');
	const navigate = useNavigate();

	const getnomb = async () => {
		try {
			const response = await Axios.get('http://localhost:3100/getnombre', { params: { DNI } });
			console.log(response.data[0].nomb);
			setNombre(response.data[0].nomb.split(' ')[0]);
		} catch (error) {
			console.log(error);
		}
	};

	const cerrarSesion = () => {
		setIsAuthenticated(false);
		navigate('/');
	};

	useEffect(() => {
		getnomb();
		console.log("getnombre usando para extraer nombre");
	}, []);

	return (
		<div className="container vh-100 d-flex flex-column align-items-center justify-content-start">
			<div style={{ marginTop: '100px', textAlign: 'center' }}>
				<h1 style={{ fontFamily: 'Verdana, sans-serif', color: '#9b9b9b' }}>¡Hola, {nombre}!</h1>
			</div>
			<div className="d-flex" style={{ marginTop: '40px', gap: '100px' }}>
				<button className="btn" style={{
					backgroundColor: '#538fc6',
					color: '#c8d7e4',
					borderRadius: '15px',
					border: 'none',
					padding: '10px 20px',
					width: '140px',
					height: '50px'
				}} onClick={() => navigate('/login-seguro/librosdisponibles')}>
					Ver Libros
				</button>
				<button className="btn" style={{
					backgroundColor: '#538fc6',
					color: '#c8d7e4',
					borderRadius: '15px',
					border: 'none',
					padding: '10px 20px',
					width: '140px',
					height: '50px'
				}} onClick={() => navigate('/login-seguro/compras')}>
					Ver Compras
				</button>
			</div>
			<button className="btn" style={{
				backgroundColor: '#ff7275',
				color: '#c8d7e4',
				borderRadius: '15px',
				border: 'none',
				padding: '10px 20px',
				width: '160px',
				height: '60px',
				marginTop: '20px'
			}} onClick={cerrarSesion}>
				Cerrar Sesión
			</button>
		</div>
	);
};

export default Librohub;
