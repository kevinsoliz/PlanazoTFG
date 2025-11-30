# Arquitectura del Proyecto

Este documento describe la estructura actual del proyecto, incluyendo la organización de carpetas y los propósitos principales de cada una.

## Estructura General de Carpetas

/public
/assets
/components
index.html

/src
/js
/scss

/docs


## Descripción de Carpetas

### `public/`
Contiene todos los archivos accesibles directamente por el navegador.

- **assets/**  
  Recursos estáticos como imágenes, íconos, fuentes o videos.

- **components/**  
  Componentes visuales reutilizables en HTML o fragmentos UI.

- **index.html**  
  Archivo principal y punto de entrada de la aplicación, este archivo no se toca hasta que cada componente funcione bien tanto en móvil como en desktop.

- **pruebas.html**
  Archivo de pruebas para ir trabajando cada componente por separado.



### `src/`
Incluye los archivos fuente del proyecto que se procesan y revisan minuciosamente antes de ir a `public/`.

- **js/**  
  Aqui también se irán añadiendo carpetas todas bien clasificadas.

- **scss/**  
  Estilos del proyecto organizados en SCSS (parciales, mixins, variables, etc...).


### `docs/`
Carpeta destinada a documentación del proyecto. Puede incluir:

- Documentación técnica  
- Diagramas  
- Manuales  
- Informes de arquitectura  


