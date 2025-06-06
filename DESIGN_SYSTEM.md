# Sistema de Diseño del Portfolio

Este documento detalla las decisiones clave de diseño visual y los componentes reutilizables utilizados en este portfolio web para asegurar coherencia y profesionalismo.

---

## 1. Paleta de Colores

Aquí se define la paleta de colores principal utilizada en el portfolio, junto con el rol y el propósito de cada color.

| Nombre Variable (ej.) | Código HEX | Rol Principal                           | Propósito / Uso                                                                                                                                                                       |
| :-------------------- | :--------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `background-main`     | `#F2E9E4`  | **Fondo Principal**                     | La base del lienzo Fondos de la página, fondos de tarjetas/secciones claras.                                                                                                          |
| `text-main`           | `#22223B`  | **Texto Principal / Fondo Oscuro**      | Máxima legibilidad. Texto de párrafos y títulos (en fondos claros), fondos de secciones oscuras (ej: footer).                                                                         |
| `primary-brand`       | `#4A4E69`  | **Color Primario**                      | Color de marca distintivo. Botones principales, enlaces activos, títulos destacados, elementos clave que definen tu identidad.                                                        |
| `secondary`           | `#C9ADA7`  | **Color Secundario / Fondo Sutil**      | Complemento armónico. Botones secundarios, fondos de bloques de contenido sutiles, bordes suaves.                                                                                     |
| `accent`              | `#9A8C98`  | **Color de Acento Sutil / Interactivo** | Pequeños detalles interactivos o de diferenciación. Íconos al pasar el ratón, enlaces de texto específicos, elementos gráficos sutiles que necesiten un toque distinto pero elegante. |

**Notas Adicionales de Color:**

- La paleta debe de tener una estética sofisticada, sobria y profesional.
- Priorizar siempre la legibilidad. Se recomienda usar la herramienta WebAIM Contrast Checker para verificar el contraste entre texto y fondo.

---

## 2. Tipografía (Fuentes)

Detalles sobre las fuentes utilizadas y su jerarquía para mantener la consistencia en el texto.

- **Fuentes Seleccionadas:**
  - **Para Títulos (`h1`, `h2`, `h3`, etc.):** `Poppins`
    - **Uso:** Para encabezados principales y subtítulos importantes, donde se busca impacto y la modernidad geométrica de Poppins.
    - **Pesos sugeridos:** `SemiBold (600)`, `Bold (700)`.
    - **Fallbacks:** `'Helvetica Neue'`, `'Arial'`, `'sans-serif'`.
    - **Ejemplo CSS:** `font-family: 'Poppins', 'Helvetica Neue', Arial, sans-serif;`
  - **Para Cuerpo de Texto y Párrafos (`p`, listas, texto de formularios, etc.):** `Lato`
    - **Uso:** Para todo el contenido de lectura principal, donde la legibilidad y la comodidad son clave.
    - **Pesos sugeridos:** `Regular (400)`, `Bold (700)` (para enfatizar texto).
    - **Fallbacks:** `'Lato'`, `'Helvetica'`, `'Arial'`, `'sans-serif'`.
    - **Ejemplo CSS:** `font-family: 'Lato', Helvetica, Arial, sans-serif;`
- **Jerarquía de Tamaños Base (usando `rem`):**
  - Estos tamaños se definirán en relación al `font-size` base del elemento `html`.
  - `h1`: `3rem` (ej: 48px si base es 16px)
  - `h2`: `2rem` (ej: 32px si base es 16px)
  - `h3`: `1.5rem` (ej: 24px si base es 16px)
  - `p` (Párrafo): `1rem` (ej: 16px si base es 16px)
  - `line-height` (Interlineado para párrafos): `1.6` (sin unidad para escalado proporcional)

### **2.1. Tipografía Responsiva**

Para asegurar la legibilidad y la estética en diferentes tamaños de pantalla, los tamaños de fuente se adaptarán utilizando la unidad **`rem`** y **Media Queries**, siguiendo un enfoque "Mobile-First".

- **Configuración del Tamaño Base del Documento (`html`):**

  - **Por defecto (para móviles - `0px` a `767px`):**
    ```css
    html {
      font-size: 100%; /* Por defecto 16px. Todos los 'rem' se basan en esto. */
    }
    ```
  - **En Dispositivos Medianos (Tabletas - a partir de `768px`):**
    ```css
    @media (min-width: 768px) {
      html {
        font-size: 106.25%; /* Aproximadamente 17px. Escalando todo el 'rem' en el sitio. */
      }
      /* Opcional: Ajustes más específicos para títulos si se desea una escala más pronunciada */
      h1 {
        font-size: 2.8rem;
      } /* Será 2.8 * 17px */
    }
    ```
  - **En Dispositivos Grandes (Escritorio - a partir de `1024px`):**
    ```css
    @media (min-width: 1024px) {
      html {
        font-size: 112.5%; /* Aproximadamente 18px. Escalando todo el 'rem' del sitio. */
      }
      /* Opcional: Ajustes más específicos para títulos */
      h1 {
        font-size: 3.5rem;
      } /* Será 3.5 * 18px */
      h2 {
        font-size: 2.5rem;
      } /* Será 2.5 * 18px */
    }
    ```

- **Notas Clave para Tipografía Responsiva:**
  - **Unidades `rem`:** Todos los tamaños de fuente (y muchos espaciados) se definirán en `rem`. Esto asegura que escalen automáticamente de manera **predecible y consistente** cuando cambias el `font-size` base en `html` en tus media queries.
  - **`font-size` en `html`:** Cambiando este valor es como controlas la escala general de tu diseño en diferentes puntos de interrupción.
  - **Accesibilidad:** El uso de `rem` respeta las configuraciones de tamaño de texto del navegador del usuario, mejorando la accesibilidad.

## 3. Efectos Visuales y Geometría

Definición de las sombras y los bordes redondeados para mantener una coherencia visual y dar al diseño una sensación moderna y sofisticada.

### **3.1. Sombras (`box-shadow`)**

Se definirán distintos niveles de sombra para indicar jerarquía, profundidad o interactividad, utilizando `rgba()` para transparencia y sutileza.

- **Sombra Sutil (`--shadow-subtle`):**
  - **Propósito:** Para dar una ligera elevación a elementos como tarjetas o contenedores que se asientan sobre el fondo principal. Muy discreta.
  - **Valor CSS:** `0px 2px 4px rgba(0, 0, 0, 0.08)`
- **Sombra de Interacción (`--shadow-interactive`):**
  - **Propósito:** Para indicar un estado de "elevación mayor" (ej: al pasar el ratón sobre una tarjeta) o para elementos que flotan (ej: modales).
  - **Valor CSS:** `0px 4px 8px rgba(0, 0, 0, 0.12)`

### **3.2. Bordes Redondeados (`border-radius`)**

    - **Valor CSS:** `50%` (para elementos perfectamente cuadrados/circulares, con `9999px` como fallback para compatibilidad)

Se definirán radios estándar para los bordes de los elementos, utilizando `rem` para asegurar que escalen proporcionalmente.

- **Radio Pequeño (`--radius-small`):**
  - **Propósito:** Para elementos interactivos menores como botones o campos de entrada, dando un toque de suavidad sin perder la estructura.
  - **Valor CSS:** `0.25rem` (equivalente a 4px si la base es 16px)
- **Radio Medio (`--radius-medium`):**
  - **Propósito:** Para suavizar las esquinas de bloques de contenido más grandes como tarjetas o secciones.
  - **Valor CSS:** `0.5rem` (equivalente a 8px si la base es 16px)
- **Radio Completo/Píldora (`--radius-full`):**
  - **Propósito:** Para elementos que son intencionalmente "cápsula" o "pastilla", como chips, tags o avatares circulares.
  - **Valor CSS:** `9999px` (o `50%` para elementos perfectamente cuadrados/circulares)

---

## 4. Espaciado y Distribución

Establecer principios generales de espaciado y alineación es crucial para la legibilidad, la jerarquía visual y la experiencia de usuario.

### **4.1. Sistema de Espaciado (La Cuadrícula de 8 Puntos)**

- Se utilizará una **cuadrícula de 8 puntos (8-point grid system)** como base para todo el espaciado (márgenes, paddings, gaps entre elementos, alturas, etc.).
- Esto significa que todos los valores de espaciado serán **múltiplos de `0.5rem`** (que equivale a 8px si el `font-size` base es 16px).
- **Propósito:** Asegurar una armonía visual, facilitar la consistencia en el diseño y simplificar el desarrollo responsivo al escalar todo proporcionalmente.
- **Ejemplos de valores de espaciado:**
  - `0.5rem` (8px)
  - `1rem` (16px)
  - `1.5rem` (24px)
  - `2rem` (32px)
  - `3rem` (48px)
  - `4rem` (64px)
- **Uso:** Aplicar estos valores usando propiedades CSS como `margin`, `padding`, `gap` (para Flexbox/Grid), `width`, `height`.

### **4.2. Alineación**

- **Texto Principal y Párrafos:** Siempre **alineado a la izquierda**. Esta es la forma más legible y natural para idiomas de izquierda a derecha.
- **Títulos:**
  - Generalmente **alineados a la izquierda**.
  - Pueden estar **centrados** solo en contextos muy específicos, como en secciones `hero` (portadas), elementos visualmente simétricos, o bloques de contenido muy cortos y con un propósito estético claro.
  - **Evitar:** El texto justificado. Siempre crea "ríos" de espacio en blanco irregulares que dificultan la lectura en la web.
- **Elementos en Componentes:** La alineación interna de los elementos dentro de un componente debe ser consistente (ej: todos los elementos de un botón centrados, todos los ítems de una tarjeta alineados a la izquierda).

### **4.3. Ritmo Vertical**

- Se refiere a la consistencia en el espaciado vertical entre bloques de texto y elementos.
- Se logrará manteniendo una `line-height` consistente para el cuerpo de texto (`1.6`) y asegurando que los márgenes verticales (`margin-top`, `margin-bottom`) de los elementos de bloque (párrafos, títulos, listas) sean múltiplos de la unidad base de espaciado (`rem`), creando un flujo vertical armonioso.

### **4.4. El Poder del Espacio en Blanco (White Space / Espacio Negativo)**

- El espacio en blanco es tan importante como el contenido mismo. No es "espacio muerto", sino un elemento de diseño activo.
- **Propósito:**
  - **Mejora la Legibilidad:** Permite que el ojo descanse y facilita la lectura del contenido.
  - **Reduce la Carga Cognitiva:** Evita abrumar al usuario con demasiada información junta.
  - **Crea Jerarquía y Enfoque:** Ayuda a agrupar elementos relacionados y a dirigir la atención del usuario a los puntos clave.
  - **Transmite Profesionalismo:** Un uso generoso y consciente del espacio en blanco es un sello distintivo de los diseños limpios, modernos y sofisticados.

---
