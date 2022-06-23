import React, { Children } from "react";
import {Navigate, Outlet} from 'react-router-dom';
import UserContext from './UserContext';


const PrivateRouteAuth = ({children}) => {
    
    const {userInfo, setuserInfo} = React.useContext(UserContext);



    if(!userInfo){
        console.log("user info null")
        return <Navigate to='/login'></Navigate>
        
    }else {
        console.log("user authenticated");
        return <Outlet />
    } 

}

export default PrivateRouteAuth;