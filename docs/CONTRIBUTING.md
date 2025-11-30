# Contributing to Planazo

Este documento explica cómo organizar tu trabajo con Git, cómo usar ramas y cómo aportar código de forma ordenada.

---

## Flujo de trabajo con Git

### 1. Ramas principales

- **`main`**  
  Contiene solo código estable y listo para producción.  
  ⚠️ No trabajes directamente en esta rama, NUNCA, de hecho antes de hacer ningún commit, decidlo por whatsapp para confirmar que estáis en la rama correcta.

- **`dev`**  
  Rama de desarrollo donde se integran todas las features antes de pasarlas a `main`.

- **Ramas de feature**  
  Para cada nueva funcionalidad, crea tu propia rama:
  - `feature/landing-page`
  - `feature/login-page`
  - `feature/app-dashboard`
  - `feature/create-plan`
  - `feature/backend-connection`

---

### 2. Crear y trabajar en una rama de feature

1. Cambia a `dev` y asegúrate de tener la última versión, eso significa que tengas todos los archivos acutalizados:

git checkout dev
git pull origin dev

2. Crea la rama de tu feature y sube al remoto configurando upstream:

git checkout -b feature/nombre-de-tu-feature
git push -u origin feature/nombre-de-tu-feature 

3. Trabaja con todos los archivos que necesites, y haz commits frecuentes para guardar tu progreso, como estás en una rama secundaria, las modificaciones no van a afectar a la rama principal.

git add .
git commit -m "Descripción CLARA de lo que has hecho"

4. Si tu feature no está terminada pero quieres respaldar tu trabajo, haz push al remoto:

git push

5. Cuando hayas terminado la feature y veas que funcione bien, cambias a la `dev` asegurándote de que esté actualizada:

git checkout dev
git pull origin dev


6. Haces merge de tu feature, repito, solo cuando la feature esté terminada.

git merge feature/nombre-de-tu-feature 

7. Subir `dev` al remoto

git push origin dev

### 3. INSTRUCCIONES para el trabajo diario

Cuando abras vs code, lo `PRIMERO` que tienes que hacer es verficar que estás en la rama correcta

git status
git branch

Si no estás en la correcta, te vas a la correcta con:

git checkout feature/nombre-de-tu-rama

1. Actualizas la rama antes de empezar:

git pull 

2. Te pones a trabajar y haces commits regularmente

git add .
git commit -m "Descripción clara de los cambios"

3. Hacer push al remoto cuando termines tu trabajo

git push


