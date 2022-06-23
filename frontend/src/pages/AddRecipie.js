import React, {useState, useEffect, useContext} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Card, Form, Button, Col, Modal} from 'react-bootstrap';
import api from '../services/api';
import qs from 'querystring';
import UserContext from '../UserContext';

const AddRecipie = () => {
    const initialFormState = {name: '', description: '', execution_time: '', 
    ingredients: '', execution: '', difficulty: '', dish_kind: '', photo: ''};

    const [recipie, setRecipie] = useState(initialFormState);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setRecipie({...recipie, [name]: value});
    }

    const submitForm = (event) => {
        event.preventDefault();
        send_form();
    }

    const navigate = useNavigate();

    const send_form = async () => {
        api.post('api/recipies/create', qs.stringify(recipie))
        .then(res => {
            navigate('/')
        }).catch(error => {
            setErrorMessage(error.response.data);
            setShow(true);
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {userInfo, setUserInfo} = useContext(UserContext);

    console.log(userInfo);

    return(
        <Container>
        <Row>
            <Col xs={{span: 8, offset: 2}}>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Informacja!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>

            <Card>
            <Card.Header>Dodaj przepis</Card.Header>
            <Card.Body>
            <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="dsad">
                <Form.Label>Nazwa potrawy</Form.Label>
                <Form.Control type="text" placeholder="Nazwa potrawy" name="name" value={recipie.name} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Opis</Form.Label>
                <Form.Control as="textarea" placeholder="Opis" name="description" value={recipie.description} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Czas wykonania</Form.Label>
                <Form.Control type="text" placeholder="Czas wykonania" name="execution_time" value={recipie.execution_time} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Składniki</Form.Label>
                <Form.Control as="textarea" placeholder="Składniki" name="ingredients" value={recipie.ingredients} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Wykonanie</Form.Label>
                <Form.Control as="textarea" placeholder="Wykonanie" name="execution" value={recipie.execution} onChange={handleInputChange} required/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Poziom trudności</Form.Label>
                <Form.Select aria-label="Default select example" name="difficulty" value={recipie.difficulty} onChange={handleInputChange} required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Rodzaj potrawy</Form.Label>
                <Form.Select aria-label="Default select example" name="dish_kind" value={recipie.dish_kind} onChange={handleInputChange} required>
                <option value="ciasta">Ciasta</option>
                <option value="pizze">Pizze</option>
                <option value="burgery">Burgery</option>
                <option value="obiady">Obiady</option>
                <option value="vege">Vege</option>
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Zdjęcie</Form.Label>
                <Form.Control type="text" name="photo" value={recipie.photo} onChange={handleInputChange} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
            </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
    )
}

export {AddRecipie};