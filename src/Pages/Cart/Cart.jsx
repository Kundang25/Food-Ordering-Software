import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import QuantityControl from '@/assets/QuantityControlbutton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faArrowLeft, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import api from '@/services/axiosInstance';
import { useAuth } from '@/contexts/authContext';
import {toast} from "react-hot-toast"
const Cart = () => {
  const {currentUser}=useAuth()
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const baseAmount = useSelector(state => state.cart.totalAmount);
  const [pay,setPay]=useState(false)
  const calculateServiceCharge = (amount) => {
    const exactCharge = (amount * 310/100)/100
    return exactCharge
  };
  const serviceCharge=calculateServiceCharge(baseAmount)
  const totalAmount = baseAmount + serviceCharge;
    const checkoutHandler = async (amount, serviceCharge) => {
      setPay(true);
      try {
        const token = currentUser.token;
        const formattedItems = cart.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
          type: item.category === 'combo' ? 'combo' : 'menu_item',
        }));

        await api.post(
          "orders/place",
          { amount, serviceCharge, items: formattedItems },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate("/receipts");
      } catch (error) {
        toast.error("We're experiencing some server issues right now, please try again later");
        console.error("Error placing order:", error.message);
      } finally {
        setPay(false);
      }
    };
  const handleQuantityChange = (item, newQuantity) => {
    dispatch(updateQuantity({ id: item.id, category: item.category, quantity: newQuantity }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ id: item.id, category: item.category }));
  };

  const navigate = useNavigate();
  
  if (cart.length === 0) {
    return (
      <div className= "flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div 
          className="absolute top-4 left-4 cursor-pointer z-10"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            className="text-gray-600 text-2xl hover:text-gray-800 transition-colors"
          />
        </div>
        <FontAwesomeIcon 
          icon={faShoppingBag} 
          className="text-gray-300 text-6xl mb-6"
        />
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add items to begin your shopping journey!</p>
        <Button
          className="bg-green-500 hover:bg-green-600 text-white px-6"
          onClick={() => navigate('/')}
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-8">
          <div 
            className="cursor-pointer mr-4"
            onClick={() => navigate(-1)}
          >
            <FontAwesomeIcon 
              icon={faArrowLeft} 
              className="text-gray-600 text-xl hover:text-gray-800 transition-colors"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <Card
              key={`${item.category}-${item.id}`}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 font-medium">₹{item.selling_price}</p>
                    <p className="text-xs text-gray-400 capitalize mt-1">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <QuantityControl
                    quantity={item.quantity}
                    onDecrease={() => handleQuantityChange(item, item.quantity - 1)}
                    onIncrease={() => handleQuantityChange(item, item.quantity + 1)}
                  />
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex flex-col justify-between items-center  text-gray-800 gap-1">
                <span className='w-full flex justify-between text-sm'><p className="text-gray-700">Base Amount</p> <p>+₹{baseAmount.toFixed(2)}</p></span>
                <span className='w-full flex justify-between text-sm'><p className="text-gray-500">Service Charge *</p> <p>+₹{serviceCharge.toFixed(2)}</p></span>
                <span className='w-full flex justify-between'><p className="font-semibold">Total Amount</p> <p className='text-green-500'>₹{totalAmount.toFixed(2)}</p></span>
                <span className="w-full text-[10px] text-gray-500">* Our platform charges a 3.1% service fee for site operational sustainabilty so as to continue and support this no-queue service</span>             
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-[#f7741a] hover:bg-[orange] text-white py-6 rounded-lg text-lg font-semibold transition-colors"
              onClick={()=>checkoutHandler(baseAmount,totalAmount-baseAmount)}
              disabled={pay}
            >
              {pay ? "Placing Order..." : "Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;