const { Product, ProductImage, Category } = require("../models");
const { handleValidationErrors, paginateResults } = require("../utils/lib");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const createProduct = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const { name, description, price, stock, files } = req.body;
    const product = await Product.create({ name, description, price, stock });
    if (req.files) {
      for (const file of req.files) {
        await ProductImage.create({
          productId: product.id,
          imageUrl: file?.path,
        });
      }
    }
    return res.status(201).json({
      message: "Product created successfully.",
      data: product,
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to create product" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    // Extract filters from query parameters
    const { name, minPrice, maxPrice, category, inStock, sortBy } = req.query;
    // Build dynamic where clause for filtering
    const whereClause = { is_active: true };

    //name filter
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }

    // Price range filter
    if (minPrice && maxPrice) {
      whereClause.price = {
        [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)],
      };
    } else if (minPrice) {
      whereClause.price = {
        [Op.gte]: parseFloat(minPrice),
      };
    } else if (maxPrice) {
      whereClause.price = {
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    // Availability filter (in stock or out of stock)
    if (inStock !== undefined) {
      whereClause.stock = inStock === "true" ? { [Op.gt]: 0 } : 0;
    }
    let includeOptions = [
      {
        model: ProductImage,
        as: "images",
        attributes: ["imageUrl"],
      },
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ];
    if (category) {
      includeOptions.push({
        model: Category, // Assuming there's a Category model
        as: "category",
        where: { name: category },
        attributes: ["id", "name"],
      });
    }

    // Sorting logic
    let order = []; // Default no sorting
    if (sortBy) {
      switch (sortBy.toLowerCase()) {
        case "price_asc":
          order.push(["price", "ASC"]);
          break;
        case "price_desc":
          order.push(["price", "DESC"]);
          break;
        case "rating":
          order.push(["rating", "DESC"]); // Assuming a `rating` column exists in the Product model
          break;
        default:
          break; // No sorting if sortBy is invalid
      }
    }

    // Fetch products with applied filters & sorting
    const products = await Product.findAll({
      where: whereClause,
      attributes: ["id", "name", "description", "price", "stock"],
      include: includeOptions,
      order,
    });

    const { results: paginatedProducts, pagination } = paginateResults(
      products,
      req.params.page,
      req.params.limit
    );

    return res.status(200).json({
      message: "Data fetched successfully.",
      data: {
        products: paginatedProducts,
        pagination,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to fetch products" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["id", "imageUrl"],
        },
      ],
    });
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch product",
      error: error?.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const validationError = handleValidationErrors(req, res);
    if (validationError) return validationError;

    const {
      name,
      description,
      price,
      stock,
      id,
      deletedId = [],
      category_id,
    } = req.body;
    const newImages = req.files || [];
    const deletedIdArray =
      deletedId.length > 0 ? deletedId.split(",").map(Number) : [];

    // Find the product by ID
    const product = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: "images" }],
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    if (deletedIdArray.length > 0) {
      const imagesToDelete = await ProductImage.findAll({
        where: {
          id: {
            [Op.in]: deletedIdArray,
          },
        },
      });

      imagesToDelete.forEach((image) => {
        const filePath = path.join(__dirname, "../", image.imageUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      await ProductImage.destroy({
        where: {
          id: {
            [Op.in]: deletedIdArray,
          },
        },
      });
    }

    // Update product details
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.category_id = category_id || product.categoryId;
    await product.save();

    // Add new files to ProductImage
    if (newImages.length > 0) {
      const imageRecords = newImages.map((file) => ({
        productId: product.id,
        imageUrl: file.path, // Assuming Multer saves file with `filename`
      }));
      await ProductImage.bulkCreate(imageRecords);
    }

    // Fetch the updated product with its images
    const updatedProduct = await Product.findByPk(id, {
      include: [
        { model: ProductImage, as: "images", attributes: ["id", "imageUrl"] },
      ],
    });

    return res.status(200).json({
      status: "success",
      message: "Product updated successfully.",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req?.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    product.is_active = false;
    await product.save();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
