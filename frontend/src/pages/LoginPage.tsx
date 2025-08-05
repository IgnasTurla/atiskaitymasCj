// src/pages/LoginPage.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Container } from "react-bootstrap";
import "../styles/LoginPage.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useAuth();

  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // siusti el pasta ir password i serveri
      const res = await axios.post("/auth/login", { email, password });

      // issaugoti gauta token ir vartotojo duomenis
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // atnaujinti auth konteksta
      setUser({
        name: res.data.user.name,
        surname: res.data.user.surname,
        email: res.data.user.email,
      });

      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Nežinoma klaida";
      setError(message);
    }
  };

  return (
    <div className="auth-wrapper login-wrapper">
      <Container>
        <Card className="auth-card">
          <Card.Body>
            <h2 className="auth-title text-center mb-4">Prisijungimas</h2>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>El. paštas</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Slaptažodis</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {error && <p className="error-message">{error}</p>}

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Prisijungti
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
