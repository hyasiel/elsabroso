import { Header } from "../ui/Header.tsx";
import { Footer } from "../ui/Footer.tsx";
import React from "react";
import { useEffect } from "react";

export function MainWeb() {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) return;

  //   fetch("http://localhost:3000/auth/verifytoken", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.user) {
  //         console.log("Usuario logeado:", data.user);
  //       } else {
  //         localStorage.removeItem("token");
  //       }
  //     });
  // }, []);

  return (
    <React.Fragment>
      {/*header section*/}
      <Header />

      {/*hero section*/}

      <section className="hero">
        <div className="capa"></div>
        <div className="hero-text_container">
          <h1 className="hero-text">
            <div className="decor">DISFRUTA DE LOS MEJORES PLATOS</div>
          </h1>
          <h1 className="hero-text">CON LAS MEJORES RECETAS</h1>
        </div>
      </section>

      {/*preview section*/}

      <section className="preview-gen">
        <div className="preview">
          <div className="preview-card">
            <h2 className="preview-card__text">
              Te brindamos un lugar ideal para compartir en familia
            </h2>
            <div className="preview-card__imgcont">
              <img
                className="preview-card__img"
                src="/src/images/demos/1.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="preview-card">
            <h2 className="preview-card__text inv">Delicias que emocionan</h2>

            <div className="preview-card__imgcont">
              <img
                className="preview-card__img"
                src="/src/images/demos/1.jpg"
                alt=""
              />
            </div>
          </div>

          <div className="preview-card">
            <h2 className="preview-card__text">
              Disfrutas una nueva experiencia en cada bocado
            </h2>
            <div className="preview-card__imgcont">
              <img
                className="preview-card__img"
                src="/src/images/demos/1.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}
