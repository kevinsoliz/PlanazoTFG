// Este hook se encarga de manejar la lógica de conexión al chat y el envío/recepción de mensajes

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Definimos la estructura específica para nuestro chat
interface ChatAuth {
  serverOffset: string | number;
  planId: number;
  userId: number; // Agregamos el userId para identificar al usuario en el backend
}

// Extendemos la interfaz original de Socket.io
interface CustomSocket extends Socket {
  auth: ChatAuth;
}

export function useChat(planId: number, userName: string, userId: number) {
  const [messages, setMessages] = useState<{content: string, user_name: string, avatar: string | null, created_at: string}[]>([]);
  
  // Paso importante: Tipamos el useRef con nuestra CustomSocket
  const socketRef = useRef<CustomSocket | null>(null);

  useEffect(() => {
    // Conectamos al backend usando la URL definida en las variables de entorno
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"; 
    socketRef.current = io(backendUrl, {
      auth: { 
        serverOffset: 0, 
        planId,
        userId
      }
    }) as CustomSocket;

    // Notificamos al servidor que nos unimos a la sala del plan
    socketRef.current.emit('join_plan', planId); // Nos unimos a la sala específica del plan

    // Manejamos los mensajes entrantes del servidor
    socketRef.current.on(
      'chat_message',
      (msg: string, id: string, user: string, avatar: string | null, createdAt: string) => {
        setMessages((prev) => [
          ...prev,
          { content: msg, user_name: user, avatar, created_at: createdAt }
        ]);
        
        if (socketRef.current) {
          socketRef.current.auth.serverOffset = id; 
        }
      }
    );

    return () => {
      socketRef.current?.disconnect();
    };
  }, [planId]);

  const sendMessage = (content: string) => {
    if (socketRef.current && content.trim()) {
      socketRef.current.emit('chat_message', content, userName, planId);
    }
  };

  return { messages, sendMessage };
}
