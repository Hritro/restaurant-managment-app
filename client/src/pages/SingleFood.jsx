import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosPublic from '../hooks/useAxiosPublic';

const SingleFood = () => {
    const {id} = useParams()
    const [singleFood, setSingleFood] = useState({})
    const axiosPublic = useAxiosPublic()
    const [loading,setLoading] = useState(true)

    useEffect(() =>{
        axiosPublic.get(`/food/${id}`)
        .then(res =>{
            setSingleFood(res.data)
            setLoading(false)
        })
        .catch((err) =>{
            setLoading(false)
            console.log(err)
        })
    },[axiosPublic, id])

    if(loading){
        return <div>Loading....</div>
    }

    console.log(singleFood)

    return (
        <div className="border border-gray-200 shadow-lg rounded-lg mx-10 overflow-hidden flex">
            
            <div className="flex-1/2">
                
            </div>
            <div className="flex-1/2">
                <img src={singleFood.foodImage} alt=""/>
            </div>

        </div>
    );
};

export default SingleFood;