import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import {
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../feature/product/productSlice";

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [stoke, setStoke] = useState(0);

  const { data: product, isLoading, error } = useGetProductQuery(productId);
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation(); // Define mutation hook here

  useEffect(() => {
    if (!isLoading && !error && product) {
      setName(product.name || "");
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setSubCategory(product.subCategory || "");
      setPrice(product.price || 0);
      setImage(product.image || []);
      setStoke(product.countInStock || 0);
    }
  }, [isLoading, error, product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updateProductData = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      subCategory,
      countInStock: stoke,
    };

    try {
      await updateProduct(updateProductData).unwrap();
      toast.success("Product Updated");
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.message || "Error updating product");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append("image", file);
    });

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.message || error?.data?.message || "Error uploading images"
      );
    }
  };

  return (
    <div className="flex flex-col  justify-between  pt-5 sm:pt-14  border-t">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"EDIT"} text2={"PRODUCT"} />
      </div>
      <div className=" flex justify-center">
        {isLoading ? (
          <h6>Loading...</h6> ? (
            error
          ) : (
            <h6>Error</h6>
          )
        ) : (
          <form
            onSubmit={submitHandler}
            action=""
            className="w-auto flex flex-col gap-4 justify-center "
          >
            <div className="flex flex-col gap-3">
              <div className="flex  gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    Product Name
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    Brand Name
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="uppercase ">
                  Image
                </label>

                <div className="w-full flex flex-col gap-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {product.image.length > 0 &&
                      product.image.map((x, index) => (
                        <img
                          key={index}
                          className="w-32"
                          src={`${x.name}`}
                          alt=""
                        />
                      ))}
                  </div>
                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={uploadFileHandler}
                  />
                </div>
              </div>
              <div className="flex  gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    Category Name
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    sub category Name
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                  />
                </div>
              </div>
              {/* <div className="flex  gap-3">
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="uppercase ">
                  best seller
                </label>

                <input
                  className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="" className="uppercase ">
                  price
                </label>

                <input
                  className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div> */}
              <div className="flex  gap-3">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    stock
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={stoke}
                    onChange={(e) => setStoke(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="" className="uppercase ">
                    Price
                  </label>

                  <input
                    className="border  border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm "
            >
              UPDATE PRODUCT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;
