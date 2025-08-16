import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';
import {Toaster} from 'react-hot-toast'

const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='max-w-7xl mx-auto mt-10'>
                <Outlet></Outlet>
            </div>
            {/* To Do Footer */}


            <Toaster/>
        </div>
    );
};

export default MainLayout;