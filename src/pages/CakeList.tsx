import { useEffect, useState } from "react";
import type { Cake } from "../types/Cake";
import { useNavigate } from "react-router-dom";
import interceptor from "../services/interceptor";

export const CakeList = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await interceptor.get("http://localhost:3000/cakes");
      setCakes(response.data);
    } catch (error) {
      console.error("Erro ao buscar os dados: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <h2>Nossos Bolos</h2>
        <div className="row mt-4">
          {cakes.map((cake) => (
            <div
              className="col-md-4 mb-4"
              key={cake.id}
              onClick={() => navigate(`/cakes/${cake.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100">
                <img
                  src={cake.images[0] || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                  className="card-img-top"
                  alt={cake.name}
                />
                <div className="card-body align-content-center">
                  <h5 className="card-title">{cake.name}</h5>
                  <p className="card-text">{cake.subtitle}</p>
                  <p className="fs-5 card-text">
                    <strong>R$ {cake.price.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
