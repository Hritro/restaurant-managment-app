import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='max-w-7xl mx-auto mt-10'>
                <Outlet></Outlet>
            </div>
            {/* To Do Footer */}
        </div>
    );
};

export default MainLayout;