const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const createUser = async (req, res) => {
  try {
    const userData = { ...req.body };
    const user = await User.create(userData);
    const { password, ...userWithoutPassword } = user;

    if (user.rol === "admin") {
      // 🔹 Generar token temporal sin necesidad de contraseña
      const token = jwt.sign(
        { id: user.id, correo: user.correo, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: "15m" } // Token válido por 15 minutos
      );

      res.cookie("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 900000, // 15 minutos
      });

      return res.status(201).json({
        message:
          "✅ Usuario admin creado. Redirigiendo a establecer contraseña.",
        data: userWithoutPassword,
        token, // 🔹 Enviamos el token
        redirectUrl: `/create-password/${user.id}`,
      });
    }

    res.status(201).json({
      message: `✅ Usuario creado con rol: ${user.rol}`,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("❌ Error en createUser:", error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

const createAdminPassword = async (req, res) => {
  try {
    const { userId, password } = req.body; // Recibir el ID del usuario

    if (!userId || !password) {
      return res.status(400).json({ message: "Faltan datos requeridos." });
    }

    const updatedUser = await User.createAdminPassword(userId, password);
    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: "No se pudo actualizar la contraseña." });
    }

    res.status(200).json({
      message: "✅ Contraseña establecida exitosamente",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error en createAdminPassword:", error);
    res.status(500).json({ error: "Error al establecer la contraseña" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error al obtener el usuario" });
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

    // Crear el token con datos del usuario
    const token = jwt.sign(
      { id: user.id, correo: user.correo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar la cookie correctamente (IMPORTANTE)
    res.cookie("userToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });

    // Enviar los datos al frontend también en el `json`
    res.status(200).json({
      message: "✅ Login exitoso",
      token,
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

module.exports = {
  createUser,
  loginUser,
  likeProduct,
  verifyAuth,
  logout,
  createAdminPassword,
  getUserById,
};
