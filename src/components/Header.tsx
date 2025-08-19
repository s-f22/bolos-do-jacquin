import { Link, useNavigate } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{ backgroundColor: "#ffd088" }}
      className="fixed-top container-fluid navbar"
    >
      <div className="container">

        <Link className="" to="/">
          <IoIosReturnLeft size={25} color="black" onClick={() => navigate(-1)} />
        </Link>

        <div id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-end">
            <li className="nav-item">
              <Link className="nav-link logo-titulo" to="/">
                <span>Bolos do <b className="jacquin">Jacquin</b></span>
              </Link>
            </li>
          </ul>
        </div>

      </div>

    </nav>
  );
};
