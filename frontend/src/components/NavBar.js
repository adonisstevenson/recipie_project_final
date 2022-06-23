import React from "react";
import {Link} from 'react-router-dom';
import {Navbar, Nav, Container} from 'react-bootstrap';
import UserContext from '../UserContext';

const NavBar = () => {

    const {userInfo, setuserInfo} = React.useContext(UserContext);


    return(
        <Navbar bg="light" expand="lg" style={{marginBottom: "80px"}}>
        <Container>
            <Navbar.Brand href="#home">Przepisy i tu tego</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Link className="nav-link" to="/">Strona główna</Link>
                <Link className="nav-link" to="/recipie/add">Dodaj przepis</Link>
            </Nav>
            <Nav className="justify-content-end">
            {userInfo 
            ? <>
            <Link className="nav-link" to="/">Hello, {userInfo.data.login}</Link> 
            <Link className="nav-link" to="/logout">Logout</Link> </>
            : <Link className="nav-link" to="/login">Login</Link>}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavBar;