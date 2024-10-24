import React from 'react';

type ShoeColorsProps = {
  colors: string[];
};

const ShoeColors: React.FC<ShoeColorsProps> = ({ colors }) => {
  return (
    <div>
      <h4 className="font-bold text-lg mt-4 mb-2">Available Colors</h4>
      <div className="flex space-x-2">
        {colors.map((color) => (
          <span
            key={color}
            className={`w-6 h-6 rounded-full cursor-pointer bg-${color}`}
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ShoeColors;
