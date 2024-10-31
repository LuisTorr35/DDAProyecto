import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './componentes/InicioSesion';
import Register from "./componentes/RegistroUsuario";
import Librohub from "./componentes/LibroHub";
import LoginSeguro from "./rutasegura/Auth";
import LibrosDisponibles from "./componentes/LibrosDisponibles";
import Compras from './componentes/ComprasRealizadas'; 
import { AuthProvider } from "./rutasegura/context";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />, // Ruta para el login
	},
	{
		path: "/register",
		element: <Register />, // Ruta para registro
	},
	{
		path: "/login-seguro", // Path para el componente de autenticación
		element: <LoginSeguro />,
		children: [
			{
				path: "libreria", // Rutas hijas relativas
				element: <Librohub />
			},
			{
				path: "librosdisponibles", // Rutas hijas relativas
				element: <LibrosDisponibles />
			},
			{
				path: "compras", // Rutas hijas relativas
				element: <Compras />
			}
		],
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
	<AuthProvider>
	<RouterProvider router={router} />
	</AuthProvider>
	</React.StrictMode>
);

// Medición de rendimiento
reportWebVitals();
