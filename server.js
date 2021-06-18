const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const cors = require("cors");

// ==============
//    Routes
// ==============

const ProductRoute = require("./routes/product/product");
const UserRouteUrls = require("./routes/user/UserRoutes");
const AdminRouteUrls = require("./routes/admin/UserRoutes");
const CategotyUrls = require("./routes/Category/category");
const CartUrls = require("./routes/cart/cart");
const InitialDataRoutes = require("./routes/admin/initialData");

// ================
//    APP Setup
// ================

const app = express();

// app.use((req, res, next) => {
//   console.log(`${new Date().toString()} => ${req.originalUrl}`);
//   next();
// });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ================
//    DB Setup
// ================

let connection__url =
  "mongodb://denisk:admin@cluster0-shard-00-00.loint.mongodb.net:27017,cluster0-shard-00-01.loint.mongodb.net:27017,cluster0-shard-00-02.loint.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-c9afok-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || connection__url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", () => {
  console.info("MongoDB connected");
});

//==================
//     ROUTES
//==================

app.use(ProductRoute);
app.use(CartUrls);
app.use("/account", UserRouteUrls, AdminRouteUrls);
app.use(CategotyUrls);
app.use(InitialDataRoutes);
app.get("/", (req, res) => {
  res.status(200).send("Server is Working");
});

// ================
//     PORT
// ================

env.config();

const PORT = process.env.PORT;

app.listen(PORT, console.info(`Server is running on PORT ${PORT}`));
