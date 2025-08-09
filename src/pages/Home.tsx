import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";

interface CarouselItem {
  id: string;
  name: string;
  images: string;
}

export const Home = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [popularCakes, setPopularCakes] = useState<Cake[]>([]);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const response = await interceptor.get<Cake[]>("http://localhost:3000/cakes");

        const allImagesWithInfo: CarouselItem[] = response.data.flatMap((cake) =>
          cake.images.map((img) => ({
            id: String(cake.id),
            name: cake.name,
            images: img,
          }))
        );

        const shuffled = allImagesWithInfo.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setCarouselItems(selected);

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
      <div className="container mt-4">
        <h1 className="display-4">Bem-vindo à Loja de Bolos!</h1>
        <p className="lead">Delícias que derretem na boca 🍰</p>

        {/* Carrossel */}
        {carouselItems.length > 0 && (
          <Carousel className="mt-4">
            {carouselItems.map((item, idx) => (
              <Carousel.Item key={idx}>
                <Link to={`/cakes/${item.id}`}>
                  <img
                    className="d-block w-100 rounded"
                    src={item.images}
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

        {/* Seção de Mais Vendidos */}
        <section className="mt-5">
          <h2>🎂 Mais Vendidos</h2>
          <div className="row">
            {popularCakes.map((cake) => (
              <div className="col-md-4 mb-4" key={cake.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={cake.images[0]}
                    className="card-img-top"
                    alt={cake.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{cake.name}</h5>
                    <p className="card-text">{cake.description.slice(0, 75)}...</p>
                    <Link to={`/cakes/${cake.id}`} className="btn btn-primary">
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seção de Depoimentos */}
        <section className="mt-5">
          <h2>💬 Quem comprou, aprovou!</h2>
          <div className="bg-light p-4 rounded shadow-sm">
            <blockquote className="blockquote mb-0">
              <p>“O melhor bolo que já comi na vida! Atendimento incrível e entrega rápida.”</p>
              <footer className="blockquote-footer">Maria Fernanda</footer>
            </blockquote>
            <hr />
            <blockquote className="blockquote mb-0">
              <p>“Recomendo demais! Meus filhos amaram o bolo de chocolate.”</p>
              <footer className="blockquote-footer">João Silva</footer>
            </blockquote>
          </div>
        </section>

        {/* Seção de Chamada para Ação */}
        <section className="mt-5 text-center bg-warning bg-opacity-25 p-4 rounded">
          <h3>🎁 Promoção da Semana</h3>
          <p className="lead">Compre 2 bolos e ganhe 10% de desconto na próxima compra!</p>
          <Link to="/cakes" className="btn btn-success btn-lg">
            Ver Bolos
          </Link>
        </section>
      </div>
    </>
  );
};
