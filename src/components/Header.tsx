import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{ backgroundColor: "#FFDBBB" }}
      className="fixed-top container-fluid navbar navbar-expand-lg navbar-light"
    >
      <div className="container">

        <Link className="navbar-brand" to="/">
          <img
            src="https://lojadebolos.com.br/wp-content/uploads/2022/03/Logo-Loja-de-Bolos300-2.fw_.png"
            alt=""
            style={{ height: "5rem", borderRadius: "50%" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-end">
            <li className="nav-item">
              <Link className="nav-link" to="/cakes">Nossos bolos</Link>
            </li>

            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link d-flex align-items-center gap-1" to="/cakes/create">
                  Novo item <IoMdAddCircle />
                </Link>
              </li>
            )}

            <li className="nav-item">
              {isAuthenticated ? (
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              ) : (
                <Link className="nav-link" to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>

      </div>

    </nav>
  );
};
