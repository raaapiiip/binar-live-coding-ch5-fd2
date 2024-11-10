const router = require("express").Router();
const { productController } = require("../controllers");
const authenticate = require("../middlewares/authentication");

router.post("", authenticate, productController.createProduct);
router.get("", authenticate, productController.getAllProduct);
router.get("/:id", authenticate, productController.getProductById);
router.patch("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

module.exports = router;
