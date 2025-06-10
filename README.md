# Portfolio Next.js

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Accessibility](https://img.shields.io/badge/Accessible-AA/AAA-important?logo=w3c)
![ESLint Flat + jsx-a11y](https://img.shields.io/badge/ESLint-flat%20config%20+%20jsx--a11y-purple?logo=eslint)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

Portfolio personal construido con Next.js, Tailwind CSS, TypeScript y un sistema de diseño propio enfocado en accesibilidad, buenas prácticas y escalabilidad.

---

## ✨ Características

- **Next.js 15+** con App Router
- **TypeScript** para tipado estricto
- **Tailwind CSS 4** y tokens de diseño personalizados (paleta, sombras, tooltips, modales, overlays, menús)
- **Guía de estilos y sistema de diseño** documentado (`DESIGN_SYSTEM.md`), con advertencias de uso y ejemplos
- **Accesibilidad**: contraste AAA, navegación por teclado, área mínima interactiva, soporte `prefers-reduced-motion`, semántica y roles correctos
- **Testing robusto y accesible** con Jest y React Testing Library (tests de navegación mejorados para evitar duplicidad de enlaces)
- **Linting avanzado** con ESLint flat config y `eslint-plugin-jsx-a11y` para accesibilidad en JSX
- **Estructura modular y escalable** (componentes compartidos en `src/shared/components`)
- **Internacionalización lista para ampliar**
- **Optimización para SEO y rendimiento**
- **Preparado para CI/CD**: integración recomendada de lint y tests en pipelines

---

## 📁 Estructura del Proyecto

```
portfolio-next/
├── DESIGN_SYSTEM.md         # Guía de estilos y sistema de diseño
├── src/
│   ├── app/                # App Router, layout, páginas y estilos globales
│   │   ├── globals.css     # Estilos globales y tokens de diseño (migrados a Tailwind)
│   │   └── components/     # Componentes principales (hero, tarjetas, etc.)
│   └── shared/             # Componentes y tipos compartidos (Navigation, Icons, etc.)
├── public/                 # Recursos estáticos (imágenes, íconos, CV)
├── jest.config.ts          # Configuración de testing
├── eslint.config.mjs       # Configuración ESLint flat + jsx-a11y
├── tsconfig.json           # Configuración de TypeScript
├── tailwind.config.js      # Configuración de Tailwind CSS y tokens
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

---

## 🚀 Instalación y Uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/Deadflight/portfolio-next.git
   cd portfolio-next
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   # o
   yarn install
   ```
3. **Inicia el entorno de desarrollo:**
   ```bash
   npm run dev
   # o
   yarn dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🧪 Testing

- Ejecuta todos los tests:
  ```bash
  npm run test
  ```
- Cobertura:
  ```bash
  npm run test:coverage
  ```
- Los tests de navegación usan selectores específicos y `within` para evitar errores por enlaces duplicados (desktop/mobile).

---

## 🖌️ Sistema de Diseño y Accesibilidad

- Consulta `DESIGN_SYSTEM.md` para conocer la paleta de colores, tokens (incluyendo sombras, tooltips, modales, overlays, menús), reglas de accesibilidad, advertencias de uso, ejemplos y buenas prácticas.
- El sistema de diseño sigue recomendaciones de WebAIM, WCAG y NN/g.
- Todos los componentes cumplen contraste AA/AAA, área mínima interactiva y semántica adecuada.
- Los estilos globales y tokens están migrados a utilidades de Tailwind siempre que es posible.

---

## 🛠️ Scripts útiles

- `npm run dev` — Desarrollo
- `npm run build` — Build de producción
- `npm run start` — Servidor de producción
- `npm run lint` — Linting con ESLint (flat config + jsx-a11y)
- `npm run test` — Testing unitario

---

## 🌐 Despliegue

Recomendado en [Vercel](https://vercel.com/) o cualquier plataforma compatible con Next.js.

---

## 🤝 Contribución

¡Contribuciones, sugerencias y reportes de bugs son bienvenidos! Abre un issue o pull request.

---

## 📄 Licencia

MIT © 2025 Carlos Correa

---

## 📬 Contacto

- [LinkedIn](https://www.linkedin.com/in/carloscorreamillan)
- [Email](mailto:correamillancarlos@gmail.com)

---

## 🙏 Inspiración y recursos

- [Next.js Boilerplate](https://github.com/ixartz/Next-js-Boilerplate)
- [leerob.io](https://github.com/leerob/leerob.io)
- [skateshop](https://github.com/sadmann7/skateshop)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WCAG Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)

---

> Hecho con ❤️ y atención al detalle para un portfolio accesible, moderno y profesional.
