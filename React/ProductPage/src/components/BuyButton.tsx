// BuyButton.tsx

import React from 'react';

type BuyButtonProps = {
  price: number;
};

const BuyButton: React.FC<BuyButtonProps> = ({ price }) => {
  return (
    <div className="flex space-x-8 items-center">
      <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all">
        Buy
      </button>
      <span className="text-xl font-bold text-gray-800">€{price.toFixed(2)}</span>
    </div>
  );
};

export default BuyButton;
