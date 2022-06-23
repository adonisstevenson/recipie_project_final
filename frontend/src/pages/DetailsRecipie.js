import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Container, Modal, Card, Col, Button, Form} from 'react-bootstrap';
import UserContext from '../UserContext';
import api from '../services/api';
import qs from 'querystring';

const Details = () =>{

    const dish_id = useParams().id;
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [recipie, setData] = useState([]);
    const [comments, setComments] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const [modalMessage, setModalMessage] = useState('');

    const [comment, setComment] = useState({comment: ''});

    useEffect(() => {
        getRecipie();
        getComments();
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
    const getComments = async () => {
        api.get(`http://localhost:3000/api/recipies/${dish_id}/comments`)
        .then(res => {
            setComments(res.data);
        })
    }

    const handleDelete = () =>{
        setModalMessage('Czy na pewno chcesz usunąć przepis?')
        setShow(true);
    }

    const navigate = useNavigate();

    const deleteDish = async () => {
        api.delete("http://localhost:3000/api/recipies/delete/"+dish_id)
        .then(res => {
            navigate('/');
        }).catch(error => {
            setModalMessage(error.response.data);
            setShow(true);
        });
    }


    const submitComment = e => {
        e.preventDefault();

        if (comments.length >= 5){
            setModalMessage("Liczba komentarzy dla jednego przepisu nie może przekraczać 5.");
            setShow(true);
            return
        }

        comment_recipie();
    };

    const comment_recipie = async () => {
        api.post(`api/recipies/${dish_id}/comment`, qs.stringify(comment))
        .then(res => {
            getComments();
            console.log(res);
            setModalMessage(res.data.message);
            setShow(true);

        })
        .catch(err => {
            setModalMessage(err.response.data);
            setShow(true);

        })
    }

    return(
        <Container>
            <Col xs={{span: 8, offset: 2}}>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Informacja!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Col>

            

            <Card style={{ width: '100%' }}>
            <center>
            <Card.Img variant="top" src={`/img/${recipie.photo}`} className={`dish-photo`}/>
            </center>
            <Card.Body>
                <Card.Title><h1>{recipie.name}</h1></Card.Title>
                <Card.Text>
                {recipie.description}
                </Card.Text>
                <Card.Text>
                <h4>Czas wykonania</h4>
                {recipie.time} min.
                </Card.Text>
                <Card.Text>
                <h4>Składniki</h4>
                {recipie.ingredients}
                </Card.Text>
                <Card.Text>
                <h4>Wykonanie</h4>
                {recipie.execution}
                </Card.Text>
                <br />
                <div style={{float: 'left'}}>
                <b>Autor: </b> {recipie.login}
                </div><br />
                {userInfo && userInfo.data.role_id == 2 ? <Link className={`btn btn-primary btn`} to={`/recipie/edit/${dish_id}`}>Edytuj przepis</Link> : ''}
                {userInfo && userInfo.data.role_id == 2 ? <Button variant="danger" onClick={handleDelete}>Usuń przepis</Button> : ''}
            </Card.Body>
            </Card>
            <br />
            <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title><h1>Komentarze</h1></Card.Title>
                {comments.map((comment, i) => (
                    <Card style={{ width: '100%', marginTop: '25px' }}>
                        <Card.Body>
                            <Card.Title><h5>{comment.login}</h5></Card.Title>
                            <small>{comment.date}</small> <br /><br />
                            <Card.Text><i>{comment.content}</i></Card.Text>
                        </Card.Body>
                    </Card>
                ))}
                <br />
                <Card style={{ width: '100%' }}>
                    <Card.Body>
                    <Form onSubmit={submitComment}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label><b>Dodaj komentarz</b></Form.Label>
                        <Form.Control as="textarea" rows={3} value={comment.comment} onChange={e => setComment({...comment, comment: e.target.value})} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Dodaj
                    </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </Card.Body>
            </Card>
        </Container>
    );

}

export {Details};