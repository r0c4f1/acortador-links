# Acortador de Links

Este es un sistema de acortador de URLs desarrollado con **Node.js, Express, TypeScript y PostgreSQL**. Permite convertir URLs largas en enlaces cortos, gestionar el historial de enlaces creados y contabilizar la cantidad de clics que recibe cada enlace corto.

## 🚀 Características principales
- Creación de enlaces cortos únicos utilizando `nanoid`.
- Redirección automática de enlaces cortos a su URL original.
- Contador de clics para cada enlace.
- API RESTful para gestionar la creación y visualización del historial.
- Base de datos relacional (PostgreSQL) para persistencia de datos.

## 🛠 Tecnologías utilizadas
- **Backend:** Node.js, Express, TypeScript.
- **Base de Datos:** PostgreSQL (con la librería `pg`).
- **Generación de códigos:** `nanoid`.
- **Gestor de paquetes:** `pnpm` (versión 10.6.5).

## 📋 Requisitos previos
Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`).
- [PostgreSQL](https://www.postgresql.org/) corriendo en tu entorno local o remoto.

## ⚙️ Instalación y Configuración

1. **Instalar las dependencias**
   Abre una terminal en el directorio del proyecto y ejecuta:
   ```bash
   pnpm install
   ```

2. **Configurar la base de datos**
   El proyecto incluye un archivo `init.sql` con el esquema necesario. Ejecuta este script en tu servidor PostgreSQL para crear la base de datos y la tabla de enlaces:
   ```bash
   psql -U tu_usuario -f init.sql
   ```
   *(Esto creará una base de datos llamada `acortador`, la tabla `enlaces` y sus índices).*

3. **Configurar variables de entorno**
   Crea o edita el archivo `.env` en la raíz del proyecto con el siguiente contenido, ajustando la URL de la base de datos con tus credenciales:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/acortador
   ```

## ▶️ Ejecución del proyecto

### Modo Desarrollo
Para ejecutar el servidor con recarga automática (hot-reload) durante el desarrollo:
```bash
pnpm run dev
```

### Modo Producción
Para compilar el código TypeScript a JavaScript y ejecutar el servidor:
```bash
pnpm run build
pnpm run start
```
El servidor estará disponible por defecto en `http://localhost:3000`.

## 🌐 Endpoints de la API

### 1. Crear un enlace corto
- **Ruta:** `POST /api/enlaces`
- **Cuerpo de la petición (JSON):**
  ```json
  {
    "url": "https://www.ejemplo.com/una-url-muy-larga"
  }
  ```
- **Respuesta exitosa (201 Created):**
  ```json
  {
    "id": 1,
    "url_original": "https://www.ejemplo.com/una-url-muy-larga",
    "codigo_corto": "aB3dE5",
    "url_corta": "http://localhost:3000/aB3dE5",
    "clicks": 0,
    "creado_en": "2023-10-25T12:00:00.000Z"
  }
  ```

### 2. Obtener el historial de enlaces
- **Ruta:** `GET /api/enlaces`
- **Descripción:** Devuelve un arreglo con todos los enlaces cortos generados en la base de datos.
- **Respuesta exitosa (200 OK):**
  ```json
  [
    {
      "id": 1,
      "url_original": "https://www.ejemplo.com/...",
      "codigo_corto": "aB3dE5",
      "clicks": 5,
      "creado_en": "2023-10-25T12:00:00.000Z"
    }
  ]
  ```

### 3. Redireccionar al enlace original
- **Ruta:** `GET /:codigo` (ej. `GET /aB3dE5`)
- **Descripción:** Busca el código en la base de datos, incrementa su contador de clics y redirige (HTTP 301) al usuario a la `url_original`.
# acortador-links
