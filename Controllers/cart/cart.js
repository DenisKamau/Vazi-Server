const Cart = require("../../models/cart");

exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((err, cart) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    if (cart) {
      // If cart already exists then update cart by quantity / add new product to cart

      const product = req.body.cartItems.product;

      const item = cart.cartItems.find((c) => c.product == product);

      if (item) {
        const filter = { user: req.user._id, "cartItems.product": product };
        const update = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        };

        Cart.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
          },
          (err, _cart) => {
            if (err) {
              return res.send({
                success: false,
                message: err,
              });
            }

            if (_cart) {
              return res.status(201).json({ cart: _cart });
            }
          }
        );
      } else {
        const filter = { user: req.user._id };
        const update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };

        Cart.findOneAndUpdate(
          filter,
          update,
          {
            new: true,
          },
          (err, _cart) => {
            if (err) {
              return res.send({
                success: false,
                message: err,
              });
            }

            if (_cart) {
              return res.status(201).json({ cart: _cart });
            }
          }
        );
      }
    } else {
      // Create new cart if cart does not exist
      const model = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      model.save((err, cart) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res.status(201).json({ success: true, cart });
      });
    }
  });
};
