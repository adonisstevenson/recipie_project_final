import React, {useState, useEffect, useContext} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {Container, Row, Badge, Col, Form, Nav, NavDropdown, Button} from 'react-bootstrap';
import UserContext from '../UserContext';
import api from '../services/api';

const Home = () => {

    const [recipies, setData] = useState([]);

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(() => {
        
        getRecipies();
    }, []);

    const getRecipies = async () => {
        const response = await axios.get("http://localhost:3000/api/recipies", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.status === 200){
            setData(response.data);
        }
    }

    const handleSort = (criteria) => {
        api.get(`api/recipies/by/${criteria}`)
        .then(res => {
            setData(res.data);
        })
        .catch(error => {
            console.log(`error ${error}`);
        });
        console.log(criteria);
    }

    return(
        <Container>
        <Row>
        <Col md={{span: 3}}>
        <Nav variant="pills" activeKey="1" onSelect={handleSort}>
        <NavDropdown title="Sortuj wg" id="nav-dropdown">
            <NavDropdown.Item eventKey="dish_kind">Rodzaj potrawy</NavDropdown.Item>
            <NavDropdown.Item eventKey="difficulty">Trudność wykonania</NavDropdown.Item>
            <NavDropdown.Item eventKey="author_id">Autor</NavDropdown.Item>
        </NavDropdown>
        </Nav>
            </Col>
        </Row>
        <Row>
            {recipies.map((recipie, i) => (
                <div className="col-lg-6">
                    <div className={`jumbotron dish-card`} style={{backgroundImage: `url(/img/${recipie.photo})`, backgroundColor: 'rgba(0, 0, 0, .4)'}}>
                        <Badge className={`kind-badge`}>{recipie.dish_kind}</Badge>
                        <h1 className="display-4">{recipie.name}</h1>
                        <p className="lead">{recipie.description}</p>
                        <hr className="my-4" />
                        <div>
                            <p>Poziom trudności <br />
                            
                            {[...Array(recipie.difficulty)].map((x, i) => 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                </svg>
                            )}
                            {[...Array(5-recipie.difficulty)].map((x, i) => 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                </svg>
                            )}

                            </p>
                            <div className="lead">
                                <Link className={`btn btn-primary btn-lg`} to={`/details/${recipie.id}`}>Zobacz przepis</Link>
                            </div>
                        </div>
                    </div>
                </div>            
            ))}
        </Row>
    </Container>
    )
}
export {Home};