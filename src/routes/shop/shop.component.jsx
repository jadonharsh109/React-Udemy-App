import { useContext } from "react";
import { ProductsContext } from "../../contexts/product.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.style.scss"

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard key={product.id} products={product} />
      ))}
    </div>
  );
};
export default Shop;
