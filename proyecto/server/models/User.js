const bcrypt = require("bcrypt");
const dbQuery = require("../utils/dbQuery");
require("dotenv").config();

class User {
  // 🔍 Buscar usuario por correo
  static async findByEmail(email) {
    const query =
      "SELECT id, correo, rol, nombre, password FROM users WHERE correo = $1";
    const rows = await dbQuery(query, [email]);
    return rows[0]; // Retorna el usuario si existe
  }

  // 🆕 Crear usuario (cliente o admin)
  static async create(userData) {
    try {
      const { nombre, correo, password, direccion, ciudad, telefono } =
        userData;
      const hashedPassword = await bcrypt.hash(password, 10);

      // Si la contraseña es la secreta del .env, el usuario será admin
      const finalRol =
        password === process.env.ADMIN_SECRET_PASSWORD ? "admin" : "cliente";

      const query = `
        INSERT INTO users (nombre, correo, password, direccion, ciudad, telefono, rol)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, nombre, correo, rol;
      `;

      const values = [
        nombre,
        correo,
        hashedPassword,
        direccion,
        ciudad,
        telefono,
        finalRol,
      ];
      const rows = await dbQuery(query, values);
      return rows[0];
    } catch (error) {
      console.error("❌ Error en User.create:", error);
      throw new Error("Error al crear usuario");
    }
  }

  // 🔍 Buscar usuario por ID
  static async findById(id) {
    const query = "SELECT id, correo, rol, nombre FROM users WHERE id = $1";
    const rows = await dbQuery(query, [id]);
    return rows[0]; // Retorna el usuario si existe
  }

  // 🔒 Validar contraseña
  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // 🆕 Actualizar contraseña para admins
  static async createAdminPassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const query = `
        UPDATE users 
        SET password = $1
        WHERE id = $2 AND rol = 'admin'
        RETURNING id, correo, rol, nombre;
      `;

      const rows = await dbQuery(query, [hashedPassword, userId]);
      return rows[0];
    } catch (error) {
      console.error("❌ Error en User.createAdminPassword:", error);
      throw new Error("Error al establecer contraseña de administrador");
    }
  }

  // 🆕 Actualizar contraseña para cualquier usuario (sin reset_token)
  static async updatePasswordById(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const query = `
        UPDATE users 
        SET password = $1
        WHERE id = $2
        RETURNING id, correo, rol;
      `;

      const rows = await dbQuery(query, [hashedPassword, userId]);
      return rows[0];
    } catch (error) {
      console.error("❌ Error en User.updatePasswordById:", error);
      throw new Error("Error al actualizar la contraseña");
    }
  }

  // 💖 Agregar producto a lista de deseos
  static async addToWishlist(userId, productId) {
    const query = `
      INSERT INTO lista_deseos (users_id, product_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const rows = await dbQuery(query, [userId, productId]);
    return rows[0];
  }

  // 📄 Obtener lista de deseos de un usuario
  static async getLikedProducts(userId) {
    const query = `
      SELECT p.* FROM products p
      INNER JOIN lista_deseos l ON p.id = l.product_id
      WHERE l.users_id = $1;
    `;
    return await dbQuery(query, [userId]);
  }
}

module.exports = User;
