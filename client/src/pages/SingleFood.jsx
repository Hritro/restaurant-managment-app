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

    // console.log(singleFood)

    return (
        <div className="border border-gray-200 shadow-lg rounded-lg mx-10 overflow-hidden flex">     
            <div className="w-1/2 p-5 space-y-3">
                <div className="text-xl font-bold">Food Name : {singleFood.foodName}</div>
                <div className="badge badge-primary">Catagory : {singleFood.foodCategory}</div>
                <div className="badge badge-secondary ml-3">Origin : {singleFood.foodOrigin}</div>
                <p>{singleFood.description}</p>
                <div className="flex items-center gap-3">
                    <div className="text=2xl font-bold">Price : ${singleFood.price}</div>
                    <div className="badge badge-info">Available: {singleFood.quantity}</div>
                    <div className="badge badge-info">10 times</div>
                </div>

                <button className="btn btn-primary w-full">Purchase</button>

                <hr className="text-gray-300"/>

                <div className="text-sm">
                    <h3 className="font-bold">Added By: {singleFood.addedByName}</h3>
                    <p className="font-meduim text-xs">Adder Email: {singleFood.addedByEmail}</p>
                </div>

            </div>
            <div className="w-1/2 flex items-center">
                <img className="rounded-lg h-full w-full object-cover" src={singleFood.foodImage} alt=""/>
            </div>

        </div>
    );
};

export default SingleFood;