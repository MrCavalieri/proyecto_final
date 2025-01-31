const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    // El rol se determinará en el modelo basado en la contraseña
    const userData = {
      ...req.body,
      rol: "cliente", // rol por defecto, pero será sobrescrito si es necesario
    };

    const user = await User.create(userData);

    // Eliminamos la contraseña de la respuesta por seguridad
    const { password, ...userWithoutPassword } = user;

    res.status(201).json({
      message: `✅ Usuario creado con rol: ${user.rol}`,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("❌ Error en createUser:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const user = await User.findByEmail(correo);
    if (!user) {
      return res.status(401).json({ message: "❌ Credenciales incorrectas" });
    }

    const isMatch = await User.validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user.id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({
      message: "✅ Login exitoso",
      user: {
        id: user.id,
        correo: user.correo,
        rol: user.rol,
        nombre: user.nombre,
      },
      authenticated: true,
    });
  } catch (error) {
    console.error("❌ Error en loginUser:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

const likeProduct = async (req, res) => {
  try {
    const { users_id, product_id } = req.body;
    const likedProduct = await User.addToWishlist(users_id, product_id);
    res.status(201).json({
      message: "❤️ Producto añadido a favoritos",
      data: likedProduct,
    });
  } catch (error) {
    console.error("❌ Error en likeProduct:", error);
    res.status(500).json({ error: "Error al dar like al producto" });
  }
};

const verifyAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(401).json({
        authenticated: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error("Error en verifyAuth:", error);
    res.status(401).json({
      authenticated: false,
      message: "Token inválido o expirado",
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};

module.exports = { createUser, loginUser, likeProduct, verifyAuth, logout };
