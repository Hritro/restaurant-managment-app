import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import FoodCard from '../components/FoodCard';

const AllFoods = () => {
    const [foods, setFood] = useState([])
    const axiosPublic = useAxiosPublic()
    const [search,setSearch] = useState('')

    useEffect(()=>{
        axiosPublic.get('/all-foods')
        .then(res =>{
            setFood(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    },[axiosPublic])

    const handleSearch =  () =>{
        axiosPublic.get(`/all-foods?search=${search}`)
        .then(res =>{
            setFood(res.data)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    return (
        <div className=''>
            <div className='flex items-center gap-3 justify-center mb-10'>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                        >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) =>setSearch(e.target.value)} type="search" className="grow" placeholder="Search" />
                    <kbd className="kbd kbd-sm">⌘</kbd>
                    <kbd className="kbd kbd-sm">K</kbd>
                </label>
                <div>
                    <button onClick={handleSearch} className='btn btn-sm btn-primary'>Search</button>
                </div>
            </div>
            <div className='grid grid-cols-3 gap-5'>
                {
                    foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AllFoods;