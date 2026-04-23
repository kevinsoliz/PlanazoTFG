"use client"; 

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de alerta permitidos por el sistema
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// Creación del contexto para compartir la función globalmente
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Función principal para añadir un mensaje y programar su borrado
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Contenedor visual de las notificaciones */}
      <div className="fixed bottom-10 right-10 z-9999 flex flex-col gap-3">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg text-white font-medium min-w-250px flex items-center gap-2 animate-in fade-in slide-in-from-right-5 duration-300`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook personalizado para usar el toast en cualquier componente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast debe usarse dentro de un ToastProvider');
  return context;
};