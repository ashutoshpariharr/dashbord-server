const express = require("express");
const { home, register, login } = require("../controllers/auth-controllers");
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const validate = require("../middlewale/validate-maddilewalre");
const {singupSchema, loginSchema} = require("../validores/auth-validator");
const authMiddleware = require("../middlewale/auth-authMiddleWare");

router.route("/").get(authControllers.home);

router.route("/register").post(validate(singupSchema), authControllers.register);

router.route("/login").post(validate(loginSchema), authControllers.login);

router.route("/user").get(authMiddleware ,authControllers.userInfo);

module.exports = router;