CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS "session" (
    "sid" VARCHAR NOT NULL PRIMARY KEY,
    "sess" JSON NOT NULL,
    "expire" TIMESTAMP(6) NOT NULL
  );

  CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");

  -- Tabla de perfiles:
  CREATE TABLE IF NOT EXISTS perfiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
    nombre VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    avatar_url VARCHAR(500),
    descripcion VARCHAR(500),
    categorias VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW()
  );

  --Tabla planes
  CREATE TABLE IF NOT EXISTS planes (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER NOT NULL REFERENCES users(id),
    titulo VARCHAR(200) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    descripcion TEXT,
    fecha TIMESTAMP NOT NULL,
    ubicacion VARCHAR(200),
    aforo_max INTEGER NOT NULL CHECK (aforo_max >= 2), 
    created_at TIMESTAMP DEFAULT NOW()
  );

-- Tabla intermedia: En esta tabla tenemos clave primaria compuesta porque un usuario no puede unirse al mismo plan dos veces.
  CREATE TABLE IF NOT EXISTS plan_participants (
    plan_id INTEGER NOT NULL REFERENCES planes(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (plan_id, user_id)
  );

  -- Tabla para Valoraciones
  CREATE TABLE valoraciones (
    id SERIAL PRIMARY KEY,
    plan_id INT NOT NULL,
    usuario_id INT NOT NULL,
    puntuacion NUMERIC(2,1) NOT NULL CHECK (puntuacion >= 0.5 AND puntuacion <= 5.0 AND (puntuacion * 2) % 1 = 0),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES planes(id) ON DELETE CASCADE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(plan_id, usuario_id) 
  );      