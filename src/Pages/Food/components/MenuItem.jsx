import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../../../redux/cartSlice';
import QuantityControl from "@/components/ui/quantity-control";

const MenuItem = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);
    const handleDecrease = (meal) => {
        const currentQty = getItemQuantity(meal);
        if (currentQty === 1) {
            dispatch(removeFromCart({ 
                id: meal.id, 
                category: meal.item_type 
            }));
        } else if (currentQty > 0) {
            dispatch(updateQuantity({ 
                id: meal.id, 
                category: meal.item_type, 
                quantity: currentQty - 1 
            }));
        }
    };

    const handleIncrease = (meal) => {
        dispatch(addToCart({
            id: meal.id,
            name: meal.name,
            image_url: meal.image_url,
            selling_price: meal.selling_price,
            category: meal.item_type,
            quantity: 1
        }));
    };

    const getItemQuantity = (meal) => {
        const cartItem = cart.find(
            (item) => item.id === meal.id && item.category === meal.item_type
        );
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <div className="flex items-start space-x-4 bg-white rounded-lg shadow-sm p-3 relative mx-4">
            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                <img
                    src={props.image_url}
                    alt={props.name}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        
                        <h3 className="ml-2 text-lg md:text-xl font-bold">
                            {props.name}
                        </h3>
                    </div>
                </div>

                <p className="font-semibold text-lg mt-1 ml-2">
                    ₹{props.selling_price}
                </p>
                {!props.availability && (
                    <div className="mt-2 text-red-500 text-sm">
                        Currently unavailable
                    </div>
                )}

                {props.availability && (
                    <div className="absolute bottom-3 right-3">
                        {getItemQuantity(props) > 0 ? (
                            <QuantityControl
                                quantity={getItemQuantity(props)}
                                onDecrease={() => handleDecrease(props)}
                                onIncrease={() => handleIncrease(props)}
                            />
                        ) : (
                            <button
                                onClick={() => handleIncrease(props)}
                                className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 font-semibold transition-colors duration-200"
                            >
                                ADD
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItem;