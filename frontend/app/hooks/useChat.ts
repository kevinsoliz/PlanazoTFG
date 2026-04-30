import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

/**
 * ChatAuth - Estructura de datos de autenticación para Socket.IO
 * - serverOffset: ID del último mensaje recibido (para recuperar conexión)
 * - planId: ID del plan para el que se abre el chat
 */
interface ChatAuth {
  serverOffset: string | number;
  planId: number;
}

/**
 * CustomSocket - Extensión de la interfaz Socket.io
 * Añade la propiedad auth con los datos de autenticación del chat
 */
interface CustomSocket extends Socket {
  auth: ChatAuth;
}

/**
 * useChat - Hook para gestionar el chat en tiempo real con Socket.IO
 * 
 * @param planId - ID del plan para el que se abre el chat
 * @param userName - Nombre del usuario actual
 * @returns { messages, sendMessage, isConnected } - Mensajes, función para enviar y estado de conexión
 */
export function useChat(planId: number, userName: string) {
  const [messages, setMessages] = useState<{content: string, user_name: string}[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<CustomSocket | null>(null);

  useEffect(() => {
    // Determinar la URL del backend para Socket.IO
    // En desarrollo: http://localhost:4000
    // En producción: la URL del servidor real
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
    
    console.log(`🔌 Conectando Socket.IO a: ${backendUrl}`);

    // Crear conexión a Socket.IO
    socketRef.current = io(backendUrl, {
      // Datos de autenticación del cliente
      auth: { 
        serverOffset: 0,      // Comenzar desde el mensaje 0
        planId                // Enviar el ID del plan
      },
      // Configuraciones de reconexión
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    }) as CustomSocket;

    // ===== EVENTOS DE CONEXIÓN =====
    socketRef.current.on('connect', () => {
      console.log('Socket.IO conectado');
      setIsConnected(true);
      setError(null);
      
      // Notificar al servidor que nos unimos a la sala del plan
      socketRef.current?.emit('join_plan', planId);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket.IO desconectado');
      setIsConnected(false);
    });

    socketRef.current.on('connect_error', (error: any) => {
      console.error('Error de conexión Socket.IO:', error);
      setError(`Error de conexión: ${error.message || 'Error desconocido'}`);
    });

    // ===== EVENTOS DE CHAT =====
    // Escuchar nuevos mensajes del chat
    socketRef.current.on('chat_message', (msg: string, id: string, user: string) => {
      console.log(`💬 Nuevo mensaje de ${user}: ${msg}`);
      
      // Añadir mensaje a la lista
      setMessages((prev) => [...prev, { content: msg, user_name: user }]);
      
      // Actualizar el offset del servidor para recuperación offline
      if (socketRef.current) {
        socketRef.current.auth.serverOffset = id;
      }
    });

    // Limpiar conexión al desmontar el componente
    return () => {
      console.log('Limpiando conexión Socket.IO');
      socketRef.current?.disconnect();
    };
  }, [planId]);

  /**
   * sendMessage - Enviar un mensaje al chat
   * @param content - Contenido del mensaje
   */
  const sendMessage = (content: string) => {
    if (socketRef.current && content.trim()) {
      console.log(`Enviando mensaje: ${content}`);
      socketRef.current.emit('chat_message', content, userName, planId);
    }
  };

  return { 
    messages, 
    sendMessage, 
    isConnected, 
    error 
  };
}
