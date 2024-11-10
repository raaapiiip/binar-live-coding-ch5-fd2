const router = require("express").Router();
const { shopController } = require("../controllers");
const authenticate = require("../middlewares/authentication");

router.post("", authenticate, shopController.createShop);
router.get("", authenticate, shopController.getAllShop);
router.get("/:id", authenticate, shopController.getShopById);
router.patch("/:id", authenticate, shopController.updateShop);
router.delete("/:id", authenticate, shopController.deleteShop);

module.exports = router;
