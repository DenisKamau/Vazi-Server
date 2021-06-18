const User = require("../../models/User");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  const { body } = req;
  const { fullname, username, password, contact } = body;
  let { email } = body;

  email = email.toLowerCase();

  // Verify email does not exist

  User.find(
    {
      email: email,
    },
    async (err, previousUsers) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error: Server error!",
        });
      } else if (previousUsers.length > 0) {
        return res.json({
          exists: true,
          message: "Error: Account already exists!",
        });
      }

      // Save new User
      const newUser = new User();

      const hash_password = await bcrypt.hash(password, 10);

      newUser.email = email;
      newUser.fullname = fullname;
      newUser.username = username;
      newUser.contact = contact;
      newUser.password = hash_password;
      newUser.role = "admin";

      newUser.save((err) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({ success: true, message: "Admin created successfully!" });
      });
    }
  );
};

exports.signin = (req, res) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  email = email.toLowerCase();

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Non-Existant User",
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      } else if (user.validPassword(password) && user.role === "admin") {
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        const { _id, fullname, username, email, role } = user;
        res.cookie("token", token, { expiresIn: "24h" });
        res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user: {
            _id,
            fullname,
            username,
            email,
            role,
          },
        });
      }
    }
  );
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfull",
  });
};
