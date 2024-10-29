const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Auths, Users } = require("../models");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Succeed",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await Auths.findOne({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      where: {
        email,
      },
    });

    if (!data) {
      return res.status(404).json({
        status: "Failed",
        message: "User doesn't exist",
        isSuccess: false,
        data: null,
      });
    }

    if (data && bcrypt.compareSync(password, data.password)) {
      const token = jwt.sign(
        {
          id: data.id,
          username: data.user.name,
          email: data.email,
          userId: data.user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRED,
        }
      );
      res.status(200).json({
        status: "Succeed",
        message: "Login successful",
        isSuccess: true,
        data: {
          username: data.user.name,
          token,
        },
      });
    } else {
      res.status(500).json({
        status: "Failed",
        message: "Login failed",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
