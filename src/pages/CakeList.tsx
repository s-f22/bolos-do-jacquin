import { useEffect, useState } from "react";
import type { Cake } from "../types/Cake";
import { Link, useNavigate, useParams } from "react-router-dom";
import interceptor from "../services/interceptor";
import { Carousel } from "react-bootstrap";
import { Header } from "../components/Header";
import { useLocation } from "react-router-dom";
import "./CakeList.css"

interface CarouselItem {
  id: string;
  name: string;
  images: string;
}


export const CakeList = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const navigate = useNavigate();
  const { category, cakeId } = useParams();
  const location = useLocation();

  const getData = async () => {
    try {
      const response = await interceptor.get("http://localhost:3000/cakes");
      const allCakes: Cake[] = response.data;

      let filtered: Cake[] = [];

      if (cakeId) {
        filtered = allCakes.filter((cake) => String(cake.id) === cakeId);
      } else if (location.pathname === "/cakes/search" && location.state?.results) {
        filtered = location.state.results;
      } else if (category) {
        filtered = allCakes.filter((cake) => cake.category.includes(category));
      } else {
        filtered = allCakes;
      }

      setCakes(filtered);

      const allImagesWithInfo: CarouselItem[] = filtered.flatMap((cake: Cake) =>
        cake.images.map((img) => ({
          id: String(cake.id),
          name: cake.name,
          images: img,
        }))
      );

      // Aleatoriza e seleciona os primeiros 5
      const shuffled = allImagesWithInfo.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setCarouselItems(selected);

    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  const capitalizar = (str: string | undefined) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  useEffect(() => {
    getData();
  }, [category, cakeId, location.state]);

  return (
    <>
      <Header />

      {carouselItems.length > 0 && (
        <Carousel style={{ marginTop: "56px" }}>
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <Link to={`/cakes/${category || "search"}/${item.id}`}>
                <img
                  className="d-block w-100 rounded"
                  src={`http://localhost:3000/static/${item.images}`}
                  alt={item.name}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h5 className="text-white">{item.name}</h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <div className="container mt-4">
        <h2>{cakeId ? "Resultado específico" : capitalizar(category || "Resultados da busca")}</h2>
        <div className="row mt-4">
          {cakes.map((cake) => (
            <div
              className="col-md-4 mb-4"
              key={cake.id}
              onClick={() => navigate(`/cakes/${category || "search"}/${cake.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="texto-cards card h-100">
                <img
                  src={`http://localhost:3000/static/${cake.images[0]}`}
                  className="card-img-top"
                  alt={cake.name}
                  style={{ maxHeight: "200px", objectFit: "cover" }}
                />
                <div className="card-body align-content-center">
                  <h5 className="card-title mb-3"><b>{cake.name}</b></h5>
                  <p>{cake.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

