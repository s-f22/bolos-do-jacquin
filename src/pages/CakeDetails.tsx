import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Cake } from "../types/Cake";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Modal, Spinner } from "react-bootstrap";
import { Image } from 'primereact/image';
import interceptor from "../services/interceptor";
import { useAuth } from "../contexts/AuthContext";



export const CakeDetails = () => {
  const { id } = useParams();
  const [cake, setCake] = useState<Cake>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await interceptor.delete(`http://localhost:3000/cakes/${id}`);
      handleCloseModal();
      navigate("/cakes");
    } catch (error) {
      console.error("Erro ao deletar o bolo:", error);
    }
  };

  const getDataById = async () => {
    try {
      const response = await interceptor.get(`http://localhost:3000/cakes/${id}`);
      setCake(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  if (!cake) {
    return (
      <div className="container mt-4 text-center">
        <Spinner animation="border" />
        <p className="mt-2">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">{cake.name}</h2>
        {
          isAuthenticated && (
            <div className="d-flex justify-content-end gap-2">
              <div className="d-flex justify-content-end mb-3 align-items-center">
                <Link to={`/cakes/${id}/edit`} className="btn btn-outline-primary d-flex align-items-center">
                  <FaEdit className="me-2" />
                  <span>Editar</span>
                </Link>
              </div>
              <div className="d-flex justify-content-end mb-3 align-items-center">
                <Button variant="outline-danger" onClick={handleShowModal} className="d-flex align-items-center">
                  <FaTrash className="me-2" />
                  <span>Excluir</span>
                </Button>
              </div>
            </div>
          )
        }

        {/* Informações do bolo */}
        <section className="d-flex flex-column align-items-end">
          <p className="fs-5 text-start text-wrap">{cake.description}</p>
          <p className="fs-5 mb-1">
            <strong>R$ {cake.price.toFixed(2)}</strong>
          </p>
          <p>
            Peso: {cake.weight}g
          </p>
        </section>

        {/* Galeria de imagens */}
        <div className="mt-4 row mb-4 justify-content-center align-items-center">
          {cake.images.map((imgUrl, index) => (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3 text-center">
              <Image
                src={imgUrl || "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"}
                alt={`Imagem ${index + 1} do ${cake.name}`}
                width="250"
                preview
                imageClassName="rounded"
              />
            </div>
          ))}
        </div>

      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este bolo?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Sim, excluir
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
