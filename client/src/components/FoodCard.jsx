import { Link } from "react-router";

const FoodCard = ({food}) => {
    console.log(food)
    return (
        <div className="border border-gray-200 p-3 rounded-lg shadow-lg space-y-2">
            <div className="h-[180px] bg-gray-100 rounded-lg">
                <img className="rounded-lg" src={food.foodImage} alt=""></img>
            </div>
            <h1 className="font-bold">{food.foodName}</h1>
            <div className="flex items-center justify-between">
                <p className="text-gray-500 bg-amber-400 px-4 rounded-xl">{food.foodCategory}</p>
                <p className="text-gray-100 bg-red-400 px-4 rounded-xl">{food.foodOrigin}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-gray-500 bg-blue-300 rounded-xl px-4 text-lg">${food.price}</p>
                <p className="text-gray-500 bg-green-300 rounded-xl px-4 text-lg">{food.quantity}qty.</p>
            </div>
            <Link to={`/food/${food._id}`}><button className="btn btn-dash my-3 w-full">View Details</button></Link>
        </div>
    );
};

export default FoodCard;