import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";
import type { Cake } from "../types/Cake";
import TextareaAutosize from 'react-textarea-autosize';
import interceptor from "../services/interceptor";

export const EditCake = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [images, setImages] = useState<string[]>([""]);
  const [weight, setWeight] = useState<number | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/cakes");
  };

  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    const fetchCake = async () => {
      try {
        const response = await interceptor.get(`http://localhost:3000/cakes/${id}`);
        const cake = response.data;
        setName(cake.name);
        setSubtitle(cake.subtitle);
        setDescription(cake.description);
        setPrice(cake.price);
        setWeight(cake.weight);
        setImages(cake.images || [""]);
      } catch (error) {
        console.error("Erro ao carregar bolo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCake();
  }, [id]);

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleAddImageField = () => {
    setImages([...images, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !subtitle || !description || !price || !weight
      // || images.some((img) => !img)
    ) {
      alert("Preencha todos os campos, incluindo todas as URLs de imagem!");
      return;
    }

    const updatedCake: Cake = {
      id: undefined,
      name,
      subtitle,
      description,
      price,
      weight,
      images
    };

    try {
      const response = await interceptor.put(`http://localhost:3000/cakes/${id}`, updatedCake);
      if (response.status === 200) {
        handleShowModal();
      }
    } catch (error) {
      console.error("Erro ao atualizar bolo:", error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="container mt-4 text-center">
          <Spinner animation="border" />
          <p className="mt-2">Carregando bolo...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <h2>Editar bolo: <i>{id}</i></h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>Nome do Bolo</b></label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>Subtítulo</b></label>
            <TextareaAutosize // componente utilizado para renderizar a altura de inputs e textarea's ajustada corretamente em telas menores (responsividade)
              className="form-control"
              minRows={1}
              // maxRows={10} // opcional, limita o crescimento máximo
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ resize: 'none', overflow: 'hidden' }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>Descrição</b></label>
            <TextareaAutosize
              className="form-control"
              minRows={3}
              // maxRows={15} // opcional, limita o crescimento máximo
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none', overflow: 'hidden' }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>Preço</b></label>
            <input
              type="number"
              className="form-control"
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>Peso (em gramas)</b></label>
            <input
              type="number"
              className="form-control"
              value={weight ?? ""}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex justify-content-start"><b>URLs das Imagens</b></label>
            {images.map((img, index) => (
              <div key={index} className="input-group mb-2">
                
                <TextareaAutosize
                  className="form-control"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  style={{ resize: 'none', overflow: 'hidden' }}
                  // required
                />
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveImageField(index)}
                  disabled={images.length === 1}
                >
                  Remover
                </button>
                
              </div>
            ))}
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleAddImageField}
            >
              Adicionar Imagem
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Salvar Alterações
          </button>
        </form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alterações Salvas</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bolo atualizado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
