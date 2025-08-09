import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import interceptor from "../services/interceptor";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await interceptor.post("http://localhost:3000/login", {
        email,
        password,
      });

      // aguarde o contexto ser atualizado antes de redirecionar
      await new Promise((resolve) => {
        login(res.data.accessToken);
        setTimeout(resolve, 50); // tempo mínimo para o contexto propagar
      });

      navigate("/cakes");
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light p-4">
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
};
