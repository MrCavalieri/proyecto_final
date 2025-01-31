const bcrypt = require("bcrypt");
const dbQuery = require("../utils/dbQuery");
require("dotenv").config();

class User {
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE correo = $1";
    const rows = await dbQuery(query, [email]);
    return rows[0];
  }
  //creé una contraseña secreta, si se escribe en contraseña al momento de registrarse, el rol pasa a ser admin
  static async create(userData) {
    const { nombre, correo, password, direccion, ciudad, telefono, rol } =
      userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar si la contraseña coincide con la contraseña secreta de admin en .env
    const finalRol =
      password === process.env.ADMIN_SECRET_PASSWORD ? "admin" : "cliente";

    const query = `
      INSERT INTO users (nombre, correo, password, direccion, ciudad, telefono, rol)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [
      nombre,
      correo,
      hashedPassword,
      direccion,
      ciudad,
      telefono,
      finalRol, // Usamos el rol determinado
    ];

    const rows = await dbQuery(query, values);
    return rows[0];
  }

  static async findById(id) {
    const query = "SELECT id, correo, rol, nombre FROM users WHERE id = $1";
    const rows = await dbQuery(query, [id]);
    return rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async getLikedProducts(userId) {
    const query = `
      SELECT p.* FROM products p
      INNER JOIN lista_deseos l ON p.id = l.product_id
      WHERE l.users_id = $1
    `;
    return await dbQuery(query, [userId]);
  }

  static async addToWishlist(userId, productId) {
    const query =
      "INSERT INTO lista_deseos (users_id, product_id) VALUES ($1, $2) RETURNING *";
    const rows = await dbQuery(query, [userId, productId]);
    return rows[0];
  }
}

module.exports = User;
