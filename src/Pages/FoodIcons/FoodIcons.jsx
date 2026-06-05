import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { addToCart } from "../../redux/cartSlice";
import Coffee from "../../assets/coffee.png";
import Panner from "../../assets/panner.avif";
import Samosa from "../../assets/Samosa.avif";
import TopBuys from "../TopBuys/page";
import api from "@/services/axiosInstance";
import { useAuth } from "@/contexts/authContext";

const FoodIcons = () => {
  const {currentUser}=useAuth()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollIndex, setScrollIndex] = useState(0);
  const [specialItems, setSpecialItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialItems = async () => {
      try {
        const response = await api.get('special-items',{headers:{
          Authorization:`Bearer ${currentUser.token}`
        }});
        const data = response.data
        setSpecialItems(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching special items:", err);
        setLoading(false);
      }
    };

    fetchSpecialItems();
  }, []);
  const handleNavigate = async (path) => {
    try {
      navigate(path);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSpecialItemClick = (item) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      selling_price: item.selling_price,
      image_url: item.image_url,
      category: item.category,
      quantity: 1
    }));
  };

  const handleScrollLeft = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const handleScrollRight = () => {
    if (scrollIndex < specialItems.length - 4) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const SpecialItemsSkeleton = () => (
    <div className="flex items-center space-x-4 md:space-x-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex flex-col items-center flex-shrink-0 animate-pulse">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full bg-gray-200"></div>
          <div className="mt-3 h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );

  const CategorySkeleton = () => (
    <div className="flex flex-col items-center w-1/3 animate-pulse">
      <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full bg-gray-200"></div>
      <div className="mt-3 h-6 w-24 bg-gray-200 rounded"></div>
    </div>
  );
  const safeSpecialItems = Array.isArray(specialItems) ? specialItems : [];

  return (
    <>
      <div className="grid grid-cols-1 text-gray-500 mt-4 sm:mt-1 md:mt-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4 sm:mb-6 md:mb-8">
            What's on Your Mind?
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl px-4 md:px-8">
            Craving something special or thinking about your next meal? 
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mb-10 mt-8 w-full">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 mr-4 text-center">
          Special food items of the day
        </h1>
        <div className="flex space-x-4">
          <button
            className={`bg-white border rounded-full shadow p-2 sm:p-3 ${
              scrollIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            onClick={handleScrollLeft}
            disabled={scrollIndex === 0 || loading}
          >
            <FaChevronLeft className="text-sm sm:text-base md:text-lg" />
          </button>
          <button
            className={`bg-white border rounded-full shadow p-2 sm:p-3 ${
              scrollIndex >= specialItems.length - 4
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
            onClick={handleScrollRight}
            disabled={scrollIndex >= specialItems.length - 4 || loading}
          >
            <FaChevronRight className="text-sm sm:text-base md:text-lg" />
          </button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden px-4">
        {loading ? (
          <SpecialItemsSkeleton />
        ) : (
          <div
            className="flex items-center space-x-4 md:space-x-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${scrollIndex * 20}%)`,
            }}
          >
            {specialItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer flex-shrink-0"
                onClick={() => handleSpecialItemClick(item)}
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <p className="mt-3 text-sm sm:text-base md:text-lg font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-5 font-bold ml-5">
        Search by Categories
      </div>
      <div className="flex justify-between px-4 mt-4">
        {loading ? (
          <>
            <CategorySkeleton />
            <CategorySkeleton />
            <CategorySkeleton />
          </>
        ) : (
          <>
            <div 
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => handleNavigate("/Food/Beverages")}
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
                <img
                  src={Coffee}
                  alt="coffee"
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-black font-bold">Beverages</p>
            </div>

            <div 
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => handleNavigate("/Food/Meal")}
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
                <img
                  src={Panner}
                  alt="panner"
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-black font-bold">Meals</p>
            </div>

            <div 
              className="flex flex-col items-center w-1/3 cursor-pointer"
              onClick={() => handleNavigate("/Food/Snacks")}
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-64 md:h-64 rounded-full overflow-hidden">
                <img
                  src={Samosa}
                  alt="samosa"
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                />
              </div>
              <p className="mt-3 text-base sm:text-lg md:text-xl text-black font-bold">Snacks</p>
            </div>
          </>
        )}
      </div>
      <div className="mt-5">
        <TopBuys />
      </div>
    </>
  );
};

export default FoodIcons;