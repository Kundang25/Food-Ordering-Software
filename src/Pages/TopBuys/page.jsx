import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import QuantityControl from "@/components/ui/quantity-control";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "@/redux/cartSlice";
import Combos from "../Combos";
import api from "@/services/axiosInstance";
import { useAuth } from "@/contexts/authContext";

const ItemSkeleton = () => (
  <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative animate-pulse">
    <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-slate-200 rounded-lg" />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <div className="h-6 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="h-6 bg-slate-200 rounded w-1/4 mt-2" />
      <div className="mt-2">
        <div className="h-6 w-16 bg-slate-200 rounded-full" />
      </div>
      <div className="absolute bottom-3 right-3">
        <div className="h-10 w-20 bg-slate-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const TopOrderedItems = () => {
  const {currentUser}=useAuth();
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const { totalItems, totalAmount } = cartState;

  const getItemQuantity = (item) => {
    const cartItem = cartState.items.find(
      (cartItem) =>
        cartItem.id === item.id && cartItem.category === item.item_type
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleDecrease = (item) => {
    const currentQty = getItemQuantity(item);
    if (currentQty === 1) {
      dispatch(removeFromCart({ id: item.id, category: item.item_type }));
    } else if (currentQty > 0) {
      dispatch(
        updateQuantity({
          id: item.id,
          category: item.item_type,
          quantity: currentQty - 1,
        })
      );
    }
  };

  const handleIncrease = (item) => {
    const currentQty = getItemQuantity(item);
    if (currentQty === 0) {
      dispatch(
        addToCart({
          id: item.id,
          category: item.item_type,
          name: item.name,
          selling_price: item.selling_price,
          image_url: item.image_url,
        })
      );
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          category: item.item_type,
          quantity: currentQty + 1,
        })
      );
    }
  };

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        category: item.item_type,
        name: item.name,
        selling_price: item.selling_price,
        image_url: item.image_url,
      })
    );
  };
  useEffect(() => {
    const fetchTopItems = async () => {
      try {
        const response = await api.get("top-ordered-items",{headers:{
          Authorization:`Bearer ${currentUser.token}`
        }});
        if (response.status != 200) {
          throw new Error("Failed to fetch top items");
        }
        const data = await response.data;
        setTopItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTopItems();
  }, []);
  if (loading)
    return (
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Top Buys</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {[...Array(3)].map((_, index) => (
            <ItemSkeleton key={index} />
          ))}
        </div>
      </div>
    );

  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  return (
    <div className="relative min-h-screen pb-20">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Top Buys</h2>
          <div className="flex-1 ml-4">
            <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {topItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img
                  src={item.image_url || "/api/placeholder/400/320"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="ml-2 text-base sm:text-lg md:text-xl font-bold">
                      {item.name}
                    </h3>
                  </div>
                </div>
                <p className="font-semibold text-base sm:text-lg md:text-xl mt-1">
                  ₹{item.selling_price}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    {item.item_type}
                  </Badge>
                </div>
                {item.availability && (
                  <div className="absolute bottom-3 right-3">
                    {getItemQuantity(item) > 0 ? (
                      <QuantityControl
                        quantity={getItemQuantity(item)}
                        onDecrease={() => handleDecrease(item)}
                        onIncrease={() => handleIncrease(item)}
                      />
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 font-semibold"
                      >
                        ADD
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {totalItems > 0 && (
        <>
          <div className="fixed bottom-0 left-0 right-0 z-50">
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
          </div>
          <div className="fixed bottom-0 left-0 right-0 bg-white h-16 z-40 shadow-lg"></div>
        </>
      )}
      <div>
        <Combos />
      </div>
    </div>
  );
};

export default TopOrderedItems;
