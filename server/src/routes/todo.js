const Router = require("express").Router;
const router = new Router();
const TodoController = require("../controllers/todo-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/todos", /*authMiddleware,*/ TodoController.getTodo);
router.post(
    "/todos",
    body("title").isLength({ min: 3, max: 9999 }),
    /* authMiddleware,*/
    TodoController.create
);
router.patch("/todos/:id", /*authMiddleware, */ TodoController.update);
router.delete("/todos/:id", /* authMiddleware,*/ TodoController.delete);

module.exports = router;