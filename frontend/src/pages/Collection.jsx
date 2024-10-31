import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useGetProductsQuery } from "../feature/product/productSlice";
import ProductItem from "./../components/ProductItem";

const Collection = () => {
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    minPrice: 10,
    maxPrice: 5000,
    sortOrder: "relevant",
  });
  // Build filter params to avoid sending empty filters
  const filterParams = {
    ...(filters.categories.length && { categories: filters.categories }),
    ...(filters.subcategories.length && {
      subcategories: filters.subcategories,
    }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
    ...(filters.sortOrder && { sortOrder: filters.sortOrder }),
  };

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(filterParams);



  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (checked) {
        updatedFilters[type] = [...updatedFilters[type], value];
      } else {
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== value
        );
      }
      
      return updatedFilters;
    });
  };

  // Price filter handler
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Sort order handler
  const handleSortChange = (e) => {
    setFilters({ ...filters, sortOrder: e.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}

      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden `} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6  sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Men"}
                onChange={(e) => handleCheckboxChange(e, "categories")}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Women"}
                onChange={(e) => handleCheckboxChange(e, "categories")}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Kids"}
                onChange={(e) => handleCheckboxChange(e, "categories")}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}

        <div className={`border border-gray-300 pl-5 py-3 my-5  sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Topwear"}
                onChange={(e) => handleCheckboxChange(e, "subcategories")}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Bottomwear"}
                onChange={(e) => handleCheckboxChange(e, "subcategories")}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                name=""
                id=""
                value={"Winterwear"}
                onChange={(e) => handleCheckboxChange(e, "subcategories")}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}

          <select
            onChange={handleSortChange}
            className="border border-gray-300 text-sm px-2"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {isLoading ? (
          error ? (
            <h6>Error..</h6>
          ) : (
            <h6>Loading.....</h6>
          )
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {products.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
