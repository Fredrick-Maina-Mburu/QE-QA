import React from 'react';

type ShoeTypeProps = {
  type: string;
};

const ShoeType: React.FC<ShoeTypeProps> = ({ type }) => {
  return (
    <div className="text-2xl font-bold text-gray-800 mb-4">
      {type}
    </div>
  );
};

export default ShoeType;
