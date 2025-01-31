const getCart = async(req, res)=>{
    console.log("Datos recibidos en getCart:", req.body);
    console.log("Parámetros recibidos en getCart:", req.params);
    res.json({ message: "Carrito obtenido", data: req.body, params: req.params });
}
const postCart = async(req, res)=>{
    console.log("Datos recibidos en postCart:", req.body);
    console.log("Parámetros recibidos en postCart:", req.params);
    res.json({ message: "Producto agregado al carrito", data: req.body, params: req.params });
}
const deleteItemCart = async(req, res)=>{
    console.log("Datos recibidos en deleteItemCart:", req.body);
    console.log("Parámetros recibidos en deleteItemCart:", req.params);
    res.json({ message: "Producto eliminado del carrito", data: req.body, params: req.params });
}
const updateCart = async(req, res)=>{
    console.log("Datos recibidos en updateCart:", req.body);
    console.log("Parámetros recibidos en updateCart:", req.params);
    res.json({ message: "Carrito actualizado", data: req.body, params: req.params });
}

module.exports = {getCart, postCart, deleteItemCart, updateCart}