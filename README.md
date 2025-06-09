# TypeScript Sequelize API

Una API RESTful construida con TypeScript, Express, y Sequelize, implementando patrones de diseño y principios SOLID.

## Características

- 🚀 TypeScript para tipado estático
- 📦 Sequelize ORM con PostgreSQL
- 🎯 Arquitectura por capas (Repositorio, Servicio, Controlador)
- 💉 Inyección de dependencias
- 🔐 Manejo seguro de contraseñas con bcrypt
- 🎨 Clean Architecture
- ✨ SOLID principles

## Estructura del Proyecto

```
src/
├── db/             # Configuración de la base de datos
├── interfaces/     # Interfaces y tipos
├── models/         # Modelos de Sequelize
├── repositories/   # Capa de acceso a datos
├── routes/         # Rutas de la API
├── services/       # Lógica de negocio
└── server.ts       # Punto de entrada
```

## Requisitos Previos

- Node.js (v14 o superior)
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone 
cd practice_typescript_sequelize
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales de base de datos
```

4. Iniciar el servidor:
```bash
npm run dev
```

## Endpoints de la API

### Usuarios

#### GET /api/users
- Obtiene todos los usuarios
- Respuesta: Array de usuarios

#### GET /api/users/:id
- Obtiene un usuario por ID
- Respuesta: Usuario individual

#### POST /api/users
- Crea un nuevo usuario
- Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "isActive": boolean
}
```

#### PUT /api/users/:id
- Actualiza un usuario existente
- Body: Campos a actualizar (todos opcionales)
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "isActive": boolean
}
```

#### DELETE /api/users/:id
- Elimina un usuario
- Respuesta: 204 No Content

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo
- `npm run build`: Compila el proyecto
- `npm start`: Inicia el servidor en modo producción
- `npm run lint`: Ejecuta el linter
- `npm test`: Ejecuta las pruebas

## Características de Seguridad

- Contraseñas hasheadas con bcrypt
- Exclusión automática de contraseñas en respuestas API
- Validación de datos de entrada
- Manejo de errores consistente

## Patrones de Diseño Implementados

1. **Repository Pattern**
   - Abstracción de la capa de datos
   - Interfaz consistente para operaciones CRUD

2. **Dependency Injection**
   - Acoplamiento reducido
   - Facilita las pruebas unitarias

3. **Service Layer**
   - Encapsula la lógica de negocio
   - Maneja la validación y transformación de datos


