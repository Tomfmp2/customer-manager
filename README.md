# TrendGear Admin Panel

Panel de administración profesional para gestión de clientes de TrendGear.

## 📁 Estructura del Proyecto

```
admin v0/
├── index.html                 # Punto de entrada HTML
├── package.json              # Configuración del proyecto
├── src/                      # Código fuente
│   ├── css/                  # Estilos modulares
│   │   ├── main.css         # Importa todos los módulos CSS
│   │   ├── variables.css    # Variables CSS (colores, espaciado, etc.)
│   │   ├── base.css         # Reset y estilos base
│   │   ├── layout.css       # Sidebar, header, contenedor principal
│   │   ├── components.css   # Botones, cards, modales, toast, badges
│   │   └── pages.css        # Estilos específicos de páginas
│   ├── js/                   # JavaScript modular (ES Modules)
│   │   ├── main.js          # Punto de entrada principal
│   │   ├── config.js        # Configuración (API URL)
│   │   ├── state.js         # Gestión de estado global
│   │   ├── utils.js         # Funciones utilitarias
│   │   ├── api.js           # Servicios de API
│   │   ├── components/      # Componentes UI
│   │   │   ├── sidebar.js
│   │   │   ├── modal.js
│   │   │   ├── deleteModal.js
│   │   │   ├── toast.js
│   │   │   └── filters.js
│   │   └── pages/           # Lógica de páginas
│   │       ├── navigation.js
│   │       ├── dashboard.js
│   │       └── clients.js
│   └── assets/              # Recursos estáticos (imágenes, iconos)
├── app.js                    # [LEGACY] Archivo original monolítico
└── styles.css               # [LEGACY] Archivo original monolítico
```

## 🚀 Cómo Ejecutar

### Requisito Importante
Este proyecto utiliza **ES Modules** (`import`/`export`), por lo que **debe ejecutarse en un servidor local** debido a las políticas CORS del navegador.

### Opción 1: Live Server (VS Code)
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Luego abre: http://localhost:8000
```

### Opción 3: Node.js HTTP Server
```bash
npx http-server -p 8000
```

## 🎨 Características

- **Diseño Moderno**: UI oscura con gradientes y animaciones
- **Responsive**: Adaptable a móviles, tablets y escritorio
- **Modular**: Código organizado en módulos ES6
- **CRUD Completo**: Crear, leer, actualizar y eliminar clientes
- **Filtros Avanzados**: Búsqueda y filtrado por categoría y método de pago
- **Exportación**: Exportar datos a CSV
- **API REST**: Integración con MockAPI

## 📦 Tecnologías

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Módulos, async/await, arrow functions
- **API**: MockAPI para backend simulado

## 🔧 Configuración

Para cambiar la URL de la API, edita `src/js/config.js`:

```javascript
export const API_URL = "tu-nueva-url-aqui";
```

## 📝 Notas de Desarrollo

- Los archivos `app.js` y `styles.css` en la raíz son **legacy** y pueden eliminarse
- El proyecto usa ES Modules nativos (no requiere bundler)
- Todos los estilos usan variables CSS para fácil personalización
- El estado global se gestiona en `src/js/state.js`

## 🎯 Próximos Pasos

- [ ] Eliminar archivos legacy (`app.js`, `styles.css`)
- [ ] Agregar tests unitarios
- [ ] Implementar lazy loading de módulos
- [ ] Agregar TypeScript para type safety
- [ ] Implementar service workers para PWA
