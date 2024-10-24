const router = require("express").Router();

const { userController } = require("../controllers");

router.get("", userController.findUsers);
// router.post("", shopController.createShop);
// router.get("", shopController.getAllShop);
// router.get("/:id", shopController.getShopById);
// router.patch("/:id", shopController.updateShop);
// router.delete("/:id", shopController.deleteShop);

module.exports = router;
