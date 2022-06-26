import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Verify.module.css";

function Success() {
  let navigate = useNavigate();
  return (
    <div className={s.main_container}>
      <div className={s.card}>
        <div className={s.header}>
          <h2>La dirección de tu mail ya fue activada!</h2>
          <h3>Ahora dale al botón de abajo para ingresar y listo :)</h3>
          <h5>(con tu cuenta ya activada, no va a hacer falta que vuelvas a hacer esto de nuevo, es por única vez!)</h5>
        </div>
        <div className={s.btn}>
          <button onClick={() => { return navigate("/") }}>Ingresar</button>
        </div>
      </div>
    </div>
  );
}

export default Success;
