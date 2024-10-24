import ProductsWrapper from './components/ProductsWrapper';
import ShoeDescription from './components/ShoeDescription';
import ShoeType from './components/ShoeType';
import ShoeImage from './components/ShoeImage';
import ShoeSizes from './components/ShoeSizes'; // Import ShoeSizes component
import Image from './assets/images.jpg'; // Import the image
import ShoeColors from './components/ShoeColors';
import BuyButton from './components/BuyButton';

function App() {
  const shoeData = {
    type: 'Nike Air Zoom Pegasus 38',
    description:
      'The Nike Air Zoom Pegasus 38 continues to put a spring in your step, using the same responsive foam as its predecessor. Breathable mesh in the upper combines the comfort and durability you want with a wider fit at the toes.',
    sizes: [40, 41, 42, 43, 44, 45],
    colors: ['black', 'blue', 'yellow', 'pink', 'orange'],
    price: 45.95,
  };

  return (
    <>
      <ProductsWrapper>
        {/* Left column: Shoe image */}
        <ShoeImage src={Image} alt="Nike Air Zoom Pegasus 38" />
        
        {/* Right column: Shoe details */}
        <div className="flex flex-col justify-center">
          <ShoeType type={shoeData.type} />
          <ShoeDescription description={shoeData.description} />
          <ShoeColors colors={shoeData.colors} /> 
          <ShoeSizes sizes={shoeData.sizes} />
          <div className="flex items-center justify-between mt-4">
            <BuyButton price={shoeData.price} /> {/* Buy button with price */}
          </div>
        </div>
      </ProductsWrapper>
    </>
  );
}

export default App;
