const confirmPurch = async(req, res)=>{
    console.log("Datos recibidos en confirmPurch:", req.body);
    console.log("Parámetros recibidos en confirmPurch:", req.params);
    res.json({ message: "Compra confirmada", data: req.body, params: req.params });
}
const historyPurch = async(req, res)=>{
    console.log("Datos recibidos en historyPurch:", req.body);
    console.log("Parámetros recibidos en historyPurch:", req.params);
    res.json({ message: "Historial de compras", data: req.body, params: req.params });
}
const commentPurch = async(req, res)=>{
    console.log("Datos recibidos en commentPurch:", req.body);
    console.log("Parámetros recibidos en commentPurch:", req.params);
    res.json({ message: "Comentario de compra recibido", data: req.body, params: req.params });
}

module.exports = {confirmPurch, historyPurch, commentPurch}