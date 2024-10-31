import React from "react";

import { useGetProductsQuery } from "../feature/product/productSlice";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { data: products, isLoading, error } = useGetProductsQuery({});
  console.log(products);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis magni
          possimus distinctio libero omnis veniam ea itaque voluptate corporis
          placeat, tempore commodi quod maxime unde voluptatum alias consequatur
          quisquam deserunt?
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {isLoading ? (
          <h6>Loading...</h6> ? (
            error
          ) : (
            <h6>Error...</h6>
          )
        ) : (
          (products || []).map((item, index) => (
            <ProductItem key={index} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestCollection;
