import {Outlet, Navigate} from "react-router";
import {useAuth} from "./context";

export default function LoginSeguro () {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}