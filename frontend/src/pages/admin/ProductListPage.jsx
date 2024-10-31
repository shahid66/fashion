import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useProductRegisterMutation,
} from "../../feature/product/productSlice";
import Title from "./../../components/Title";

const ProductListPage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: products, isLoading, error } = useGetProductsQuery({});
  const [productRegister, { isLoading: createLoading }] =
    useProductRegisterMutation();
  const submitHandler = async () => {
    try {
      const res = await productRegister().unwrap();
      if (res) {
        toast.success("Product Create Successful");
      }
    } catch (error) {
      toast.error("Wrong");
    }
  };
  const handleDelete = async () => {};
  console.log(products);
  return (
    <div className="flex flex-col  sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[50vh] border-t">
      <div className="flex flex-col basis-1/4 gap-4 w-full ">
        <Title text1={"ADMIN"} text2={"INFO"} />

        <div className="w-full">
          <p className="pt-2">
            <strong>Name :</strong> {userInfo?.name}
          </p>
          <p className="pt-2">
            <strong>Email :</strong> {userInfo?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full ">
        <Title text1={"PRODUCT"} text2={"LIST"} />

        <div className="w-full flex  justify-between">
          <div></div>
          <div>
            <button
              onClick={submitHandler}
              className="bg-black text-white px-16 py-3 text-sm "
            >
              CREATE PRODUCT
            </button>
          </div>
        </div>
        <div>
          {isLoading ? (
            <h6>Loading..</h6> ? (
              error
            ) : (
              <h6>Error</h6>
            )
          ) : products.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 text-center">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    ID
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Name
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Image
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Brand
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Category
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Sub Category
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Best Seller
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Price
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Stock
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Size
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-center text-md divide-y divide-gray-100">
                {products.map((product) => (
                  <tr>
                    <td className="p-3   text-gray-700 ">
                      <Link
                        className="text-blue-300"
                        to={`/product/${product._id}`}
                      >
                        {product._id}
                      </Link>
                    </td>
                    <td className="p-3  text-gray-700">{product.name}</td>
                    <td className="p-3  text-gray-700">
                      <img className="w-20" src={`${product.image[0].name}`} />
                    </td>
                    <td className="p-3  text-gray-700">{product.brand}</td>
                    <td className="p-3  text-gray-700">{product.category}</td>
                    <td className="p-3  text-gray-700">
                      {product.subCategory}
                    </td>
                    <td className="p-3  text-gray-700">
                      {product.bestSeller ? "YES" : "NO"}
                    </td>
                    <td className="p-3  text-gray-700">{product.price}</td>

                    <td className="p-3  text-gray-700">
                      {product.countInStock}
                    </td>
                    <td className="p-3  text-gray-700">
                      {product.sizes.length > 0 &&
                        product.sizes.map((x) => x.sizeName).join("/")}
                    </td>
                    <td className=" p-3  text-gray-700">
                      <div className="flex gap-2">
                        <Link
                          className="hover:text-blue-300"
                          to={`/product/${product._id}/edit`}
                        >
                          <FaEdit></FaEdit>
                        </Link>
                        <FaTrash
                          className="cursor-pointer  hover:text-red-400"
                          onClick={handleDelete}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h6>No product</h6>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
