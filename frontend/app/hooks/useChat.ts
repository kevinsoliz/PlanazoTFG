import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Definimos la estructura específica para nuestro chat
interface ChatAuth {
  serverOffset: string | number;
  planId: number;
}

// Extendemos la interfaz original de Socket.io
interface CustomSocket extends Socket {
  auth: ChatAuth;
}

export function useChat(planId: number, userName: string) {
  const [messages, setMessages] = useState<{content: string, user_name: string}[]>([]);
  
  // Paso importante: Tipamos el useRef con nuestra CustomSocket
  const socketRef = useRef<CustomSocket | null>(null);

  useEffect(() => {
    // Conectamos al backend usando la URL definida en las variables de entorno
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000'; 
    socketRef.current = io(backendUrl, {
      auth: { 
        serverOffset: 0, 
        planId 
      }
    }) as CustomSocket;

    // Notificamos al servidor que nos unimos a la sala del plan
    socketRef.current.emit('join_plan', planId);

    // Escuchamos los mensajes entrantes
    socketRef.current.on('chat_message', (msg: string, id: string, user: string) => {
      setMessages((prev) => [...prev, { content: msg, user_name: user }]);
      
      // Gracias a la interfaz CustomSocket, esto ya no dará error
      if (socketRef.current) {
        socketRef.current.auth.serverOffset = id; 
      }
    });

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
