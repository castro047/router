import { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

// 2- reaproveitamento de estrutura
import { BrowserRouter, Outlet, Route } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <Outlet />
          <form className="login-form">
            <span className="login-form-title">Bem vindo</span>

            <div className="wrap-input">
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-imput" data-placeholder="Email">
                Gmail
              </span>
            </div>

            <div className="wrap-input">
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-imput" data-placeholder="Password">
                senha
              </span>
            </div>

            <div className="container-login-form-btn">
              <button
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Esqueci minha senha
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
