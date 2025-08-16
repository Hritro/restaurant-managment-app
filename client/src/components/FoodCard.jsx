const FoodCard = ({food}) => {
    console.log(food)
    return (
        <div>
            <h1>{food.foodName}</h1>
        </div>
    );
};

export default FoodCard;