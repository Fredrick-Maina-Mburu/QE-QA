import React from 'react';

type ProductsWrapperProps = {
  children: React.ReactNode;
};

const ProductsWrapper: React.FC<ProductsWrapperProps> = ({ children }) => {
  return (
    <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      {children}
    </div>
  );
};

export default ProductsWrapper;
