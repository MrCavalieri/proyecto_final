import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carrito")) || {};
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const toggleCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const newCarrito = { ...prevCarrito };
      if (newCarrito[producto.id]) {
        delete newCarrito[producto.id];
      } else {
        newCarrito[producto.id] = { ...producto, cantidad: 1 };
      }
      return newCarrito;
    });
  };

  const actualizarCantidad = (productoId, cantidad) => {
    setCarrito((prevCarrito) => {
      const newCarrito = { ...prevCarrito };
      if (!newCarrito[productoId]) return newCarrito;
      if (cantidad < 1) {
        delete newCarrito[productoId];
      } else {
        newCarrito[productoId] = { ...newCarrito[productoId], cantidad };
      }
      return newCarrito;
    });
  };

  const eliminarProducto = (productoId) => {
    setCarrito((prevCarrito) => {
      const newCarrito = { ...prevCarrito };
      delete newCarrito[productoId];
      return newCarrito;
    });
  };

  const calcularTotal = () => {
    return Object.values(carrito)
      .filter((producto) => producto && producto.precio)
      .reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
  };

  const finalizarCompra = () => {
    const historial =
      JSON.parse(localStorage.getItem("historialCompras")) || [];

    historial.push({
      fecha: new Date().toLocaleString(),
      productos: { ...carrito },
      total: calcularTotal(),
    });

    localStorage.setItem("historialCompras", JSON.stringify(historial));
    setCarrito({});
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        toggleCarrito,
        actualizarCantidad,
        eliminarProducto,
        calcularTotal,
        finalizarCompra,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
