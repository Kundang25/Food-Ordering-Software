import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantityControl = ({ quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center justify-between bg-white border border-green-500 rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        className="p-2 text-green-500 hover:bg-green-50 transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <span className="px-4 font-semibold text-green-500">
        {quantity}
      </span>
      
      <button
        onClick={onIncrease}
        className="p-2 text-green-500 hover:bg-green-50 transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantityControl;