import React from 'react';

type ShoeDescriptionProps = {
  description: string;
};

const ShoeDescription: React.FC<ShoeDescriptionProps> = ({ description }) => {
  return (
    <p className="text-gray-600 text-base">
      {description}
    </p>
  );
};

export default ShoeDescription;
