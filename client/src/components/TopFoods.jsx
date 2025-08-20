import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import FoodCard from './FoodCard';

const TopFoods = () => {
    const [foods, setFood] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get('/top-foods')
        .then(res =>{
            setFood(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[axiosPublic])
    return (
        <div className='mt-20'>
            <h1 className='text-3xl font-bold text-center mb-10'>Top Foods</h1>
            <div className='grid grid-cols-3 gap-5'>
                {
                    foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default TopFoods;