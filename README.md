# Sistema de Gestión de Repuestos

Aplicación web full-stack diseñada para la gestión y consulta de un inventario de repuestos de vehículos. Permite a los usuarios autenticados realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre los repuestos, así como consultar el inventario por diferentes criterios como modelo o fabricante.

## ✨ Características

- **Autenticación de Usuarios:** Sistema de login seguro basado en JSON Web Tokens (JWT).
- **Gestión de Repuestos:** Funcionalidad completa para añadir, modificar y eliminar repuestos del inventario.
- **Búsqueda y Filtrado:** Consultas dinámicas para encontrar repuestos por modelo de vehículo o por fabricante.
- **Dashboard Intuitivo:** Una interfaz de usuario clara y moderna para una fácil navegación y gestión.
- **API RESTful:** Backend robusto que expone endpoints claros y bien definidos para la manipulación de datos.

## 🛠️ Tecnologías Utilizadas

El proyecto está estructurado como un monorepo con un frontend y un backend desacoplados.

### Backend

- **[Node.js](https://nodejs.org/)**: Entorno de ejecución para JavaScript.
- **[Express](https://expressjs.com/)**: Framework web para la creación de la API REST.
- **[JSON Web Token (JWT)](https://jwt.io/)**: Para la generación de tokens de acceso y proteger las rutas.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)**: Para el hasheo seguro de contraseñas.
- **[Zod](https://zod.dev/)**: Para la validación de esquemas y datos de entrada.
- **[db-local](https://www.npmjs.com/package/db-local)**: Base de datos local basada en archivos JSON, ideal para un desarrollo rápido y sin configuraciones complejas.
- **[CORS](https://www.npmjs.com/package/cors)**: Para habilitar el intercambio de recursos entre orígenes distintos (frontend y backend).
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Para la gestión de variables de entorno.

### Frontend

- **[React](https://react.dev/)**: Biblioteca para construir interfaces de usuario.
- **[Vite](https://vitejs.dev/)**: Herramienta de desarrollo y empaquetado extremadamente rápida.
- **[React Router](https://reactrouter.com/)**: Para la gestión de rutas en el lado del cliente.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para realizar peticiones a la API del backend.
- **[React Hook Form](https://react-hook-form.com/)**: Para la gestión de formularios de manera eficiente y con validaciones.
- **[js-cookie](https://github.com/js-cookie/js-cookie)**: Para manejar las cookies del navegador, útil para almacenar el token de autenticación.

## 🚀 Puesta en Marcha

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

- Tener instalado [Node.js](https://nodejs.org/en/) (v18 o superior).
- Tener instalado el gestor de paquetes [pnpm](https://pnpm.io/installation).

### Instalación

1. Clona el repositorio en tu máquina local.
2. Navega a la raíz del proyecto.
3. Instala las dependencias con `pnpm install`.
   ```bash
   pnpm install
   ```
4. Instala todas las dependencias (frontend y backend) con un solo comando:
   ```bash
   pnpm run install:all
   ```

### Ejecución

Desde la raíz del proyecto, ejecuta el siguiente comando para iniciar tanto el servidor del backend como la aplicación de frontend simultáneamente.

```bash
pnpm run start:all
```

- El **backend** se ejecutará en `http://localhost:4000`.
- El **frontend** estará disponible en `http://localhost:5173`.

¡Y listo! Ahora puedes abrir tu navegador y acceder a la aplicación.

## 📂 Estructura del Proyecto

```
inventario-repuestos/
├── backend/         # Contiene el código de la API REST (Node.js y Express)
│   ├── package.json
│   ├── .env.example # Archivo de configuración de entorno
│   ├── src/

│   └── index.js
├── frontend/        # Contiene el código de la aplicación cliente (React)
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md        # Este archivo
```

NOTA: Debes crear un archivo .env en el backend (backend/.env) en donde tendras tu SECRET_KEY para la encriptacion de los JWT, sigue la estructura de .env.example

### Funcionamiento de la API

A continuación se detallan los endpoints disponibles en la API.

#### Autenticación

##### `POST /api/auth/register`

Permite registrar un nuevo usuario en el sistema.

**Request Body:**

```json
{
  "username": "nombredeusuario",
  "password": "unacontraseñasegura"
}
```

- `username` (string, requerido): Debe tener al menos 3 caracteres.
- `password` (string, requerido): Debe tener al menos 6 caracteres.

**Respuesta (Éxito):**

Devuelve un objeto con los datos del usuario creado y establece una cookie `token` para la sesión.

**Respuesta (Error):**

Si los datos son inválidos o el usuario ya existe, devolverá un error 400 con un mensaje.
