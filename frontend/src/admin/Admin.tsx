import { useState, type ChangeEvent, type FormEvent } from "react";
import { Header } from "../ui/Header";
import { Footer } from "../ui/Footer";

const API_URL = import.meta.env.VITE_API_URL || "";

export function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState(""); // for updates, leave blank to create

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debe iniciar sesión");
      return;
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    if (price) formData.append("price", price);
    if (id) formData.append("id", id);

    // choose endpoint depending on whether id was provided
    const url = id
      ? `${API_URL}/products/updateproducts`
      : `${API_URL}/products`;

    console.log("Admin submit to", url);
    // debug formdata entries
    for (const [k, v] of formData.entries()) {
      console.log("formdata", k, v);
    }

    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!resp.ok) {
      const error = await resp.json();
      console.error("Admin submit error", error);
      alert(`Error: ${error.error || error.message}`);
    } else {
      const data = await resp.json();
      console.log("Admin submit response", data);
      alert(
        "Operación exitosa: " +
          data.message +
          (data.id ? ` (id=${data.id})` : ""),
      );
      // reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setId("");
    }
  };

  return (
    <>
      <Header />

      <section className="form-section">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="image-box">
            <span>Elige la imagen</span>
            <input type="file" name="image" onChange={handleFileChange} />
            <br />
            <span>Titulo</span>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <span>Descripcion</span>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <span>Category</span>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <span>Precio</span>
            <input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
            />
            <br />
            <span>ID (solo para actualizar)</span>
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <br />
            <input type="submit" value={id ? "Actualizar" : "Crear"} />
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}
