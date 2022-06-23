import React, {useState, useContext} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import api from '../services/api'
import UserContext from '../UserContext';

const Login = () => {

    const [details, setDetails] = useState({email:"", password:""});

    const {userInfo, setUserInfo} = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate(); 

    axios.defaults.withCredentials = true;

    const authenticate = async () =>{
        api.post('api/users/login', qs.stringify(details))
        .then(res => {
            console.log(res.data)
            setUserInfo({logged_in: true, data: res.data});
            navigate('/');

        }).catch(error => {
            console.log("ERROR: ")
            setShow(true);
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
        authenticate();
    };
    
    return(
        
        <Container>
           <Row>
           <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Logowanie nie powiodło się. Spróbuj ponownie.</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
           <Col xs={{span: 6, offset:3}}>
            <div className="login-box">
            <center><h1>LOGIN</h1></center>
            <br />
           <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                <Form.Text className="text-muted">
                Nie masz konta? <Link to='/register'>Zarejestruj się</Link>
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            </div>
            </Col>
           </Row>
            
        </Container>
    );

   
}

export {Login};