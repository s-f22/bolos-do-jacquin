import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <nav
      style={{ backgroundColor: "#ffd088" }}
      className="fixed-top container-fluid navbar"
    >
      <div className="container">

        <Link className="" to="/">
          <MdArrowBackIos onClick={() => navigate(-1)} />
        </Link>

        <div id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-end">
            <li className="nav-item">
              <Link className="nav-link" to="/">Bolos do Jacquin</Link>
            </li>
          </ul>
        </div>

      </div>

    </nav>
  );
};
