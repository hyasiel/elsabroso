import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

import { Header } from "../ui/Header.tsx";
import { Footer } from "../ui/Footer.tsx";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

interface MenuItem {
  id: number;
  name: string;
  url: string;
  info: string;
  price?: number;
  category?: string;
}

export function Menu() {
  const [menuElements, setMenuElements] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        console.log("calling API", `${API_URL}/products`);
        const resp = await fetch(`${API_URL}/products`);

        const text = await resp.text();
        console.log("menu fetch raw body", text.slice(0, 200));

        if (!resp.ok) {
          throw new Error("HTTP " + resp.status + " " + text);
        }

        let raw: any;
        try {
          raw = JSON.parse(text);
        } catch (parseError) {
          console.error("Could not parse menu JSON", parseError);
          throw parseError;
        }

        if (!Array.isArray(raw)) {
          console.error("Menu data is not an array", raw);
          throw new Error("Invalid menu data");
        }

        const data: MenuItem[] = raw.map((p: any) => {
          let url = p.url || p.imageUrl || p.image_url || "";

          if (url && url.startsWith("/")) {
            url = API_URL + url;
          }

          return {
            id: p.id,
            name: p.name || p.title || "",
            url,
            info: p.info || p.description || "",
            price: p.price != null ? Number(p.price) : undefined,
            category: p.category || "",
          };
        });

        // rellenar precios faltantes si existen duplicados
        const fillMap = new Map<string, number>();

        data.forEach((item) => {
          const key = item.url || item.name;
          if (item.price != null && key) {
            fillMap.set(key, item.price);
          }
        });

        const completed = data.map((item) => {
          if ((item.price == null || item.price === undefined) && item.url) {
            const match = fillMap.get(item.url) ?? fillMap.get(item.name);
            if (match != null) {
              return { ...item, price: match };
            }
          }
          return item;
        });

        setMenuElements(completed);
      } catch (e) {
        console.error("Failed to load menu", e);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  const carouselItems = menuElements.slice(0, 5);

  return (
    <>
      <Header />

      <section className="allmenu">
        <section className="menu">
          <h2>Mas Solicitados</h2>

          <div className="menu-cards">
            {loading ? (
              <p>Cargando...</p>
            ) : menuElements.length === 0 ? (
              <p>No se devolvieron productos.</p>
            ) : (
              menuElements.map((e) => (
                <Cards
                  key={e.id}
                  imageUrl={e.url}
                  name={e.name}
                  info={e.info}
                  price={e.price}
                  category={e.category}
                />
              ))
            )}
          </div>
        </section>

        <h2 className="others">Otros</h2>

        <br />

        <Carrousel items={carouselItems} />
      </section>

      <Footer />
    </>
  );
}

interface ICardProps {
  imageUrl: string;
  name: string;
  info: string;
  price?: number;
  category?: string;
}

function Cards({ imageUrl, name, info, price, category }: ICardProps) {
  const formattedPrice =
    price != null
      ? new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(price)
      : "Precio no disponible";

  return (
    <div className="card">
      <div className="img-container">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
          onError={(e) => e.currentTarget.classList.add("loaded")}
        />
      </div>

      <div className="infoContainer">
        <h3 className="card-title">{name}</h3>

        <p className="text">{info}</p>

        <p className="card-price">{formattedPrice}</p>
      </div>

      <button className="card-btn">Comprar</button>
    </div>
  );
}

function Carrousel({ items }: { items: MenuItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <section className="carrousel">
      <div className="all">
        <IconChevronLeft
          stroke={1}
          className="leftarrow"
          onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        />

        <div className="c-all">
          <div
            className="c-box"
            style={{
              transform: `translateX(-${activeIndex * 80}%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className={`c-item ${index === activeIndex ? "active" : ""}`}
              >
                <div className="img-container img-container-carrousel">
                  <img
                    className="imgcarrousel"
                    src={item.url}
                    alt={item.name}
                    loading="lazy"
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                    onError={(e) => e.currentTarget.classList.add("loaded")}
                  />
                </div>

                <div className="c-info">
                  <h4 className="c-title">{item.name}</h4>

                  {item.price != null && (
                    <p className="c-price">
                      {new Intl.NumberFormat("es-ES", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.price)}
                    </p>
                  )}
                </div>

                <button className="card-btn card-btn-carrousel">Comprar</button>
              </div>
            ))}
          </div>

          <div className="marks">
            {items.map((_, index) => (
              <div
                key={index}
                className={`mark ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        <IconChevronRight
          stroke={1}
          className="rightarrow"
          onClick={() =>
            setActiveIndex((prev) =>
              prev < items.length - 1 ? prev + 1 : prev,
            )
          }
        />
      </div>
    </section>
  );
}
