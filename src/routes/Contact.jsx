import { useNavigate } from "react-router-dom";

import React from "react";

const [fone, setTel] = useState("");

const navigate = useNavigate();

const Contact = () => {
  return (
    <div>
      <h5>Pagina de contatos</h5>

      <div className="wrap-input">
        <input
          className="input"
          type="fone"
          value={fone}
          onChange={(e) => setTel(e.target.value)}
        />
        <span className="focus-imput" data-placeholder="tel">
          telefone
        </span>
      </div>
    </div>
  );
};

<div className="container-btn">
  <button
    onClick={() => {
      navigate("/");
    }}
  >
    Esqueci minha senha
  </button>
</div>;

export default Contact;
