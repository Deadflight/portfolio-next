# Sistema de Diseño del Portfolio

Este documento detalla las decisiones clave de diseño visual y los componentes reutilizables utilizados en este portfolio web para asegurar coherencia y profesionalismo.

---

## 1. Paleta de Colores

Aquí se define la paleta de colores principal utilizada en el portfolio, junto con el rol y el propósito de cada color.

| Nombre Variable (ej.) | Código HEX | Rol Principal                           | Propósito / Uso                                                                                                                                                                                                                                  |
| :-------------------- | :--------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `background-main`     | `#F2E9E4`  | **Fondo Principal**                     | La base del lienzo Fondos de la página, fondos de tarjetas/secciones claras.                                                                                                                                                                     |
| `text-main`           | `#22223B`  | **Texto Principal / Fondo Oscuro**      | Máxima legibilidad. Texto de párrafos y títulos (en fondos claros), fondos de secciones oscuras (ej: footer).                                                                                                                                    |
| `primary-brand`       | `#4A4E69`  | **Color Primario**                      | Color de marca distintivo. Botones principales, enlaces activos, títulos destacados, elementos clave que definen tu identidad.                                                                                                                   |
| `secondary`           | `#C9ADA7`  | **Color Secundario / Fondo Sutil**      | Complemento armónico. **No usar para texto sobre fondo claro por bajo contraste.** Usar solo en fondos, bordes o elementos decorativos. Para botones secundarios, usar fondo blanco y borde `secondary` o `primary-brand` con texto `text-main`. |
| `accent`              | `#9A8C98`  | **Color de Acento Sutil / Interactivo** | Pequeños detalles interactivos o de diferenciación. **No usar para texto principal sobre fondo claro.** Úsalo solo en iconos, bordes o detalles gráficos.                                                                                        |
| `error-color`         | `#B91C1C`  | **Color de Error**                      | Indica errores en formularios o estados críticos. Utilizado para bordes, mensajes de error y otros elementos relacionados con errores. Cumple AAA sobre fondo claro.                                                                             |
| `success-color`       | `#15803D`  | **Color de Éxito**                      | Mensajes de confirmación, validaciones exitosas, indicadores de éxito. Cumple AAA sobre fondo claro.                                                                                                                                             |
| `warning-color`       | `#B45309`  | **Color de Advertencia**                | Mensajes de advertencia, alertas preventivas. Cumple AAA sobre fondo claro.                                                                                                                                                                      |
| `info-color`          | `#2563EB`  | **Color Informativo**                   | Mensajes neutrales, información adicional, estados informativos. Cumple AAA sobre fondo claro.                                                                                                                                                   |

**Notas Adicionales de Color:**

- La paleta debe de tener una estética sofisticada, sobria y profesional.
- Priorizar siempre la legibilidad. Se recomienda usar la herramienta WebAIM Contrast Checker para verificar el contraste entre texto y fondo.
- **Advertencia de contraste:** El color `secondary` y `accent` no cumplen el contraste mínimo recomendado para texto sobre fondo claro. No deben usarse para texto principal ni en botones con texto sobre fondo claro.
- Para botones secundarios, se recomienda usar texto `text-main` sobre fondo blanco y borde `secondary` o `primary-brand`, o bien oscurecer el color de fondo si se usa `secondary`.
- Para bordes de inputs y elementos interactivos, usar un gris más oscuro o `primary-brand` para asegurar visibilidad.
- El color de error, éxito, advertencia e informativo cumplen AAA sobre fondo claro. Utilízalos para mensajes y estados correspondientes.
- Ejemplo de uso correcto: texto de error en `error-color`, texto de éxito en `success-color`, etc. Nunca uses `secondary` o `accent` para texto principal.

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

### \*\*3.2. Bordes Redondeados (`border-radius`)`

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

## 5. Herramientas de Implementación

Este apartado detalla las herramientas y frameworks principales utilizados para la implementación de los estilos definidos en este sistema de diseño.

### **5.1. Framework CSS**

- **Tailwind CSS:**
  - **Propósito:** Se ha elegido Tailwind CSS como el framework principal para la implementación de los estilos. Su enfoque "utility-first" permite aplicar las directrices de diseño (colores, tipografía, espaciado, sombras, bordes) de manera directa y eficiente en el marcado HTML, promoviendo un desarrollo rápido y una alta consistencia visual.
  - **Ventajas Clave:**
    - **Desarrollo Rápido:** Permite construir interfaces rápidamente con clases predefinidas.
    - **Consistencia:** Facilita la aplicación uniforme de los tokens de diseño (colores, espaciado, etc.) definidos en este documento.
    - **Personalización:** Aunque es "utility-first", es altamente configurable, permitiendo extender o ajustar sus utilidades para que coincidan exactamente con la paleta y el sistema de espaciado aquí definidos.

---

## 6. Estilos de Botones

Este apartado detalla el estilo visual y el comportamiento de los botones principales en el portfolio, asegurando consistencia y una buena experiencia de usuario en todos los dispositivos.

### 6.1. Estilos Generales

- **Tipografía:**
  - **Fuente:** `Lato`.
  - **Peso:** `Regular (400)` o `Bold (700)` para énfasis.
  - **Tamaño:** `1rem` o `1.125rem` (ajustar según la jerarquía visual).
- **Espaciado:**
  - Padding interno basado en el sistema de 8 puntos (múltiplos de `0.5rem`).
- **Bordes Redondeados:**
  - `--radius-small` (`0.25rem`) o `--radius-medium` (`0.5rem`).
- **Sombras:**
  - `--shadow-subtle` para elevación ligera o `--shadow-interactive` para estados `hover`/`focus`.
- **Alineación:**
  - Texto centrado vertical y horizontalmente.

### 6.2. Estados de Botón

- **Primario:**
  - **Color de Fondo:** `primary-brand` (`#4A4E69`).
  - **Color de Texto:** Blanco o un color de alto contraste con `primary-brand`.
  - **Hover/Focus:** Oscurecer ligeramente el color de fondo. Usar `--shadow-interactive`.
- **Secundario:**
  - **Color de Fondo:** `secondary` (`#C9ADA7`) o fondo transparente con borde.
  - **Color de Texto:** `text-main` (`#22223B`).
  - **Hover/Focus:** Aclarar ligeramente el color de fondo o cambiar el color del borde. Usar `--shadow-subtle`.
- **Deshabilitado:**
  - **Color de Fondo:** Gris claro o versión transparente del color primario/secundario.
  - **Color de Texto:** Gris más oscuro que el fondo.
  - **Cursor:** `not-allowed`.
  - **Opacidad:** 50-60%.

### 6.3. Comportamiento (UX)

- **Feedback Visual:**
  - Proporcionar feedback claro en los estados `:hover`, `:focus` y `:active` (cambio de color, sombra, animación sutil).
- **Enfoque:**
  - Asegurar que los botones sean enfocables con el teclado (usando `outline` o `box-shadow` en `:focus`).
- **Tamaño:**
  - Botones suficientemente grandes para ser fácilmente clickeables/tappeables.
- **Texto:**
  - Texto claro, conciso y orientado a la acción (ej: "Enviar", "Guardar", "Leer más").
- **Consistencia:**
  - Mantener la consistencia en el estilo y comportamiento en todo el portfolio.

### 6.4. Tamaños y Responsividad

- **Adaptación Proporcional:**
  - Los tamaños de los botones se adaptan proporcionalmente gracias al uso de la unidad `rem` y el sistema de 8 puntos.
  - El `padding` se define en `rem` (ej. `py-0.5rem px-1rem`), lo que permite que el tamaño del botón se ajuste automáticamente según el `font-size` base del `html` en las diferentes `media queries`.
- **Tamaño Mínimo en Móviles:**
  - Asegurar un tamaño mínimo de área táctil de 48x48 píxeles (o `3rem` si la base es `16px`) para una buena usabilidad en dispositivos táctiles.
- **Diferentes Tamaños Contextuales:**
  - Definir diferentes tamaños de botones (pequeño, mediano, grande) según la jerarquía de las acciones:
    - **Pequeño:** Para acciones secundarias o dentro de componentes compactos.
      - Ejemplo: `padding: 0.25rem 0.75rem;`
    - **Mediano (Estándar):** El tamaño por defecto para la mayoría de las acciones.
      - Ejemplo: `padding: 0.5rem 1rem;`
    - **Grande:** Para las llamadas a la acción (CTA) más importantes.
      - Ejemplo: `padding: 0.75rem 1.5rem;`
  - El `font-size` del texto del botón también se define en `rem` (ej. `1rem`, `1.125rem`, `1.25rem`) para un escalado consistente.

### 6.5. Justificación (Razonamiento)

- **Estilos Generales:**
  - Se basan en los estilos definidos en las secciones de "Tipografía", "Espaciado y Distribución", y "Efectos Visuales y Geometría" para mantener la coherencia visual y la armonía en todo el diseño.
- **Estados de Botón:**
  - Los colores primarios y secundarios se basan en la paleta de colores definida en el sistema de diseño, asegurando la identidad de marca y la jerarquía visual.
  - Los estados `hover`, `focus` y `disabled` proporcionan feedback visual importante para la usabilidad y la accesibilidad.
- **Comportamiento (UX):**
  - Sigue las mejores prácticas de UX para asegurar que los botones sean intuitivos, accesibles y fáciles de usar.
- **Tamaños y Responsividad:**
  - El uso de `rem` y el sistema de 8 puntos garantizan que los botones se adapten a diferentes tamaños de pantalla de forma fluida.
  - Se considera el tamaño mínimo táctil para dispositivos móviles.
  - Se definen diferentes tamaños contextuales para mantener la jerarquía visual y la claridad de las acciones.

---

## 7. Estilos de Enlaces

Este apartado define el estilo visual y el comportamiento de los enlaces (links) dentro del portfolio, asegurando que sean fácilmente identificables, accesibles y consistentes.

### 7.1. Tipos de Enlaces

Se diferenciarán principalmente dos tipos de enlaces según su contexto y función:

1.  **Enlaces de Texto (Inline Links):** Enlaces que aparecen dentro del cuerpo de un párrafo o en listas, y que dirigen a otra página o sección.
2.  **Enlaces en Componentes (Component Links):** Enlaces que forman parte de elementos interactivos más grandes, como tarjetas, elementos de navegación (navbar), o botones, y cuyo estilo puede estar dictado por el componente padre. Este documento se enfoca principalmente en los **Enlaces de Texto**.

### 7.2. Estilos Visuales de Enlaces de Texto

Los enlaces de texto deben ser claramente distinguibles del texto normal, pero manteniendo la armonía con la paleta de colores.

- **Estado Normal (`a`):**
  - **Color:** `primary-brand` (`#4A4E69`).
    - **Justificación:** Utilizar el color de marca primario asegura que los enlaces sean fácilmente reconocibles como elementos interactivos clave, manteniendo la coherencia con los elementos principales del diseño.
  - **Subrayado:** `text-decoration: underline;`
    - **Justificación:** El subrayado es el indicador más universal y claro de que un texto es un enlace. Mejora la **descubribilidad** y la **accesibilidad**, especialmente para usuarios con dificultades en la percepción del color.
  - **Tipografía:** Hereda la fuente del texto circundante (`Lato`) y su `font-size`.
- **Estado al Pasar el Cursor (`a:hover`):**
  - **Color:** Oscurecer ligeramente `primary-brand` o usar `text-main` para un contraste fuerte. (Ej. una variante más oscura de `#4A4E69` o directamente `#22223B`).
    - **Justificación:** Un cambio de color sutil proporciona **feedback visual** inmediato de que el elemento es interactivo y está siendo apuntado por el usuario, sin ser demasiado disruptivo.
  - **Subrayado:** Mantener el subrayado o hacerlo más prominente (ej. `text-decoration: underline; text-decoration-thickness: 2px;` o cambiar a un subrayado animado si se implementa).
    - **Justificación:** Refuerza la interactividad y la respuesta al usuario.
  - **Cursor:** `cursor: pointer;`
    - **Justificación:** Es la convención estándar del navegador para los enlaces y mejora la **intuitividad**.
- **Estado de Enfoque (`a:focus`):**
  - **Comportamiento:** Similar a `hover` (cambio de color, subrayado), pero con un claro indicador de enfoque.
  - **Indicador de Enfoque:** `outline: 2px solid --accent;` (o un `box-shadow` discreto con `accent` o `primary-brand`).
    - **Justificación:** **Crucial para la accesibilidad**. Permite a los usuarios que navegan con teclado saber qué enlace está seleccionado y listo para ser activado. El color `accent` o `primary-brand` asegura que sea visible y coherente con la paleta.
- **Estado Activo (`a:active`):**
  - **Color:** Un color ligeramente más oscuro o diferente a `hover` para indicar la acción de "presionar". (Ej. una variante aún más oscura de `primary-brand`).
    - **Justificación:** Proporciona un feedback visual instantáneo cuando el usuario está haciendo clic, confirmando la interacción.
- **Estado Visitado (`a:visited`):**
  - **Color:** Se recomienda mantener el mismo color que el estado `normal` (`primary-brand`).
    - **Justificación:** En un portfolio, la coherencia de la marca y la estética suelen ser prioritarias sobre la indicación de "visitado". Diferenciar visualmente los enlaces visitados a menudo no aporta un valor significativo en este contexto y puede introducir complejidad visual innecesaria. Sin embargo, si la experiencia de usuario se beneficiara de saber qué proyectos/páginas ya ha visto el usuario, se podría considerar un color sutilmente diferente (ej. una variante ligeramente más clara de `primary-brand`).

### 7.3. Principios de UX/UI para Enlaces

- **Visibilidad y Descubribilidad:** Los enlaces deben ser claramente identificables como tales, no solo por el color sino también por el subrayado o un indicador visual claro.
- **Feedback Visual:** Proveer feedback en `:hover`, `:focus` y `:active` es fundamental para que el usuario sepa que el elemento es interactivo y responde a su acción.
- **Accesibilidad:** Asegurar que los enlaces sean navegables con teclado (`:focus` visible) y que el contraste de color sea suficiente para la legibilidad (WebAIM Contrast Checker).
- **Contexto:** Evitar el uso excesivo de enlaces en un párrafo si no son esenciales, ya que puede dificultar la lectura.

---

## 8. Estilos de Inputs de Formularios

Este apartado define el estilo visual y el comportamiento de los campos de entrada de formularios (inputs como `text`, `email`, `password`, `number`, `textarea`, `select`), garantizando usabilidad, claridad y coherencia en toda la interfaz.

### 8.1. Elementos Base de un Input

- **Etiqueta (Label):**
  - **Estilo:** Texto normal (`Lato`, `text-main`), `font-size: 0.875rem` (para etiquetas más compactas) o `1rem` (para etiquetas más prominentes).
  - **Posición:** Siempre visible y asociada al input (usando `for` en la etiqueta y `id` en el input). Preferiblemente encima del campo para evitar que desaparezca o se superponga con el valor del campo.
  - **Justificación:** Las etiquetas son cruciales para la **accesibilidad** y la **claridad** del formulario. Ayudan a los usuarios a entender qué información se espera en cada campo.
- **Campo de Entrada (Input Field):** El área interactiva donde el usuario introduce datos.

### 8.2. Estilos Visuales Generales

- **Fondo:** `background-main` o blanco puro (`#FFFFFF`).
- **Color de Texto:** `text-main` (`#22223B`).
- **Tipografía:** Hereda la fuente del cuerpo de texto (`Lato`).
- **Bordes Redondeados:** `--radius-small` (`0.25rem`).
  - **Justificación:** Mantiene la suavidad y modernidad consistente con botones y tarjetas.
- **Padding Interno:** Consistente, basado en el sistema de 8 puntos.
  - **Recomendado:** `padding: 0.5rem 0.75rem;` (8px vertical, 12px horizontal).
  - **Justificación:** Asegura un área de clic/táctil cómoda y espacio suficiente para la legibilidad del texto.
- **Ancho:**
  - **Por defecto:** `width: 100%;` para ocupar todo el espacio disponible en su contenedor.
  - **Justificación:** Maximiza el espacio para la entrada de datos y facilita la responsividad.
- **Altura:** `min-height` para asegurar un tamaño mínimo clickeable/táctil (ej. 40px o `2.5rem`).

### 8.3. Estados de los Inputs

Es crucial que los inputs proporcionen feedback visual claro sobre su estado.

- **Estado Normal (`input`):**
  - **Borde:** `1px solid secondary;` (o un gris neutro claro, ej. `#D1D5DB`).
    - **Justificación:** Discreto pero visible, indicando el área de entrada.
  - **Placeholder (texto guía):** Un gris más claro que `text-main` (ej. `rgba(34, 34, 59, 0.5)`).
    - **Justificación:** Guía al usuario sobre el formato o tipo de información esperada, pero debe desaparecer al escribir.
- **Estado al Pasar el Cursor (`input:hover`):**
  - **Borde:** `1px solid primary-brand;` o ligeramente más oscuro que el normal.
    - **Justificación:** Indica interactividad y que el campo está listo para la entrada.
- **Estado de Enfoque (`input:focus`):**
  - **Borde:** `2px solid primary-brand;` (o `accent`).
    - **Justificación:** **Crítico para la accesibilidad y usabilidad.** Proporciona un feedback visual fuerte de que el campo está activo y listo para recibir la entrada del teclado. Debe ser muy visible.
  - **Sombra (Opcional):** `box-shadow: 0 0 0 3px var(--primary-brand-ring);` (un ring suave usando `var(--primary-brand)`).
  * **Ejemplo de Token de Diseño:**
    ```css
    --focus-ring: 0 0 0 3px rgba(74, 78, 105, 0.5); /* Usando el color de marca primario con transparencia */
    ```
  * **Ejemplo de Uso:**
    ```css
    input:focus {
      border: 2px solid var(--primary-brand);
      box-shadow: var(--focus-ring);
    }
    ```
  * **Justificación:** Esto asegura un indicador de enfoque claro y accesible, cumpliendo con los requisitos de accesibilidad.
    - **Justificación:** El `outline` por defecto del navegador puede ser inconsistente o poco estético. Se elimina si se provee una alternativa de enfoque clara.
- **Estado Deshabilitado (`input:disabled`):**
  - **Fondo:** Un gris muy claro (ej. `#F8F8F8`) o `background-main`.
  - **Borde:** `1px solid secondary;` (o un gris más oscuro que el fondo deshabilitado).
  - **Color de Texto:** Un gris más claro que `text-main` (ej. `#A1A1A1`).
  - **Cursor:** `cursor: not-allowed;`
  - **Justificación:** Indica claramente que el campo no es editable o interactivo en ese momento, previniendo intentos fallidos del usuario.
- **Estado de Error (`input.is-error` o `input[aria-invalid="true"]`):**
  - **Borde:** `2px solid var(--error-color);` (Usa el color de error definido en la paleta de diseño).
  - **Color de Texto:** `text-main`.
  - **Mensaje de Error:** Texto de error debajo del input en el color de error.
  - **Justificación:** Un indicador visual claro e inmediato de que hay un problema con la entrada. **Es vital para la usabilidad**, guiando al usuario para corregir el error.

### 8.4. Tipos de Input Específicos

- **`textarea`:** Mismas propiedades generales, pero con `resize: vertical;` (o `none;` si no se permite redimensionar).

**Ejemplo de HTML para `textarea` y `select` con estilos recomendados:**

- **`select`:** Mismas propiedades generales, pero asegurando un icono de flecha consistente para indicar que es un desplegable.

### 8.5. Principios de UX/UI para Formularios

- **Claridad:** Cada campo debe ser claro en su propósito (etiquetas explícitas, placeholders útiles).
- **Feedback Inmediato:** Los estados (hover, focus, error) deben ser muy claros.
- **Facilidad de Entrada:** Padding suficiente, tamaño adecuado, `type` de input correcto para teclados móviles.
- **Accesibilidad:** Asegurar la asociación `label-input`, contraste de color, estados de enfoque claros y mensajes de error accesibles (`aria-live` si es necesario).
- **Consistencia:** Mantener los mismos estilos para todos los inputs en todo el portfolio.

---

## 9. Estilos de Tarjetas (Cards)
Las tarjetas son contenedores reutilizables para mostrar proyectos, artículos u otra información en bloques visuales. Proporcionan una forma efectiva de agrupar contenido relacionado y mejorar la experiencia del usuario al navegar por el portfolio.
### 9.1. Propiedades Clave
- **Fondo:** `background-main` (`#F2E9E4`).
- **Texto:** `text-main` (`#22223B`).
- **Sombra:** `--shadow-subtle` para la base y `--shadow-interactive` al pasar el cursor.
- **Bordes:** `--radius-medium` (`0.5rem`).
- **Tipografía:** Títulos con `Poppins`, cuerpo con `Lato`.
- **Interacción:** Utilizar `transform`, `hover`, y `focus-visible` para mejorar la accesibilidad.
- **Espaciado:** Basado en el sistema de 8 puntos (padding, gap, margin).
- **Ejemplo de uso (Tailwind CSS):**
```html
<div class="bg-[#F2E9E4] text-[#22223B] rounded-md shadow-sm p-6 max-w-md hover:shadow-md transition-shadow transform hover:scale-105">
  <h3 class="text-xl font-semibold mb-2 font-poppins">Proyecto Destacado</h3>
  <p class="text-base font-lato mb-4">Descripción corta del proyecto, con lo más relevante para captar el interés del usuario.</p>
  <a href="/proyecto" class="inline-block text-[#4A4E69] underline hover:text-[#22223B] font-bold">Ver más</a>
</div>
```
### 9.2. Variaciones Posibles
- **Con Imagen:** Imagen en la parte superior (usando `rounded-t-md`), contenido en bloque debajo.
- **Compacta:** Menor padding, tipografía más pequeña, útil para grids con muchas tarjetas.
- **Clickeable Completa:** Usar `cursor-pointer` y `hover:bg-[#EAD9D0]`, sin botón interno.
- **Destacada:** Fondo más llamativo (usando `secondary` o `accent`) con suficiente contraste o bordes destacados.
### 9.3. Responsividad de Tarjetas (Mobile-First)
Para asegurar una experiencia óptima en todos los dispositivos, las tarjetas están diseñadas siguiendo un enfoque mobile-first y adaptándose mediante media queries y utilidades responsivas de Tailwind.
- **Adaptación según tamaño de pantalla:**
  - **Móviles:** Tarjetas apiladas en una sola columna. Usar `w-full` y `max-w-sm`.
  - **Tabletas:** Distribución en dos columnas (`grid-cols-2`) con un `gap` adecuado.
  - **Escritorio:** Grid de 3 o más columnas (`grid-cols-3`, `grid-cols-4`) según el ancho disponible.
### 9.4. Principios UX/UI Aplicados
- **Consistencia Visual:** Se mantiene el uso de tokens (colores, sombras, bordes, espaciado) sin importar el tamaño de pantalla.
- **Legibilidad:** Tipografía escalada con `rem`. Ajustes opcionales mediante media queries (ej. `font-size`, `padding`).
- **Tamaño Táctil Mínimo:** Se respeta un mínimo de 48x48px para áreas clickeables.
- **Enfoque Visual:** Se prioriza mostrar primero el contenido más importante (título, imagen, acción).
- **Evitar Sobrecarga Cognitiva:** En pantallas pequeñas, se recomienda simplificar contenido y distribuir el espacio cuidadosamente.
### 9.5. Clases Tailwind Sugeridas (Semánticamente Documentadas)
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Tarjetas aquí -->
</div>
```
### 9.6. Notas Adicionales
- Las tarjetas deben mantener su estructura y estilo base (fondo, bordes redondeados, sombra, padding) sin importar el tamaño.
- Se recomienda usar `max-w` y `auto-layout` para que las tarjetas no rompan la cuadrícula ni el diseño en dispositivos pequeños.
