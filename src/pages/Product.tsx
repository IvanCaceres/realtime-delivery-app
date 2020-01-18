import React from "react";
import { useParams } from "react-router-dom";

// import product seed data
import products from "../seed/products";

const Product: React.FC = () => {
  let { productId }: { productId?: string | undefined } = useParams();
  console.log("show products", products, productId);
  let product = productId !== undefined ? products[productId] : null;
  return (
    <div>
      <p>{product && product.title}</p>
      <p>{product && product.price}</p>
    </div>
  );
};

export default Product;
