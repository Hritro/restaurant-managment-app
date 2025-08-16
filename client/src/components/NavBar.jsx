import React from 'react';
import { Link, Links, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { use } from 'react';

const NavBar = () => {
    const {user , logout} = use(AuthContext)
    // console.log(user)
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* For mobile device */}
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <Link to={'/'} className='btn btn-ghost text-xl'>My Restaurant</Link>
            </div>
            {/* For medium to large device */}
            <div className="navbar-center hidden md:flex gap-10">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/all-food'>All Foods</NavLink>
                <NavLink to='/gallery'>Gallery</NavLink>
            </div>
            <div className="navbar-end">
                {user ? (
                    <>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"><div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                            </div>
                            </div></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li>
                                    <Link to={'/myfood'}>My Food</Link>
                                </li>
                                <li>
                                    <Link to={'/addfood'}>Add Food</Link>
                                </li>
                                <li>
                                    <Link to={'/myorders'}>My Orders</Link>
                                </li>
                                <li>
                                    <button onClick={logout} className='btn btn-error btn-xs'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>): <Link to={'/login'} className='btn'>Login</Link>}
                </div>
        </div>
    );
};

export default NavBar;