"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

const BackToTopBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className="fixed bottom-6 right-6 z-50 btn btn-primary btn-circle shadow-lg lg:hidden"
    >
      <FiArrowUp className="h-5 w-5" />
    </button>
  );
};

export default BackToTopBtn;
