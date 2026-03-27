# Autenticacion en Planazo — Guia de estudio para la defensa del TFG

## 1. El problema fundamental

HTTP no tiene memoria. Cada peticion que el navegador hace al servidor es independiente.
El servidor no sabe quien eres. La autenticacion resuelve esto: verificar la identidad
del usuario en cada peticion sin que tenga que hacer login cada vez.

## 2. Modelo cliente-servidor

- **Servidor**: el que tiene los datos y ofrece servicios (Supabase)
- **Cliente**: el que pide cosas al servidor (tu app)

El "cliente" de Supabase es un objeto que se comunica con los servicios de Supabase
(auth, base de datos, storage, etc.). Se llama "cliente" por la misma razon que un
cliente en un restaurante: pide del menu, recibe el plato, se queja si algo va mal,
y gestiona su estado (su cuenta, su mesa). No es un simple mensajero — tiene logica
propia.

## 3. Cookies

Una cookie es un pequeno texto que el navegador guarda. Un usuario puede tener muchas
cookies en una misma app, cada una con un nombre y un valor. Supabase guarda varias
cookies por usuario (access token, refresh token, etc.).

Las cookies se envian automaticamente con cada peticion HTTP. Asi el servidor puede
saber quien eres sin que tengas que identificarte manualmente cada vez.

## 4. Tokens y JWT

### Que es un token
Un token es una "tarjeta de acceso digital". Cuando haces login, Supabase verifica
tus credenciales y te devuelve tokens que demuestran tu identidad.

### JWT (JSON Web Token)
El formato de token que usa Supabase. Es un string con tres partes separadas por puntos:

```
CABECERA.DATOS.FIRMA
```

- **Cabecera**: tipo de token y algoritmo de cifrado
- **Datos**: tu ID, email, cuando caduca (la informacion va DENTRO del token)
- **Firma**: sello que solo Supabase puede generar con su clave secreta

### Como se verifica un JWT
Supabase NO busca el token en una base de datos. Recalcula la firma con su clave
secreta y la compara con la firma del token. Si coinciden, el token es autentico.
Es como verificar un billete mirando la marca de agua, sin llamar al banco.

### Dos tipos de token
- **Access token**: se envia en cada peticion. Caduca rapido (~1 hora). Contiene la
  informacion del usuario. Es el "carnet" que ensenas en cada puerta.
- **Refresh token**: solo se usa para pedir un access token nuevo cuando caduca.
  Dura mucho mas (semanas). Es el "contacto en recepcion" que te renueva el carnet
  sin que vuelvas a ensenar el DNI.

Si alguien roba el access token, solo funciona 1 hora. El refresh token esta menos
expuesto porque se usa muy pocas veces.

### Flujo de tokens
```
Login
  -> Supabase verifica credenciales
  -> Devuelve access token + refresh token
  -> Se guardan en cookies del navegador

Cada peticion:
  -> Se envia el access token
  -> Si esta valido -> acceso permitido
  -> Si caduco -> se usa el refresh token para pedir uno nuevo a Supabase
  -> Si el refresh token tambien caduco -> el usuario tiene que hacer login otra vez
```

## 5. JWT vs Sesiones clasicas

### Sesiones (enfoque clasico)
- Login -> el servidor crea un registro en su memoria: "sesion 123 = Kevin"
- Te da una cookie con solo el ID: session_id=123
- Cada peticion -> el servidor busca "que sesion es la 123?" en su almacen
- El servidor TIENE QUE RECORDAR a todos los usuarios activos

### JWT (lo que usa Supabase)
- Login -> Supabase genera un token que CONTIENE tu informacion dentro
- Te da una cookie con ese token
- Cada peticion -> el servidor LEE el token directamente, sin buscar nada
- El servidor NO NECESITA RECORDAR nada

### Por que Supabase usa JWT
Porque Supabase es un servicio externo. Con sesiones, tu servidor tendria que
preguntarle a Supabase "quien es la sesion 123?" en CADA peticion. Eso seria
lento y dependeria de que Supabase estuviera disponible. Con JWT, tu servidor
lee el token y ya sabe quien es el usuario sin llamadas externas.

## 6. SSR vs CSR

### SSR (Server Side Rendering)
El servidor genera el HTML antes de enviarlo al navegador. Necesita saber quien
es el usuario ANTES de generar la pagina. Requiere middleware.

Ejemplos: Netflix, Amazon, GitHub, Planazo

### CSR (Client Side Rendering)
El servidor envia una pagina casi vacia con JavaScript. El navegador genera todo.
La autenticacion la gestiona el JavaScript del navegador. No necesita middleware.

Ejemplos: Spotify (reproductor), Google Maps, Trello

### Por que Planazo usa SSR
- **Seguridad**: las decisiones de acceso se toman en el servidor, donde el usuario
  no puede manipular el codigo
- **SEO**: Google puede indexar los planes publicos (importante para una app social)
- **Rendimiento**: el usuario recibe la pagina ya montada, sin pantalla en blanco

## 7. Middleware

### Que es
Codigo que se ejecuta ENTRE la peticion del navegador y la pagina. Viene de
"middle" (medio) + "ware" (producto/software). Literalmente: software del medio.

### Que hace en Planazo
1. Intercepta cada peticion antes de que llegue a la pagina
2. Lee las cookies del usuario (getAll)
3. Comprueba si el access token ha caducado
4. Si caduco: solicita uno nuevo a Supabase usando el refresh token (setAll)
5. Deja pasar la peticion a la pagina con el token actualizado

### Por que el middleware y no Supabase directamente
Supabase vive en internet, en sus servidores. No puede ejecutar codigo dentro de
tu servidor de Next.js. Supabase te da las herramientas (@supabase/ssr) y tu montas
el middleware en tu servidor.

### Por que setAll actualiza cookies en dos sitios
- En la **peticion**: para que la pagina que viene despues del middleware vea el
  token actualizado
- En la **respuesta**: para que el navegador reciba y guarde las cookies nuevas

### Cuando se ejecuta
Solo cuando un usuario hace una peticion. Si 100.000 usuarios estan registrados
pero solo uno visita la app, solo se ejecuta el middleware de ese usuario.
getAll() lee las cookies de LA PETICION ACTUAL, no de todos los usuarios.

### El middleware NO genera tokens
Solo los solicita. Supabase es quien genera, verifica y decide. El middleware es
un mensajero: pide tokens nuevos a Supabase y los guarda en las cookies.

## 8. Arquitectura de ficheros

```
src/
  lib/
    supabase/
      client.ts    -> Cliente para el NAVEGADOR (usa createBrowserClient)
                      Maneja cookies automaticamente con document.cookie
                      Se usa en Client Components ("use client")

      server.ts    -> Cliente para el SERVIDOR (usa createServerClient)
                      Lee cookies manualmente con cookieStore (solo getAll)
                      Se usa en Server Components

  middleware.ts    -> Interceptor de peticiones
                      Lee Y escribe cookies (getAll + setAll)
                      Renueva tokens caducados
                      Protege rutas privadas (redirige a /login)

  app/
    login/
      page.tsx     -> Formulario de login (email + password)

    registro/
      page.tsx     -> Formulario de registro (email + password + nombre)

    auth/
      callback/
        route.ts   -> Recibe el callback de Supabase tras confirmar email
                      o login con Google. Convierte el codigo en sesion.
```

### Como se conectan
```
Usuario hace login en /login
  -> Supabase verifica y devuelve tokens
  -> Se guardan en cookies

Usuario visita /planes
  -> Navegador envia peticion con cookies
  -> MIDDLEWARE intercepta
      -> Lee cookies (getAll)
      -> Si token caduco: solicita uno nuevo a Supabase, guarda en cookies (setAll)
  -> PAGINA se ejecuta
      -> Usa CLIENTE (server.ts o client.ts) para pedir datos a Supabase
      -> Supabase verifica el token y responde con los datos
  -> Usuario ve la pagina con sus datos

Usuario no autenticado visita /planes/crear
  -> MIDDLEWARE intercepta
      -> No hay token
      -> Redirige a /login
```

## 9. Conceptos clave para la defensa

- **HTTP no tiene memoria**: cada peticion es independiente, las cookies resuelven esto
- **Cliente**: objeto con logica que se comunica con un servicio, no un simple conector
- **JWT**: token autocontenido con datos + firma, no requiere consulta a base de datos
- **Dos tokens**: access (corta vida, se envia siempre) y refresh (larga vida, solo para renovar)
- **Middleware**: codigo que intercepta peticiones antes de la pagina, renueva tokens
- **SSR**: el servidor genera el HTML, necesita conocer al usuario antes de renderizar
- **Supabase decide**: tu app es intermediaria, Supabase genera y verifica tokens
- **getAll/setAll**: funciones que le explican al cliente de Supabase como leer/escribir cookies en un entorno donde no existe document.cookie
