// src/pages/HomePage.tsx
import { motion } from "framer-motion";
import { Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";

export default function HomePage() {
  return (
    <div className="hero-section">
      <div className="overlay" />

      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Atrask stilių
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Stilingi, kokybiški ir prieinami drabužiai moterims
              </motion.p>

              <motion.div
                className="btn-wrapper"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Link to="/shop">
                  <Button variant="light" className="cta-btn">
                    Peržiūrėti prekes
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Col>

          <Col md={6}>
            <motion.img
              src="/images/hero-model.png"
              alt="Moteriški rūbai"
              className="hero-image"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
