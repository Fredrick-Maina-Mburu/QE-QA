import React from 'react';

type ShoeSizesProps = {
  sizes: number[];
};

const ShoeSizes: React.FC<ShoeSizesProps> = ({ sizes }) => {
  return (
    <>
    <h2 className="text-2xl font-light text-gray-800" >Size</h2>
    <div className="flex space-x-2 mt-2">
      {sizes.map((size) => (
        <span
          key={size}
          className="border border-gray-400 space-y-12 px-3 py-1 rounded-lg cursor-pointer hover:bg-gray-200"
        >
          {size}
        </span>
      ))}
    </div>
    </>
  );
};

export default ShoeSizes;
