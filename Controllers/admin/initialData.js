const Category = require("../../models/category");
const Product = require("../../models/productModel");

exports.initialData = async (req, res) => {
  const categories = await Category.find({}).exec();
  const products = await Product.find({})
    .select("_id title slug description price quantity images category")
    .populate({
      path: "category",
      select: "_id name",
    })
    .exec();
  res.status(200).json({
    categories,
    products,
  });
};
