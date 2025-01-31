const getProduct = async (req, res) => {
  console.log("Pidiendo los productos");
  res.json({ message: "Productos obtenidos" });
};
const createProduct = async (req, res) => {
  console.log("Datos recibidos en createProduct:", req.body);
  console.log("Parámetros recibidos en createProduct:", req.params);
  res.json({ message: "Producto creado", data: req.body, params: req.params });
};
const getProductId = async (req, res) => {
  console.log("Datos recibidos en getProductId:", req.body);
  console.log("Parámetros recibidos en getProductId:", req.params);
  res.json({
    message: "Producto obtenido por ID",
    data: req.body,
    params: req.params,
  });
};

module.exports = { getProduct, createProduct, getProductId };
