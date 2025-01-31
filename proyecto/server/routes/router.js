const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  likeProduct,
  verifyAuth,
  logout,
} = require("../controllers/userController");
const purchController = require("../controllers/purchController");
const cartController = require("../controllers/cartController");
const productController = require("../controllers/productController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Rutas de Autenticación
router.post("/usuarios", createUser);
router.post("/login", loginUser);
router.post("/logout", logout); //Ruta para Logout
router.get("/auth/verify", verifyToken, verifyAuth); //Ruta para verificar autenticación

// Rutas de Usuario autenticado
router.post("/favoritos", likeProduct);
router.get("/perfil", verifyAuth);

// Rutas de Carrito
router.get("/carrito", cartController.getCart);
router.post("/carrito", cartController.postCart);
router.delete("/carrito/:id", cartController.deleteItemCart);
router.put("/carrito/:id", cartController.updateCart);

// Rutas de Compras
router.put("/confirmar-compra", purchController.confirmPurch);
router.post("/historial-compras", purchController.historyPurch);
router.patch("/comentarios", purchController.commentPurch);

// Rutas de productos (algunas pueden requerir autenticación)
router.get("/productos", productController.getProduct); // Pública
router.post("/productos", productController.createProduct);
router.get("/productos/:id", productController.getProductId); // Pública
router.post("/productos/like", likeProduct);

module.exports = router;
