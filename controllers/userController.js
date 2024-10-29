const { Op } = require("sequelize");
const { Users, Shops } = require("../models");

const findUsers = async (req, res, next) => {
  try {
    //Dynamic filter
    const { shopName, userName, role, size, page } = req.query;

    const shopCondition = {};
    if (shopName) shopCondition.name = { [Op.iLike]: `%${shopName}%` };

    const userCondition = {};
    if (userName) userCondition.name = { [Op.iLike]: `%${userName}%` };
    if (role) userCondition.role = role;

    const pageSize = parseInt(size) || 10;
    const pageNum = parseInt(page) || 1;
    const offset = (pageNum - 1) * pageSize;

    const users = await Users.findAll({
      include: [
        {
          model: Shops,
          as: "shops",
          attributes: ["name"],
          where: shopCondition,
        },
      ],
      where: userCondition,
      limit: pageSize,
      offset,
    });

    const totalData = await Users.count({
      include: [
        {
          model: Shops,
          as: "shops",
          where: shopCondition,
        },
      ],
      where: userCondition,
    });

    res.status(200).json({
      status: "Succeed",
      message: "Success get users data",
      data: {
        totalData,
        currentPage: pageNum,
        pageSize,
        users,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Succeed",
      message: "Success get user data",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Succeed",
      message: "Success update user",
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      res.status(404).json({
        status: "Failed",
        message: "Data not found",
        isSuccess: false,
        data: null,
      });
    }

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Succeed",
      message: "Success delete user",
    });
  } catch (error) {
    console.log(error.name);
    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
