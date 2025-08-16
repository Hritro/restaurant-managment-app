import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";
 
export default function BannerSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
 
  const slides = [
    {
      img: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      title: "Fresh from the Kitchen",
      desc: "Savor every bite of dishes made with the freshest ingredients, cooked to perfection just for you."
    },
    {
      img: "https://www.shutterstock.com/image-photo/fried-salmon-steak-cooked-green-600nw-2489026949.jpg",
      title: "Flavors of the Day",
      desc: "A rotating menu of chef’s specials, bringing you exciting new tastes every single visit."
    },
    {
      img: "https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?semt=ais_hybrid&w=740&q=80",
      title: "Sweet Endings",
      desc: "Indulge in decadent desserts that are as beautiful to look at as they are delicious to eat."
    },
    {
      img: "https://content.jdmagicbox.com/v2/comp/hyderabad/u1/040pxx40.xx40.220319152238.e7u1/catalogue/pnr-food-plaza-and-restaurant-hyderabad-restaurants-m6h57h0sej.jpg",
      title: "Spice & Sizzle",
      desc: "Experience bold flavors and sizzling hot plates that awaken your taste buds."
    },
    {
      img: "https://www.foodandwine.com/thmb/eAleG5aGQtPlSkaQ15KrwHvjAZk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/6-Vital-Canadian-Restaurants-FT-4-MAG1223-02cac008b2a443428cec874ac6339c36.jpg",
      title: "Farm to Fork",
      desc: "Locally sourced ingredients transformed into wholesome, flavorful meals you’ll love."
    }
  ];
 
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="relative h-[500px] rounded-xl overflow-hidden">
          {/* Background Image */}
          <img
            src={slide.img}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
 
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6 text-white">
            <h3 className="text-3xl font-bold mb-2">{slide.title}</h3>
            <p className="max-w-xl">{slide.desc}</p>
            <Link to={'/all-food'}><button className="btn mt-5">Explore</button></Link>
          </div>
        </div>
      ))}
    </Slider>
  );
}