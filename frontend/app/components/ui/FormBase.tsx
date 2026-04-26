import React from "react";
import BaseCard from "../ui/BaseCard";
import { CATEGORIAS } from "@/app/constants/categorias";

const FormBase = () => {
  return (
    <>
      <BaseCard bgColor="">
        <div className="card-body w-full place-items-center">
      <p className="font-bold text-2xl">Mi perfil</p>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">¿Cuál es tu nombre?</legend>
            <input
              type="text"
              className="input input-success w-full"
              placeholder="Nombre y apellido"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">¿Tu nombre de usuario?</legend>
            <input
              type="text"
              className="input input-success  w-full"
              placeholder="ejemplo_777"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              Cuéntanos un poco sobre ti
            </legend>
            <textarea
              className="textarea textarea-success w-full"
              placeholder="Qué tipo de planes de gustan?"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">
              ¿Qué categorías te van más?
            </legend>
            <div className="flex flex-wrap justify-center gap-2">
              {
                /** aqui podria meter los badges */
                CATEGORIAS.map((c) => (
                  <button onClick={() => console.log('hey', c.name)} className={`badge badge-sm ${c.badge} hover:cursor-pointer`}>{c.name}</button>
                ))
              }
            </div>
          </fieldset>
        </div>
      </BaseCard>
    </>
  );
};

export default FormBase;
