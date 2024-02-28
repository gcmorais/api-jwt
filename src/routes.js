const { Router } = require("express");
const UserController = require("./app/controllers/UserController");
const ProductController = require("./app/controllers/ProductController");
const AuthController = require("./app/controllers/AuthController");
const authMiddleware = require("./app/middlewares/auth");

const router = Router();

router.post("/auth", AuthController.authenticate);
router.get("/user", authMiddleware, UserController.index);
router.get("/user/:id", UserController.show);
router.delete("/user/:id", UserController.delete);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);

router.get("/product", ProductController.index);
router.get("/product/:id", ProductController.show);
router.delete("/product/:id", ProductController.delete);
router.post("/product", ProductController.store);
router.put("/product/:id", ProductController.update);

module.exports = router;
