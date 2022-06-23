import React, {useEffect, useContext} from "react";
import {Container, Form, Button, Col, Row, Modal} from 'react-bootstrap';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import api from '../services/api'
import UserContext from '../UserContext';

const Logout = () => {

    const {userInfo, setUserInfo} = useContext(UserContext);

    useEffect(() => {
        logout();
    }, []);

    const navigate = useNavigate();

    const logout = async () => {
        console.log("logging out");
        api.get(`api/users/logout`)
        .then(res => {
            setUserInfo(null);
            navigate('/')
        }).catch(error => {
            console.log('ERROR WHILE LOGGING OUT');
        })
    }

    return(<></>);

   
}

export {Logout};