const router = require("express").Router();
const { userController } = require("../controllers");
const authenticate = require("../middlewares/authentication");

router.get("", authenticate, userController.findUsers);
router.get("/:id", authenticate, userController.findUserById);
router.patch("/:id", authenticate, userController.updateUser);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
