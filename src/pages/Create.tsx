import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Cake } from "../types/Cake";
import interceptor from "../services/interceptor";
import { FaUpload } from "react-icons/fa";
import { Header } from "../components/Header";

export const CreateCake = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate();

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
                  placeholder="Bolo de cenoura"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
              </div>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Categoria</label>
                <input
                  type="text"
                  placeholder="Chocolate, Morango, Coco"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                />
                <div >
                  <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem", textAlign: "left" }}>Imagem</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => extrairImagem(e)}
                      style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
                    />

                    <button
                      type="button"
                      style={{
                        backgroundColor: "#f4d1a1",
                        border: "none",
                        padding: "0 1rem",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      <FaUpload />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "0.25rem" }}>Descrição</label>
                <textarea
                  placeholder="Bolo de cenoura com cobertura de chocolate, saboroso..."
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
    </>
  );
};
