import {
  createBrowserRouter,
}from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AllFoods from "./pages/AllFoods";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyFood from "./pages/MyFood";
import AddFood from "./pages/AddFood";
import MyOrders from "./pages/MyOrders";
import PrivateRoute from "./private-route/PrivateRoute";
import SingleFood from "./pages/singleFood";
import UpdateFood from "./pages/UpdateFood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/all-food',
            element: <AllFoods></AllFoods>
        },
        {
          path: 'food/:id',
          element: <SingleFood></SingleFood>
        },
        {
          path: '/gallery',
          element: <Gallery></Gallery>
        },
        {
          path: '/myfood',
          element: <PrivateRoute><MyFood></MyFood></PrivateRoute>
        },
        {
          path: '/addfood',
          element: <PrivateRoute><AddFood></AddFood></PrivateRoute>
        },
        {
          path: '/update-food/:id',
          element: <PrivateRoute><UpdateFood></UpdateFood></PrivateRoute>
        },
        {
          path: '/myorders',
          element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
        },
        {
          path:'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        }
    ]
  },
]);