import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import FoodCard from '../components/FoodCard';

const AllFoods = () => {
    const [foods, setFood] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get('/all-foods')
        .then(res =>{
            setFood(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[axiosPublic])
    return (
        <div className=''>
            <div className='grid grid-cols-3 gap-5'>
                {
                    foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AllFoods;