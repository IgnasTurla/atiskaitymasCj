import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";
import { DotLoader } from "react-spinners";
import "../styles/ProductDetailsPage.scss";


interface SKU {
  skuId: string;
  color: string;
  size: string;
  image?: string;
  price: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  skus: SKU[];
}

export default function ProductDetailsPage() {
  const { id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();


  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/products/${id}`);
      const data = res.data;
      setProduct(data);


      const firstImage = data.skus.find((s: any) => s.image)?.image || data.image;
      setMainImage(firstImage);
    };

    fetchProduct();
  }, [id]);


  const uniqueColors = Array.from(
    new Set(product?.skus.map((s) => s.color))
  );


  const availableSizes = product?.skus
    .filter((s) => s.color === selectedColor)
    .map((s) => s.size) || [];

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(""); 

    const image = product?.skus.find((s) => s.color === color && s.image)?.image;
    setMainImage(image || product?.image || "");
  };

  const handleAddToCart = () => {
    const selectedSku = product?.skus.find(
      (s) => s.color === selectedColor && s.size === selectedSize
    );

    if (!selectedColor || !selectedSize || !selectedSku) {
      alert("Pasirink spalvą ir dydį");
      return;
    }

    addToCart({
      productId: product!.id,
      skuId: selectedSku.skuId,
      name: product!.name,
      image: mainImage,
      color: selectedColor,
      size: selectedSize,
      price: selectedSku.price,
      quantity,
    });

    alert("Įdėta į krepšelį!");
  };

  if (!product) {
    return (
      <div className="loader-wrapper">
        <DotLoader color="#FF69B4" size={80} />
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="left">
        <img src={mainImage} alt="Main" className="main-image" />
      </div>

      <div className="right">
        <h2>{product.name}</h2>
        <p className="price">
          {product.skus.length > 0
            ? `€${product.skus[0].price}`
            : "Kaina nepasiekiama"}
        </p>

        <div className="color-section">
          <label>Spalva:</label>
          <div className="color-list">
            {uniqueColors.map((color) => {
              const preview = product.skus.find(
                (s) => s.color === color && s.image
              )?.image;

              return (
                <div
                  key={color}
                  className={`color-item ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <img src={preview || product.image} alt={color} />
                </div>
              );
            })}
          </div>
        </div>

        {selectedColor && (
          <div className="size-section">
            <label>Dydis:</label>
            <div className="size-list">
              {availableSizes.map((size) => (
                <div
                  key={size}
                  className={`size-item ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="qty-section">
          <label>Kiekis:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!selectedColor || !selectedSize}
        >
          Į krepšelį
        </button>
      </div>
    </div>
  );
}
