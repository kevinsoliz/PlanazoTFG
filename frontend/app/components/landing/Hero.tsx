import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        {/* Texto */}
        <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
          <h1 className="text-5xl font-bold  capitalize">
            Planes sencillos gente cercana
          </h1>
          <p className="text-md text-base-content/70">
            Encuentra personas con tus mismos intereses y comparte experiencias
            únicas. Crear un plan es sencillo, unirte a uno todavía más. Empieza
            hoy y descubre lo que te espera.
          </p>
          <div>
            <Link href="/planes" className="btn btn-primary btn-lg mt-5">
              Me apunto
            </Link>
          </div>
        </div>
        {/* Imagen placeholder */}
        <img
          src="/images/amigos.png"
          alt="Hero"
          className="w-full h-auto max-w-xl"
        />
      </div>
    </section>
  );
};

export default Hero;
