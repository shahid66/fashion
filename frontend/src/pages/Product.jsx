import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { addToCart } from "../feature/cart/cartSlice";
import { useGetProductQuery } from "../feature/product/productSlice";

const Product = () => {
  const { productId } = useParams();

  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setImage(product.image[0].name);
    }
  }, [product]);

  console.log(product);

  const addToCartHandler = async () => {
    dispatch(
      addToCart({
        productId: product._id,
        qty: Number(1),
        size,
        name: product.name,
        image: product.image[0].name,
        price: Number(product.price),
      })
    );
  };

  return isLoading ? (
    <h6>Loading...</h6>
  ) : product ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((item, index) => (
              <img
                src={`${item.name}`}
                key={index}
                onClick={() => setImage(item.name)}
                className="w-[24%] sm:w-full sm:mb-3 flex-srink-0 cursor-pointer "
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={`${image}`} className="w-full h-auto" alt="" />
          </div>
        </div>

        {/* Product Info */}

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {/* {currency} */}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          <div className="flex flex-col gap-4 my-8">
            {product.sizes && (
              <>
                <p>Select Size</p>
                <div className="flex gap-2">
                  {product.sizes.map((item, index) => (
                    <button
                      onClick={() => setSize(item.sizeName)}
                      key={index}
                      className={`border py-2 px-4 bg-gray-300 ${
                        item.sizeName === size ? "border-orange-500" : ""
                      }`}
                    >
                      {item.sizeName}
                    </button>
                  ))}
                </div>
              </>
            )}

            <p>Status</p>
            <div className="flex gap-2">
              <strong>
                {product.countInStock > 0 ? "In Stoke" : "Out of Stock"}
              </strong>
            </div>

            <button
              onClick={addToCartHandler}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>100% Orginal product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}

      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            veniam perspiciatis eveniet natus deserunt aperiam minus consectetur
            reiciendis dolor pariatur officiis, asperiores eaque perferendis
            autem magni earum illo? Dignissimos, et.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            veniam perspiciatis eveniet natus deserunt aperiam minus consectetur
            reiciendis dolor pariatur officiis, asperiores eaque perferendis
            autem magni earum illo? Dignissimos, et.
          </p>
        </div>
      </div>

      {/* Display latest product */}

      {/* <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      /> */}
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
