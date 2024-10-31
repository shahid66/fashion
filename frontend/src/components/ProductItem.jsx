import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ item }) => {
  const { _id, image, name, price } = item;
  console.log(image[0].name);

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${_id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={`http://localhost:5000${image[0].name} `}
          alt=""
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">${price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
