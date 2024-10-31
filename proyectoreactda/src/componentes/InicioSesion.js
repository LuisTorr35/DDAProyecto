import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useAuth } from '../rutasegura/context';

const Login = () => {
	
	const [DNI, setDNI] = useState('');
	const [contra, setContra] = useState('');
	const navigate = useNavigate();
	const { setIsAuthenticated, setDNI: setDNIenContexto } = useAuth();
	const subida = async (e) => {
		e.preventDefault();
		try {
			const response = await Axios.post('http://localhost:3100/login', { DNI:DNI, contra:contra });
			if (response.data === "Login exitoso!") {
				setIsAuthenticated(true); // Actualiza el estado de autenticación
				setDNIenContexto(DNI);
				navigate('/login-seguro/libreria');
			} else {
				alert("Credenciales incorrectas.");
			}
		} catch (error) {
			console.error("Error al iniciar sesión:", error.response ? error.response.data : error.message);
			alert("Credenciales incorrectas."); // Muestra un mensaje de error
		}
	};
	return (
		<div className="container vh-100 d-flex align-items-center justify-content-center">
		{/* contenedor, flexbox centrado verticalmente y horizontalmente */}
		<div className="col-md-3" />
		{/* Columna 3 */}
		
		<div className="col-md-6">
		{/* Columna 6 */}
		<div className="p-4" style={{ border: 'none', backgroundColor: 'white' }}>
		{/* Logo / Imagen */}
		<div className="text-center mb-4">
		<div
		id="logo-placeholder"
		className="mx-auto mb-3"
		style={{
			width: '100%',
			maxWidth: '400px',
			height: '200px',
			backgroundColor: 'white',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '8px',
		}}
		>
		<img src='/imagenes/LogoLibroHub.png' alt="Logo de LibroHub" style={{ maxWidth: '100%', maxHeight: '100%' }} />
		</div>
		</div>
		
		{/* Formulario de inicio de sesión */}
		<h3 className="text-center mb-4" style={{fontFamily: 'Verdana, sans-serif', color: '#538fc6'}}>
		INGRESAR DATOS</h3>
		<form className={"form"} onSubmit={subida}>
		<div className="form-group mb-3">
		<input type="text" className="form-control" placeholder="DNI" value={DNI}
		onChange={(e) => setDNI(e.target.value)}
		style={{
			textAlign: 'center',
			color: "black",
			padding: '20px 20px'
		}} />
		</div>
		<div className="form-group mb-3">
		<input type="password" className="form-control" placeholder="Contraseña" value={contra}
		onChange={(e) => setContra(e.target.value)}
		style={{
			textAlign: 'center',
			color: "black",
			padding: '20px 20px'
		}} />
		</div>
		<div className="d-grid" style= {{display: 'flex', justifyContent: 'center'}}>
		<button type="submit" className="btn" style={{
			alignContent: 'center',
			backgroundColor: '#538fc6',
			color: 'white',
			borderRadius: '15px',
			border: 'none',
			padding: '10px 20px',
			width: '160px'
		}}>Iniciar Sesión</button>
		</div>
		</form>
		
		{/* Enlace para registrarse */}
		<p className="text-center mt-3" style={{ color: '#538fc6' }}>
		¿No tienes cuenta? <Link to="/register" style={{ color: '#538fc6' }}>Registrarse</Link>
		</p>
		</div>
		</div>
		
		{/* Columna 3 */}
		<div className="col-md-3" />
		</div>
	);
};

export default Login;
