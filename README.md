# Portfolio Next.js

![Next.js](https://img.shields.io/badge/Next.js-15+-black?logo=nextdotjs)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Accessibility](https://img.shields.io/badge/Accessible-AA/AAA-important?logo=w3c)
![ESLint Flat + jsx-a11y](https://img.shields.io/badge/ESLint-flat%20config%20+%20jsx--a11y-purple?logo=eslint)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

## 📖 Descripción

Este proyecto es un **portfolio personal** que muestra mis habilidades y proyectos utilizando las últimas tecnologías web. Está diseñado para ser accesible, modular y fácil de mantener, siguiendo las mejores prácticas de desarrollo. Incluye un footer accesible y semántico, con enlaces internos y de contacto interactivos, año dinámico y diseño responsivo, alineado con el Design System y los criterios de accesibilidad.

## ✨ Características

- **Next.js 15+** con App Router
- **TypeScript** para tipado estricto
- **Tailwind CSS 4** y tokens de diseño personalizados (paleta, sombras, tooltips, modales, overlays, menús)
- **Guía de estilos y sistema de diseño** documentado en [`DESIGN_SYSTEM.md`], siempre alineada con la implementación
- **Accesibilidad avanzada**: contraste AAA, navegación por teclado, área mínima interactiva, soporte `prefers-reduced-motion`, semántica y roles correctos, componentes y tests revisados para cumplir WCAG y mejores prácticas a11y
- **Testing robusto y accesible** con Jest y React Testing Library: tests de navegación, componentes, casos condicionales y de accesibilidad (incluyendo visualización y accesibilidad de estrellas de puntuación, badges, roles y estructura semántica)
- **Linting avanzado** con ESLint flat config y `eslint-plugin-jsx-a11y` para accesibilidad en JSX
- **Estructura modular y escalable** (componentes compartidos en `src/shared/components`)
- **Internacionalización lista para ampliar**
- **Optimización para SEO y rendimiento**
- **Preparado para CI/CD**: integración recomendada de lint y tests en pipelines
- **Testing E2E y accesibilidad**: Integración con Playwright y axe-playwright para pruebas end-to-end y de accesibilidad, ejecutables en CI/CD.

---

## 📁 Estructura del Proyecto

```
portfolio-next/
├── DESIGN_SYSTEM.md         # Guía de estilos y sistema de diseño (actualizada)
├── src/
│   ├── app/                # App Router, layout, páginas y estilos globales
│   │   ├── globals.css     # Estilos globales y tokens de diseño (migrados a Tailwind)
│   │   └── components/     # Componentes principales (hero, tarjetas, experiencia, proyectos, etc.)
│   └── shared/             # Componentes y tipos compartidos (Navigation, Icons, mocks, types, etc.)
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

- Ejecuta todos los tests unitarios:
  ```bash
  npm run test
  ```
- Ejecuta los tests en modo secuencial (útil para debugging):
  ```bash
  npm run test:unit
  ```
- Cobertura:
  ```bash
  npm run test:coverage
  ```
- Ejecuta los tests E2E y de accesibilidad:

  ```bash
  npx playwright test
  ```

  (o vía CI/CD en GitHub Actions)

- Los tests cubren casos condicionales, ramas de renderizado y accesibilidad (incluyendo enlaces, iconos, badges, estrellas de puntuación, mocks y estructura semántica real de los componentes).
- Se han revisado y adaptado los tests para reflejar la estructura accesible y semántica de los componentes, especialmente en la visualización y accesibilidad de estrellas y badges.

---

## 🖌️ Sistema de Diseño y Accesibilidad

- Consulta `DESIGN_SYSTEM.md` para conocer la paleta de colores (actualizada, con verde de éxito accesible `#11602d`), tokens (incluyendo sombras, tooltips, modales, overlays, menús), reglas de accesibilidad, advertencias de uso, ejemplos y buenas prácticas.
- El sistema de diseño sigue recomendaciones de WebAIM, WCAG y NN/g.
- Todos los componentes cumplen contraste AA/AAA, área mínima interactiva y semántica adecuada.
- Los componentes clave (`SkillsExperienceShowCase`, `SkillsLegend`, `SkillsCard`, `ProficiencyBadge`, `StarRating`, `ContactForm`) han sido revisados para cumplir con el Design System, accesibilidad (a11y), semántica y buenas prácticas de testing.
- Las estrellas de puntuación y badges ahora son accesibles: la información relevante está en el grupo, no en cada estrella individual, y se usan roles y atributos ARIA correctos.
- El formulario de contacto es accesible, validado y mantiene los datos escritos ante errores.
- Los estilos globales y tokens están migrados a utilidades de Tailwind siempre que es posible.

---

### Variables de entorno necesarias

Para el envío de emails en producción y en CI/CD (Playwright), asegúrate de definir los siguientes secrets en GitHub Actions:

- `EMAIL_SENDER_API_KEY`
- `EMAIL_SENDER_FROM_EMAIL`
- `EMAIL_SENDER_TO_EMAIL`
- `NEXT_PUBLIC_BASE_URL`

Estos valores son requeridos tanto en el entorno local como en los jobs de CI/CD para el correcto funcionamiento del formulario de contacto y los tests E2E.

---

## 🛠️ Scripts útiles

- `npm run dev` — Desarrollo
- `npm run build` — Build de producción
- `npm run start` — Servidor de producción
- `npm run lint` — Linting con ESLint (flat config + jsx-a11y)
- `npm run test` — Testing unitario
- `npx playwright test` — Testing E2E y accesibilidad

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
