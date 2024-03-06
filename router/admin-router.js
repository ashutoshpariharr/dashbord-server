// userRoutes.js

const express = require("express");
const adminController = require("../controllers/admin-controller");
const router = express.Router();
const authMiddleWare = require("../middlewale/auth-authMiddleWare");
const adminMiddleware = require("../middlewale/admin-middleware");

router
  .route("/users")
  .get(authMiddleWare, adminMiddleware, adminController.getAllUsers);

router
  .route("/users/update/:id")
  .patch(authMiddleWare, adminMiddleware, adminController.updateUserById);

router
  .route("/users/delete/edit/:id")
  .get(authMiddleWare, adminMiddleware, adminController.getUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleWare, adminMiddleware, adminController.DeleteUser);

router
  .route("/contacts")
  .get(authMiddleWare, adminMiddleware, adminController.getAllContacts);

router
  .route("/contacts/delete/:id")
  .delete(authMiddleWare, adminMiddleware, adminController.deleteContact);

module.exports = router;
