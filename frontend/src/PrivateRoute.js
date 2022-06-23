import React, { Children } from "react";
import {Navigate, Outlet} from 'react-router-dom';
import UserContext from './UserContext';


const PrivateRoute = ({children}) => {
    
    const {userInfo, setuserInfo} = React.useContext(UserContext);

    if(!userInfo){
        console.log("user info null")
        return <Navigate to='/login'></Navigate>
        
    }else if (userInfo.data.role_id == 2){
        
        console.log("user info good");
        return <Outlet />
    } else if (userInfo.data.role_id != 2){
        console.log("user is not an admin")
        return <Navigate to='/'></Navigate>
    }

}

export default PrivateRoute;