import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";
import { IKImage, IKContext } from "imagekitio-react";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await getProduct(id);
    setProduct(data);
  };

  if (!product) return <p>Loading...</p>;

  // Extract path from full ImageKit URL
  const imagePath = product.image.replace(
    import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT, ""
  );

  return (
    <IKContext urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}>
      <div>
        <IKImage
          path={imagePath}
          transformation={[{ width: 600, quality: 80, format: "webp" }]}
          loading="lazy"
          lqip={{ active: true }}  // blurred placeholder while loading
          alt={product.title}
        />
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <button>Add to Cart</button>
      </div>
    </IKContext>
  );
}