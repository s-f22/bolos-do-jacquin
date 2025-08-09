import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import type { Cake } from "../types/Cake";
import TextareaAutosize from 'react-textarea-autosize';
import { FaTrash } from 'react-icons/fa';
import interceptor from "../services/interceptor";

export const CreateCake = () => {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [imageList, setImageList] = useState<string[]>([""]);
  const [weight, setWeight] = useState<number | undefined>();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/cakes");
  };

  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !subtitle || !description || !price || !weight
      // || imageList.some(img => !img)
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const newCake: Cake = {
      id: undefined,
      name,
      subtitle,
      description,
      price,
      weight,
      images: imageList,
    };

    try {
      const postResponse = await interceptor.post("http://localhost:3000/cakes", newCake);
      if (postResponse.status === 201) {
        handleShowModal();
      }
    } catch (error) {
      console.error("Erro ao cadastrar o bolo:", error);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedList = [...imageList];
    updatedList[index] = value;
    setImageList(updatedList);
  };

  const addImageField = () => setImageList([...imageList, ""]);

  const removeImageField = (index: number) => {
    const updatedList = imageList.filter((_, i) => i !== index);
    setImageList(updatedList);
  };

  return (
    <>
      <div className="container mt-4">
        <h2>Cadastrar Novo Bolo</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label d-flex"><b>Nome do Bolo</b></label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-flex"><b>Subtítulo</b></label>
            <TextareaAutosize
              className="form-control"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              style={{ resize: 'none', overflow: 'hidden' }}
              placeholder="Texto breve sobre o produto"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-flex"><b>Descrição</b></label>
            <TextareaAutosize
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ resize: 'none', overflow: 'hidden' }}
              placeholder="Texto detalhado e completo sobre o produto"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-flex"><b>Preço (em R$)</b></label>
            <input
              type="number"
              className="form-control"
              value={price ?? ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-flex"><b>Peso (em gramas)</b></label>
            <input
              type="number"
              className="form-control"
              value={weight ?? ""}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex"><b>URLs das Imagens</b></label>
            {imageList.map((img, index) => (
              <div className="d-flex mb-2" key={index}>
                <TextareaAutosize
                  className="form-control me-2"
                  placeholder={`Inserir link da imagem ${index + 1}`}
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  style={{ resize: 'none', overflow: 'hidden' }}
                  // required
                />
                {imageList.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => removeImageField(index)}
                    type="button"
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" type="button" onClick={addImageField}>
              Adicionar Imagem
            </Button>
          </div>

          <button type="submit" className="btn btn-success mt-3">
            Cadastrar
          </button>
        </form>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tudo certo!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Item cadastrado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
