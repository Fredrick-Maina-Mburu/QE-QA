import React from 'react';

type ShoeImageProps = {
  src: string;
  alt: string;
};

const ShoeImage: React.FC<ShoeImageProps> = ({ src, alt }) => {
  return (
    <div className="w-full flex justify-center mb-6">
      <img src={src} alt={alt} className="w-2/3 h-auto object-contain" />
    </div>
  );
};

export default ShoeImage;
