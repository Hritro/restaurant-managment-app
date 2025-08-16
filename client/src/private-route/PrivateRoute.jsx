import React, { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user , isLoading } = use(AuthContext)

    if(isLoading){
        return <div>Loading</div>
    }

    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    return children
};

export default PrivateRoute;