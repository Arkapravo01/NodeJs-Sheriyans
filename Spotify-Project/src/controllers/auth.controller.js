const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { userName, email, password, role = "user" } = req.body;

  const isUserAlreadyExists = userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    email,
    password,
    role,
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully!",
    user: {
      id: user._id,
      userName,
      email,
      role,
    },
  });
}
