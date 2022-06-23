import React, {useState, useEffect, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Container, Row, Card, Form, Button, Col, Modal} from 'react-bootstrap';
import api from '../services/api';
import qs from 'querystring';
import UserContext from '../UserContext';

const EditRecipie = () => {

    const dish_id = useParams().id;

    const [recipie, setData] = useState([]);

    useEffect(() => {
        getRecipie();
    }, []);

    
    const getRecipie = async () => {
        const response = await axios.get("http://localhost:3000/api/recipies/details/" + dish_id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.status === 200){
            setData(response.data);
        }
    }

    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setData({...recipie, [name]: value});
    }

    const submitForm = (event) => {
        event.preventDefault();
        recipie.id = dish_id;
        console.dir(recipie);

        send_form();
    }

    const navigate = useNavigate(); 

    const send_form = () => {
        console.log("send form");
        api.put('api/recipies/update', qs.stringify(recipie))
        .then(res => {
            
            navigate('/');
        }).catch(error => {
            setErrorMessage(error.response.data);
            setShow(true);
        })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);


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
<Card.Header>Edytuj przepis</Card.Header>
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
    <Form.Control type="text" placeholder="Czas wykonania" name="time" value={recipie.time} onChange={handleInputChange} required/>
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
    <Form.Select aria-label="Default select example" name="difficulty" defaultValue={recipie.difficulty} onChange={handleInputChange} required>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    </Form.Select>
</Form.Group>
<Form.Group className="mb-3">
    <Form.Label>Rodzaj potrawy</Form.Label>
    <Form.Select aria-label="Default select example" name="dish_kind" defaultValue={recipie.dish_kind} onChange={handleInputChange} required>
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

export {EditRecipie};