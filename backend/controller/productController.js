import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../model/productModel.js";

const registerProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: " Sample name",
    price: 0,
    user: req.user._id,
    image: [
      { name: "/uploads/undefined-1729699887747.png" },
      { name: "/uploads/undefined-1729699887747.png" },
    ],
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    subCategory: "Sample subcategory",
    bestseller: false,
    description: "Sample description",
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});
const getProducts = asyncHandler(async (req, res) => {
  const { categories, subcategories, minPrice, maxPrice, sortOrder } =
    req.query;

  // Build the filter object
  const filter = {};
  if (categories) filter.category = { $in: categories.split(",") };

  if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };

  if (subcategories) filter.subCategory = { $in: subcategories.split(",") };

  let productsQuery = Product.find(filter);

  // Apply sorting
  if (sortOrder === "low-high") {
    productsQuery = productsQuery.sort({ price: 1 });
  } else if (sortOrder === "high-low") {
    productsQuery = productsQuery.sort({ price: -1 });
  }
  const products = await productsQuery;

  if (products) {
    res.status(200).json(products);
  } else {
    throw new Error("no found! something Error");
  }
});
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    throw new Error("no found! something Error");
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    subCategory,
    price,
    countInStock,
    sizes,
    image,
  } = req.body;

  let imagePaths = [];

  try {
    if (image && image.length > 0) {
      
      if (image[0].name) {
        imagePaths = image;
      }
      image.map((x) => imagePaths.push({ name: x }));
    }

    // Find and update the product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product details
    product.name = name || product.name;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    // If there are new images, update the images array
    if (imagePaths.length > 0) {
      product.image = imagePaths || product.image;
    }

    // If sizes are being updated
    if (sizes) {
      product.sizes = sizes.map((size) => ({ sizeName: size }));
    }

  
    // Save the updated product
    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});
const productSize = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
 
  if (product) {
    const size = {
      sizeName: req.body.size,
      user: req.user._id,
    };
    product.sizes.push(size);
    await product.save();
    res.status(200).json({ message: "Size added successfully" });
  } else {
    throw new Error(" something Error");
  }
});

export {
  deleteProduct,
  getProductById,
  getProducts,
  productSize,
  registerProduct,
  updateProduct,
};
