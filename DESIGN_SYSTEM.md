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
