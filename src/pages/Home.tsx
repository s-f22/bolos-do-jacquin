import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";
import { CakeCategories } from "../components/CakeCategories";


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
    <>
      {/* <div className="container mt-4">
        <h1 className="display-4">Bem-vindo à Loja de Bolos!</h1>
        <p className="lead">Delícias que derretem na boca 🍰</p>
      </div> */}
      <div className="mainContainer">
        <div style={{ alignSelf: "center" }}>
          <h1 style={{marginBottom: "1.5rem"}}>Bolos do Jacquin</h1>
          <img className="jacquinImg" src="https://images.tcdn.com.br/img/img_prod/687586/dolma_i_erick_jacquin_229_1_577f0f49e946535fe962dbc071445cf2.jpg" alt="" />
        </div>
        <CakeCategories />
      </div>
    </>
  );
};
