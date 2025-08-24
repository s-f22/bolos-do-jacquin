import { Link, useNavigate } from "react-router-dom";
import { IoIosReturnLeft } from "react-icons/io";
import "./Header.css";
import { Button } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import type { Cake } from "../types/Cake";
import axios from "axios";

export const Header = () => {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const irPara = (categoria: string, id: string) => {
    navigate(`/cakes/${categoria}/${id}`)
    // navigate(`/cakes/${categoria}`);
    setSearch("");
  }

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cakes");
      const dados = res.data;
      if (res.status === 200) {
        setCakes(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar dados: ", error);
    }
  }

  const filtered = cakes.filter((cake: Cake) => {
    const text = search.toLowerCase();
    return (
      cake.name.toLowerCase().includes(text) ||
      cake.description.toLocaleLowerCase().includes(text) ||
      cake.category.some((cat) => cat.toLowerCase().includes(text))
    )
  })

  useEffect(() => {
    getData();
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }
    setSuggestions(filtered);
  }, [search])



  return (
    <nav
      style={{ backgroundColor: "#ffd088" }}
      className="fixed-top container-fluid navbar"
    >
      <div className="container containerHeader">

        <Link className="goBack" to="/">
          <IoIosReturnLeft size={25} color="black" onClick={() => navigate(-1)} />
        </Link>

        <div className="grupoPesquisar position-relative">
          <input
            className="inputStyle"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar bolos..."
          />
          <Button
            variant="light"
            onClick={() => {
              navigate("/cakes/search", {
                state: { results: suggestions },
              });
              setSearch("");
            }}
          >
            <IoIosSearch />
          </Button>

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((cake: Cake) => (
                <li key={cake.id}>
                  <p onClick={() => irPara(cake.category[0], cake.id!)}>{cake.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link className="nav-link logo-titulo" to="/">
          <span>Bolos do <b className="jacquin">Jacquin</b></span>
        </Link>

      </div>

    </nav>
  );
};
