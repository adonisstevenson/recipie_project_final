import React, {useState, useContext} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import api from '../services/api'
import UserContext from '../UserContext';

const Register = () => {

    const [details, setDetails] = useState({login: "", email: "", password: ""});


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const navigate = useNavigate(); 

    const [modalMessage, setModalMessage] = useState('');

    const register = async () =>{
        api.post('api/users/register', qs.stringify(details))
        .then(res => {
            console.log(res.data)
            navigate('/login');

        }).catch(error => {
            setModalMessage(error.data.message);
            setShow(true);
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        console.log(details);
        register();
    };
    
    return(
        
        <Container>
           <Row>
           <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
           <Col xs={{span: 6, offset:3}}>
            <div className="login-box">
            <center><h1>REGISTER</h1></center>
            <br />
           <Form onSubmit={submitHandler}>
           <Form.Group className="mb-3" controlId="dsad">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Login" name="login" value={details.login} onChange={e => setDetails({...details, login: e.target.value})} required/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
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

export {Register};