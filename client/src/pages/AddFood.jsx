import { use, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
 
const AddFood = () => {
  const {user} = use(AuthContext)

  const axiosSecure = useAxiosSecure()
 
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    foodCategory: "",
    quantity: "",
    price: "",
    addedByName: user.displayName,
    addedByEmail: user.email,
    foodOrigin: "",
    description: "",
  });
 
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure.post('/add-food', formData)
    .then(res =>{
        console.log(res.data)
        toast.success('Food item added sucessfully!')
    })
    .catch(err =>{
        console.log(err)
    })
 
  };
 
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Food Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Food Name */}
        <div>
          <label className="block font-medium mb-1">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter food name"
            required
          />
        </div>
 
        {/* Food Image */}
        <div>
          <label className="block font-medium mb-1">Food Image URL</label>
          <input
            type="url"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter image URL"
            required
          />
        </div>

        {
          formData.foodImage && <div>
            <img src={formData.foodImage}/>
          </div>
        }
 
        {/* Food Category */}
        <div>
          <label className="block font-medium mb-1">Food Category</label>
          <input
            type="text"
            name="foodCategory"
            value={formData.foodCategory}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="e.g. Dessert, Fast Food, Beverage"
            required
          />
        </div>
 
        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter quantity"
            required
          />
        </div>
 
        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter price"
            required
          />
        </div>
 
        {/* Added By */}
        <div>
          <label className="block font-medium mb-1">Added By (Name)</label>
          <input
            type="text"
            value={formData.addedByName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
 
        <div>
          <label className="block font-medium mb-1">Added By (Email)</label>
          <input
            type="email"
            value={formData.addedByEmail}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>
 
        {/* Food Origin */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Food Origin (Country)</label>
          <input
            type="text"
            name="foodOrigin"
            value={formData.foodOrigin}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter country of origin"
            required
          />
        </div>
 
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Short Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
            placeholder="Write about ingredients, making procedure, etc."
            required
          ></textarea>
        </div>
 
        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};
 
export default AddFood;