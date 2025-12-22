# Guía de Uso de BEM con CSS Puro Analogía con POO

##  Objetivo

Este documento explica cómo usar **BEM (Block--Element--Modifier)** en
**CSS**, con ejemplos que conectan la metodología con
conceptos de **Programación Orientada a Objetos (POO)** para lograr
código mantenible y escalable.

------------------------------------------------------------------------

# 1. ¿Qué es BEM?

BEM divide la UI en tres conceptos:

-   **Bloque (`block`)**\
    Un componente autónomo.
-   **Elemento (`block__element`)**\
    Parte de un bloque.
-   **Modificador (`block--modifier`)**\
    Una variación del bloque o elemento.

### Ejemplo simple

``` html
<button class="btn btn--primary">
  <span class="btn__text">Comprar</span>
</button>
```


``` css
.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
}

.btn__text {
  font-weight: 600;
}

.btn--primary {
  background: blue;
  color: white;
}
```

------------------------------------------------------------------------

# 2. Relación entre BEM y POO

  POO             BEM
  --------------- ------------------------
  Clase           Bloque
  Propiedad       Elemento
  Subclase        Modificador
  Encapsulación   Estilos aislados
  Instancia       Cada aparición en HTML

------------------------------------------------------------------------

# 3. Encapsulación en CSS (POO → BEM)

En POO, cada clase define su comportamiento aislado.\
En BEM, cada bloque tiene **estilos totalmente independientes**:

``` css
.card { ... }
.navbar { ... }
```

No comparten estilos automáticamente, igual que las clases en POO.

------------------------------------------------------------------------

# 4. Polimorfismo mediante Modificadores

``` css
.btn {
  padding: 1rem 2rem;
}

.btn--primary {
  background: blue;
}

.btn--danger {
  background: red;
}
```


------------------------------------------------------------------------

# 5. Ejemplo completo de componente con BEM usando solo CSS

## HTML

``` html
<article class="product-card product-card--featured">
  <img src="img.jpg" class="product-card__image">
  <h2 class="product-card__title">Zapatillas</h2>
  <p class="product-card__price">$59.99</p>
  <button class="btn btn--primary product-card__btn">Comprar</button>
</article>
```

## CSS 

``` css
.product-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
}

.product-card__image {
  width: 100%;
}

.product-card__title {
  font-size: 1.4rem;
  font-weight: bold;
}

.product-card__price {
  color: #ff6600;
}

.product-card__btn {
  margin-top: 1rem;
}


.product-card--featured {
  border: 2px solid gold;
  background: #fffbe6;
}
```

------------------------------------------------------------------------

# 6. BEM como Clases + Subclases en POO

### CSS

``` css
.card {
  padding: 1rem;
  border-radius: 10px;
}

.card--shadow {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
```

### Analogía Java

``` java
class Card { ... }
class CardShadow extends Card { ... }
```

------------------------------------------------------------------------

# 7. Buenas prácticas cuando usas CSS + BEM 

### ✔ 1. Un bloque = un archivo CSS

    components/
      btn.css
      card.css
      navbar.css

### ✔ 2. Evita selectores largos

❌ `#header .nav ul li a span { ... }`\
✔ `.nav__link { ... }`

### ✔ 3. Todo debe ser modular

### ✔ 4. No dependas del contexto

❌ `.product-card .btn { ... }`\
✔ `.product-card__btn { ... }`

### ✔ 5. Nunca uses IDs para dar estilo

------------------------------------------------------------------------


# 8. Beneficios finales

-   Código modular y limpio
-   Perfecto para proyectos grandes
-   Cambios seguros sin romper otros componentes
-   Independencia entre bloques
-   Fácil trabajo en equipo
-   Mente orientada a objetos aplicada al CSS

------------------------------------------------------------------------

# 9. Extra: Plantilla para nuevos componentes BEM

``` html
<div class="block block--modifier">
  <div class="block__element"></div>
  <div class="block__element block__element--modifier"></div>
</div>
```

``` css
.block { }

.block__element { }

.block--modifier { }

.block__element--modifier { }
```


