import React from 'react';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from "../hooks/useAxiosSecure";
import MyFoodCard from '../components/MyFoodCard';

const MyFood = () => {
    const {user} = use(AuthContext)
    const [myfoods, setMyfoods] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        axiosSecure.get(`/myfood/${user.email}`)
        .then(res => {
            setMyfoods(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    },[user, axiosSecure])

    console.log(myfoods)
    return (
        <div className='grid grid-cols-3 gap-5'>
                {
                    myfoods.map(food => <MyFoodCard key={food._id} food={food}></MyFoodCard>)
                }
        </div>
    );
};

export default MyFood;