import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  const { _id, image, name, price } = item;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={`https://fashion-b70x.onrender.com${image[0].name} `}
          alt=""
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">${price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
