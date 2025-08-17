import { useEffect, useState } from "react";
import type { Cake } from "../types/Cake";
import { Link, useNavigate, useParams } from "react-router-dom";
import interceptor from "../services/interceptor";
import { Carousel } from "react-bootstrap";
import { Header } from "../components/Header";

interface CarouselItem {
  id: string;
  name: string;
  images: string;
}


export const CakeList = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const navigate = useNavigate();
  const { category } = useParams();

  const getData = async () => {
    try {
      const response = await interceptor.get("http://localhost:3000/cakes");

      // Filtragem
      const filtrados: Cake[] = category
        ? response.data.filter((c: Cake) => c.category.includes(category))
        : response.data;

      setCakes(filtrados);
      console.log(filtrados);

      const allImagesWithInfo: CarouselItem[] = filtrados.flatMap((cake: Cake) =>
        cake.images.map((img) => ({
          id: String(cake.id),
          name: cake.name,
          images: img,
        }))
      );
      console.log("All images: ", allImagesWithInfo);

      // Aleatoriza e seleciona os primeiros 5
      const shuffled = allImagesWithInfo.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      console.log("Selected: ", selected);
      setCarouselItems(selected);
      console.log("Carrossel itens: ",carouselItems);
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
  }, []);

  return (
    <>
      <Header />
      {/* Carrossel */}
      {carouselItems.length > 0 && (
        <Carousel style={{ marginTop: "56px" }}>
          {carouselItems.map((item, idx) => (
            <Carousel.Item key={idx}>
              <Link to={`/cakes/${category}/${item.id}`}>
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
        <h2>{capitalizar(category)}</h2>
        <div className="row mt-4">
          {cakes.map((cake) => (
            <div
              className="col-md-4 mb-4"
              key={cake.id}
              onClick={() => navigate(`/cakes/${category}/${cake.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100">
                <img
                  src={`http://localhost:3000/static/${cake.images[0]}` || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                  className="card-img-top"
                  alt={cake.name}
                  style={{maxHeight: "200px", objectFit: "cover"}}
                />
                <div className="card-body align-content-center">
                  <h5 className="card-title">{cake.name}</h5>
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
