import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";
import { PiUploadLight } from "react-icons/pi";
import { Header } from "../components/Header";
import axios from "axios";
import { PiTrashThin } from "react-icons/pi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Create.css"
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "react-bootstrap";


export const CreateCake = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [cakes, setCakes] = useState([])
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deletarId, setDeletarId] = useState("")


  const handleClose = () => setShow(false);

  const handleShow = (id: string) => {
    setShow(true);
    setDeletarId(id);
  }


  const deletarBolo = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/cakes/${deletarId}`)
      if (res.status == 200 || res.status == 204) {
        handleClose();
        getData();
        setDeletarId("");
      }
    } catch (error) {
      console.error("Erro ao deletar o item: ", error)
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
        getData();
        // navigate("/");
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
      <div
        className="container bg-custom"
        style={{
          marginTop: "56px",
          padding: "2rem",
          backgroundColor: "#fff8f0",
          borderRadius: "10px"
        }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "2rem",
          marginTop: "1rem"
        }}>Cadastro</h2>

        <form onSubmit={handleSubmit}>
          <div className="itens-cadastro-container"          >
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
              <div className="container-categ-img">
                <div>
                  <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Categoria</label>
                  <input
                    type="text"
                    placeholder="Chocolate, Cerimonias, Morango, Natal, Coco, Destaques"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Imagem</label>
                  <div className="w-100 h-100">
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
                      backgroundColor: "#ffd088",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      boxShadow: "2px 2px 0px #cfa56f"
                    }}>
                      <PiUploadLight size={25} />
                    </label>

                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="text-area-container">
                <label style={{ fontWeight: "bold", marginBottom: "0.25rem", textAlign: "left" }}>Descrição</label>
                <textarea
                  className="h-100"
                  placeholder="Insira uma descrição em detalhes sobre o bolo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </div>

            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button type="submit" style={{
              backgroundColor: "#ffd088",
              border: "none",
              padding: "0.75rem 7rem",
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

      <h2 className="mt-3 mb-4">Lista</h2>
      <div className="table-responsive tabela-responsiva">
        <table className="container table table-hover mb-5 custom-table ">
          <thead style={{ backgroundColor: "#fff6e7" }}>
            <tr style={{ verticalAlign: "middle" }}>
              <th className="bg-custom"><b>Nome</b></th>
              <th className="bg-custom">Categoria</th>
              <th className="bg-custom">Descrição</th>
              <th className="bg-custom" style={{ padding: "1rem" }}>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              cakes.map((bolo: Cake) => (
                <tr className="table-row-bg" style={{ verticalAlign: "middle" }}>
                  <td className="bg-custom">{bolo.name}</td>
                  <td className="bg-custom">{bolo.category.join(", ")}</td>
                  <td className="bg-custom">{bolo.description}</td>
                  <td className="bg-custom">
                    <PiTrashThin
                      size={35}
                      style={{ cursor: "pointer", padding: "5px" }}
                      onClick={() => {
                        if (bolo.id) {
                          handleShow(bolo.id);
                        } else {
                          console.warn("ID do bolo está indefinido.");
                        }
                      }} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {/* Cards para exibição somente em telas menores */}
      <div className="container container-cards-mobile">
        {
          cakes.map((c: Cake) => (
            <Card className="card-container">
              {/* <CardImg className="cardImg" variant="" src={`http://localhost:3000/static/${c.images}`} /> */}
              <CardBody>
                <CardTitle><b>{c.name}</b></CardTitle>
                <CardSubtitle className="mb-2"> <b>Categorias:</b> {c.category.join(", ")} </CardSubtitle>
                <CardText> {c.description} </CardText>
                <Button onClick={() => {
                  if (c.id) {
                    handleShow(c.id);
                  } else {
                    console.warn("ID do bolo está indefinido.");
                  }
                }} > <PiTrashThin /> </Button>
              </CardBody>
            </Card>
          ))
        }
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Excluir item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja deletar este bolo? Ele será removido da lista.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => deletarBolo()}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
