import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { DotLoader } from "react-spinners";
import "../styles/ShopPage.scss";

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

const pageSize = 12;

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(products.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const visibleProducts = products.slice(startIndex, endIndex);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Klaida gaunant produktus:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="shop-page">
      <h1>Moteriški Drabužiai</h1>

      {loading ? (
        <div className="loader-wrapper">
          <DotLoader color="#FF69B4" size={80} />
        </div>
      ) : (
        <>
          <Row className="g-4">
            {visibleProducts.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard {...product} />
              </Col>
            ))}
          </Row>

          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
              {pageNumbers.map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "primary" : "outline-primary"}
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
}
