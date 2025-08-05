import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/ProductCard.scss";

interface Props {
  id: string;
  name: string;
  image: string;
  price: string;
}

export default function ProductCard({ id, name, image, price }: Props) {
  return (
    <Card className="product-card h-100">
      <Card.Img
        variant="top"
        src={image}
        height="200"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between p-2">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>€{price}</Card.Text>
        </div>
        <Link to={`/product/${id}`}>
          <Button variant="outline-primary" className="w-100 mt-2">Žiūrėti</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
