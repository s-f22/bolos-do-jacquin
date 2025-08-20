import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";
import { CakeCategories } from "../components/CakeCategories";
import  jacquin  from "../assets/jacquin.png";


export const Home = () => {

  const [popularCakes, setPopularCakes] = useState<Cake[]>([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await interceptor.get<Cake[]>("http://localhost:3000/cakes");


        // Simula os mais populares pegando os 3 primeiros
        const topCakes = response.data.slice(0, 3);
        setPopularCakes(topCakes);

      } catch (error) {
        console.error("Erro ao carregar carrossel:", error);
      }
    };

    fetchCakes();
  }, []);

  return (

    <div className="container mainContainer">
      <div style={{ alignSelf: "center", width: "100%" }}>
        <h1 className="titulo">Bolos do Jacquin</h1>
        <img className="jacquinImg" src={jacquin} alt="" />
      </div>
      <CakeCategories />
    </div>
  );
};
