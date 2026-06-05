import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, ShoppingCart } from 'lucide-react';
import QuantityControl from "@/components/ui/quantity-control";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '@/redux/cartSlice';
import api from '@/services/axiosInstance';
import { useAuth } from '@/contexts/authContext';
const Combos = () => {
  const {currentUser}=useAuth()
  const [combos, setCombos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  
  const dispatch = useDispatch();
  const cartState = useSelector(state => state.cart);

  React.useEffect(() => {
    const fetchCombos = async () => {
      try {
        const response = await api.get("getCombos",{headers:{
          Authorization:`Bearer ${currentUser.token}`
        }});
        console.log("Fetching response data in the frontend is ",response)
        console.log("FetchCombos response in frontend is ", response.data.result);
        setCombos(response.data.result);
      } catch (err) {
        console.error('Error fetching combos:', err);
        setError('Failed to fetch combos');
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, []);

  const getComboQuantity = (combo) => {
    const cartItem = cartState.items.find(
      (cartItem) => cartItem.id === combo.combo_id && cartItem.category === 'combo'
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const handleDecrease = (combo) => {
    const currentQty = getComboQuantity(combo);
    if (currentQty === 1) {
      dispatch(removeFromCart({ id: combo.combo_id, category: 'combo' }));
    } else if (currentQty > 0) {
      dispatch(updateQuantity({
        id: combo.combo_id,
        category: 'combo',
        quantity: currentQty - 1
      }));
    }
  };

  const handleIncrease = (combo) => {
    const currentQty = getComboQuantity(combo);
    if (currentQty === 0) {
      dispatch(addToCart({
        id: combo.combo_id,
        category: 'combo',
        name: combo.combo_name,
        selling_price: combo.discounted_price,
        image_url: combo.item1_image 
      }));
    } else {
      dispatch(updateQuantity({
        id: combo.combo_id,
        category: 'combo',
        quantity: currentQty + 1
      }));
    }
  };

  const handleAddToCart = (combo) => {
    dispatch(addToCart({
      id: combo.combo_id,
      category: 'combo',
      name: combo.combo_name,
      selling_price: combo.discounted_price,
      image_url: combo.item1_image
    }));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-gray-500">Loading combos...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-48">
      <p className="text-red-500">{error}</p>
    </div>
  );

  if (!Array.isArray(combos)) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500">Invalid data format received</p>
      </div>
    );
  }

  if (combos.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">No combos available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20">
      <div className="flex items-center justify-between col-span-full">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Featured Combos</h2>
        <div className="flex-1 ml-4">
          <div className="h-0.5 bg-gradient-to-r from-slate-400 to-transparent" />
        </div>
      </div>
      {combos.map((combo) => (
        <Card key={combo.combo_id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold">{combo.combo_name}</CardTitle>
              <Badge variant={combo.availability ? "success" : "destructive"}>
                {combo.availability ? "Available" : "Unavailable"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                  <img
                    src={combo.item1_image || "/api/placeholder/96/96"}
                    alt={combo.item1_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{combo.item1_name}</h3>
                  <p className="text-sm text-gray-500">{combo.item1_type}</p>
                  <p className="text-sm font-medium">₹{combo.item1_price}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                  <img
                    src={combo.item2_image || "/api/placeholder/96/96"}
                    alt={combo.item2_name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{combo.item2_name}</h3>
                  <p className="text-sm text-gray-500">{combo.item2_type}</p>
                  <p className="text-sm font-medium">₹{combo.item2_price}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Total Price:</span>
                  </div>
                  <span className="text-lg font-bold line-through">₹{combo.total_price}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">Offer Price:</span>
                  </div>
                  <span className="text-lg font-bold text-green-500">₹{combo.discounted_price}</span>
                </div>
              </div>

              {/* Add to Cart Button/Quantity Control */}
              {combo.availability && (
                <div className="flex justify-end mt-4">
                  {getComboQuantity(combo) > 0 ? (
                    <QuantityControl
                      quantity={getComboQuantity(combo)}
                      onDecrease={() => handleDecrease(combo)}
                      onIncrease={() => handleIncrease(combo)}
                    />
                  ) : (
                    <button
                      onClick={() => handleAddToCart(combo)}
                      className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 font-semibold flex items-center"
                    >
                      {/* <ShoppingCart className="w-4 h-4 mr-2" /> */}
                      ADD
                    </button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Combos;