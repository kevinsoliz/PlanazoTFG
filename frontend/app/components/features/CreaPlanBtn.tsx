"use client";

const CreaPlanBtn = () => {
  const handleCrear = () => {
    //0. Abrir un formulario
    //0.5 el formulario es quien hace el post:
    //1. Coger el plan
    // 2. hacer post a api/planes
    // 3. recibir la respuesta?
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-primary btn-outline"
        onClick={() => (document.getElementById("my_modal_1") as HTMLDialogElement)?.showModal()}
      >
        Crear plan
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hola, de que va tu plan?</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cerrar</button>
              <button className="btn">Cancelar</button>
              <button className="btn">Crear</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CreaPlanBtn;
