import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCartShopping, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import api from "@/services/axiosInstance";
import { useAuth } from "@/contexts/authContext";
const Beverages = () => {
  const {currentUser} = useAuth();
  const [beverages, setBeverages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartState = useSelector(state => state.cart);
  const totalItems = cartState.totalItems;
  const totalAmount = cartState.totalAmount;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.token) return;

    const fetchBeverages = async () => {
      try {
        const response = await api.get("beverages");
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.data;
        setBeverages(data.beverages);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching beverages:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeverages();
  }, [currentUser]);

  const filteredBeverages = beverages.filter((beverage) =>
    beverage.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className=" fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        <div className="loader border-t-4 border-b-4 border-gray-300 rounded-full w-12 h-12 animate-spin"></div>
        <div className="text-lg text-gray-500 mt-4">Loading beverages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-red-500">Unable to fetch the menu at the moment</div>
      </div>
    );
  }

  return (
    <div className="mt-20 relative min-h-screen pb-24">
      <div 
        className="absolute top-2 left-4 cursor-pointer z-10"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon 
          icon={faArrowLeft} 
          className="text-gray-600 text-xl hover:text-gray-800"
        />
      </div>

      <div className="mt-2 ml-10 relative w-[85%]">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <Input
          className="rounded-xl w-full pl-10"
          placeholder="Search beverages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="mt-4 space-y-4 mb-20">
        {filteredBeverages.map((beverage) => (
          <MenuItem
            key={beverage.id}
            id={beverage.id}
            image_url={beverage.image_url}
            name={beverage.name}
            selling_price={beverage.selling_price}
            availability={beverage.availability}
            item_type="beverage"
          />
        ))}
      </div>

      {/* Cart Notification - Modified for better visibility */}
      {totalItems > 0 && (
        <><div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="mx-2 mb-2 rounded-2xl bg-[#f7741a] text-white p-3 shadow-lg">
            <div className="h-7 max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <span className="font-bold">{totalItems} items</span>
                <span className="mx-2">|</span>
                <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
              </div>
              <div
                onClick={() => navigate("/cart")}
                className="bg-[#f7741a] text-white mr-5 font-bold cursor-pointer transition-colors duration-200 px-3 py-1 rounded"
              >
                View Cart
                <FontAwesomeIcon icon={faCartShopping} className="ml-2" />
              </div>
            </div>
          </div>
        </div><div className="fixed bottom-0 left-0 right-0 bg-white h-16 z-40 shadow-lg"></div></>
      
      )}
    </div>
  );
};

export default Beverages;