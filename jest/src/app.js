const express = require("express");

const app = express();
const validationRules = require("./middlewares/validation.middleware");

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Hello, World!",
//   });
// });
app.use(express.json());

app.post(
  "/register",
  validationRules.registerUserValidationRules,
  (req, res) => {
    const { userName, email, password } = req.body;

    res.status(200).json({
      message: "User registered successfully",
      user: {
        userName,
        email,
      },
    });
  },
);

module.exports = app;
