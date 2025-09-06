import { Link } from "react-router";

const MyFoodCard = ({food}) => {
    return (
         <div className="h-[400px] border border-gray-200 p-3 rounded-xl shadow-lg flex flex-col">
      {/* Image Section */}
      <div className="h-54 w-full bg-gray-100 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={food.foodImage}
          alt={food.foodName}
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between mt-3 space-y-2">
        <div>
          <h1 className="font-bold text-lg truncate">{food.foodName}</h1>

          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-700 bg-amber-400 px-3 py-1 text-sm rounded-xl">
              {food.foodCategory}
            </p>
            <p className="text-gray-100 bg-red-400 px-3 py-1 text-sm rounded-xl">
              {food.foodOrigin}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-gray-800 text-lg font-bold">${food.price}</p>
            <p className="text-gray-600 text-base font-semibold">
              {food.quantity} qty.
            </p>
          </div>
        </div>

        <Link to={`/update-food/${food._id}`}>
          <button className="btn btn-dash w-full mt-3">Update Item</button>
        </Link>
      </div>
    </div>
    );
};

export default MyFoodCard;