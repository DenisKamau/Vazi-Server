const slugify = require("slugify");
const Product = require("../../models/productModel");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const Category = require("../../models/category");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + "-" + file.originalname);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" || ext !== ".png") {
      return cb(res.status(400).end("Only jpg, png are allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

// ===========================
//   Save Product Data to DB
// ===========================

exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(201).json({ success: true, image: res.req.file.path, fileName: res.req.file.filename });
  });
};

exports.createProduct = (req, res) => {
  const { title, price, description, category, quantity, images } = req.body;

  const model = new Product({
    title,
    slug: slugify(title),
    price,
    description,
    images,
    category,
    quantity,
    createdBy: req.user._id,
  });

  model.save((err) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
};

// ====================================
//   Fetch all Products data from DB
// ====================================

exports.getProducts = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  Product.find()
    .populate("writer")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      res.status(200).json({ success: true, products, postSize: products.length });
    });
};

exports.getProductsBySlug = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);

  const { slug } = req.params;
  Category.findOne({ slug: slug })
    .select("_id")
    .exec((err, category) => {
      if (err) {
        return res.status(400).json({
          success: false,
          error: err,
        });
      }

      if (category) {
        Product.find({ category: category._id })
          .populate("writer")
          .sort([[sortBy, order]])
          .skip(skip)
          .limit(limit)
          .exec((err, products) => {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err,
              });
            }
            if (products.length > 0) {
              res.status(200).json({
                success: true,
                products,
              });
            } else {
              res.status(200).json({
                success: false,
                message: "Can't get Products",
              });
            }
          });
      }
    });
};

// ==========================================
//   Fetch Individual Product data from DB
// ==========================================

exports.fetchProduct = (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
  }

  //we need to find the product information that belong to product Id
  Product.find({ _id: { $in: productIds } })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send(product);
    });
};
