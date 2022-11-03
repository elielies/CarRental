import React from "react";
import './Header.scss';
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import {Container} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {logout} from "../../utils/services/auth-http-utils";
import {getLoggedUser} from "../../utils/services/auth-http-utils";



export function Header() {

    const navigate = useNavigate();
    const loggedUser = getLoggedUser();

    const onLogout = () => {
        logout().then(()=>{
            navigate('./login');
        })
    }

    const renderLogin = () => {
        if(loggedUser) {
            return <Link className="nav-link" onClick={onLogout}>Logout</Link>
        }
        return <Link className="nav-link" onClick={onLogout}>Login</Link>
    }
    return (
        <div className="header">
            <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" to="/users">Users</Link>
                    <Link className="nav-link" to="/users/create">Create users</Link>
                    {/* <Link className="nav-link" to="/tasks">Tasks</Link> */}
                    {/* <Link className="nav-link" to="/tasks/create">Create task</Link> */}
                    <Link className="nav-link" to="/vehicles">Vehicles</Link>
                    <Link className="nav-link" to="/vehicles/create">Create vehicle</Link>
                    <Link className="nav-link" to="/rentals">Rentals</Link>
                </Nav>
                {renderLogin()}

                {/* <Link className="nav-link" onClick={onLogout}>Logout</Link> */}
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}