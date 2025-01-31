import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/ProductCarousel.css';

function ProductCarousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Aquí irá la llamada a la API para obtener los productos destacados
    // Por ahora usaremos datos de ejemplo
    setProducts([
      { id: 1, name: 'Producto 1', image: 'https://via.placeholder.com/300', likes: 150 },
      { id: 2, name: 'Producto 2', image: 'https://via.placeholder.com/300', likes: 120 },
      { id: 3, name: 'Producto 3', image: 'https://via.placeholder.com/300', likes: 100 },
    ]);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {products.map(product => (
          <div key={product.id} className="carousel-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.likes} likes</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductCarousel