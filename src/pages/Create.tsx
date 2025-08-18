import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";
import { FaUpload } from "react-icons/fa";
import { Header } from "../components/Header";
import axios from "axios";
import { PiTrashThin } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const CreateCake = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cakes, setCakes] = useState([])
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deletar, setDeletar] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmarDelete = () => {
    setDeletar(true);
  }

  const deletarBolo = async (id: string) => {
    handleShow();
    if (deletar) {
      try {
      const res = await axios.delete("http://localhost:3000/cakes")
      if (res.status == 200 || res.status == 204) {
        handleClose();
        alert("item excluido com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao deletar o item: ", error)
    }
      
    }
  }


  const enviarFoto = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await interceptor.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return res.data.filename;
    } catch (err) {
      console.error("Erro no upload da imagem:", err);
      alert("Erro ao fazer upload da imagem.");
      return null;
    }
  };


  const extrairImagem = (img: ChangeEvent<HTMLInputElement>) => {
    const file = img.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !category || !imageFile) {
      alert("Preencha todos os campos!");
      return;
    }

    const uploadedFileName = await enviarFoto(imageFile);

    if (!uploadedFileName) {
      alert("Falha ao enviar a imagem.");
      return;
    }

    const newCake: Cake = {
      id: undefined,
      name,
      category: category.split(",").map(c => c.trim()),
      description,
      images: [uploadedFileName]
    };

    try {
      const postResponse = await interceptor.post("http://localhost:3000/cakes", newCake);
      if (postResponse.status === 201) {
        alert("Bolo cadastrado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o bolo:", error);
      alert("Erro ao cadastrar o bolo.");
    }
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/cakes")
      const dados = res.data;
      if (dados) {
        setCakes(dados)
      }

    } catch (error) {
      console.error("Erro ao buscar os dados: ", error)
    }

  }

  useEffect(() => {
    getData();
  }, [])




  return (
    <>
      <Header />
      <div style={{
        maxWidth: "900px",
        margin: "56px auto",
        padding: "2rem",
        backgroundColor: "#fff8f0",
        borderRadius: "10px"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontFamily: "'Quicksand', sans-serif"
        }}>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "1.5rem"
          }}>
            {/* Coluna esquerda */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Bolo</label>
                <input
                  type="text"
                  placeholder="Insira o nome do bolo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Categoria</label>
                  <input
                    type="text"
                    placeholder="Chocolate, Cerimonias, Morango, Morango, Coco, Destaques"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Imagem</label>
                  <div>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      onChange={extrairImagem}
                      style={{ display: "none" }}
                    />

                    <label htmlFor="imageUpload" style={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "#f4d1a1",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      height: "2.5rem"
                    }}>
                      <FaUpload />
                    </label>

                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem" }}>Descrição</label>
                <textarea
                  placeholder="Insira uma descrição em detalhes sobre o bolo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </div>

            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <button type="submit" style={{
              backgroundColor: "#f4d1a1",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "2px 2px 0px #cfa56f"
            }}>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
      <h2 className="mb-4">Lista</h2>
      <table className="container table table-hover">
        <thead>
          <tr color="#fff6e7" style={{ verticalAlign: "middle" }}>
            <th scope="col">Nome</th>
            <th scope="col">Categoria</th>
            <th scope="col">Descrição</th>
            <th scope="col" style={{ padding: "1rem" }}>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            cakes.map((bolo: Cake) => (
              <tr style={{ verticalAlign: "middle" }}>
                <td>{bolo.name}</td>
                <td>{bolo.category.join(", ")}</td>
                <td>{bolo.description}</td>
                <td>
                  <PiTrashThin
                    size={35}
                    style={{ cursor: "pointer", padding: "5px" }}
                    onClick={deletarBolo(bolo.id)} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Excluir item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja deletar este bolo? Ele será removido da lista.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
