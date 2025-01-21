const { Product, ProductImage } = require("../models");
const { handleValidationErrors } = require("../utils/lib");
const path = require('path');
const fs = require('fs');

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
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock"],
      include: [
        { model: ProductImage, as: "images", attributes: ["imageUrl"] },
      ],
    });
    return res
      .status(200)
      .json({ message: "Data fetch Successfully.", data: products });
  } catch (error) {
    // console.log(error);
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

    const { name, description, price, stock, id, deletedId = [] } = req.body;
    const newImages = req.files || [];

    // Find the product by ID
    const product = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: "images" }],
    });

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
console.log(deletedId)
    // Delete ProductImage records and corresponding files
    if (deletedId.length > 0) {
      const imagesToDelete = await ProductImage.findAll({
        where: { id: deletedId },
      });

      // Remove files from the upload folder
      imagesToDelete.forEach((image) => {
        console.log('----------------------------------------------------')
        console.log( image.imageUrl)
        const filePath = path.join(__dirname, image.imageUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });

      // Delete ProductImage records from the database
      // await ProductImage.destroy({ where: { id: deletedId } });
    }

    // Update product details
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    await product.save();

    // Add new files to ProductImage
    if (newImages.length > 0) {
      const imageRecords = newImages.map((file) => ({
        productId: product.id,
        imageUrl: file.filename, // Assuming Multer saves file with `filename`
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
    const { id } = req?.body;
    const role = await Product.findByPk(id);
    if (!role) {
      return res
        .status(404)
        .json({ status: "error", message: "Role not found" });
    }
    await role.destroy();
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete role" });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
