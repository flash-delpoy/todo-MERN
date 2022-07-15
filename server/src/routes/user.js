const Router = require("express").Router;
const router = new Router();
const userController = require("../controllers/user-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 32 }),
    userController.registration
);

router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/auth", authMiddleware, userController.check);
router.get("/refresh", userController.refresh);
router.get("/user", authMiddleware, userController.getUser);
router.put("/user", authMiddleware, userController.update);

router.delete("/user/delete/:id", userController.delete);

module.exports = router;