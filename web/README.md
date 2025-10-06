# Portal de Contactos - Frontend React

Aplicación React para gestionar contactos con operaciones CRUD e integración con Hazelcast para caché distribuido.

## ✨ Características

- ✅ **CRUD completo de contactos** - Crear, leer, actualizar y eliminar contactos
- ✅ **Visualización de estadísticas de caché** - Monitoreo en tiempo real del caché de Hazelcast
- ✅ **Interfaz moderna y responsive** - Diseñada con Material-UI v6
- ✅ **Tipado estricto** - TypeScript en toda la aplicación
- ✅ **Arquitectura escalable** - Separación clara de responsabilidades

## 📁 Estructura del Proyecto

```
src/
├── config/           # Configuración de la aplicación (variables de entorno)
├── models/           # Modelos de datos y tipos TypeScript
├── services/         # Servicios de API y cliente HTTP
├── hooks/            # Custom React Hooks
├── components/       # Componentes de UI reutilizables
├── theme/            # Tema de Material-UI
├── App.tsx           # Componente principal
└── index.tsx         # Punto de entrada
```

### Estructura Detallada

#### `/config`
Maneja la configuración de la aplicación usando variables de entorno.
- **index.ts**: Lee variables de entorno y proporciona configuración tipada

#### `/models`
Define los modelos de datos y tipos TypeScript.
- **Contact.ts**: Interfaz Contact, ContactDTO, ContactFormState y helpers
- **CacheStats.ts**: Interfaces para estadísticas de caché de Hazelcast
- **index.ts**: Exporta todos los modelos

#### `/services`
Encapsula las llamadas a APIs externas.
- **apiClient.ts**: Cliente axios configurado con interceptores
- **contactService.ts**: Servicio CRUD para contactos
- **cacheService.ts**: Servicio para obtener estadísticas del caché
- **index.ts**: Exporta todos los servicios

#### `/hooks`
Custom hooks para lógica de negocio reutilizable.
- **useContacts.ts**: Hook para gestionar estado y operaciones de contactos
- **useCacheStats.ts**: Hook para obtener y actualizar estadísticas de caché
- **useSnackbar.ts**: Hook para notificaciones
- **index.ts**: Exporta todos los hooks

#### `/components`
Componentes React reutilizables.
- **Layout.tsx**: Layout principal de la aplicación
- **ContactForm.tsx**: Formulario para crear/editar contactos
- **ContactTable.tsx**: Tabla para listar contactos
- **CacheStats.tsx**: Componente para visualizar estadísticas de caché de Hazelcast
- **index.ts**: Exporta todos los componentes

#### `/theme`
Configuración del tema de Material-UI.
- **index.ts**: Theme customizado

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (usa `.env.example` como referencia):

```env
# API Configuration
VITE_API_BASE_URL=http://api:8080
VITE_API_CONTACTS_ENDPOINT=/api/contacts

# Application Configuration
VITE_APP_NAME=Portafolio de Contactos
VITE_SNACKBAR_DURATION=6000
```

### Variables Disponibles

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | URL base de la API | `http://localhost:8080` |
| `VITE_API_CONTACTS_ENDPOINT` | Endpoint de contactos | `/api/contacts` |
| `VITE_APP_NAME` | Nombre de la aplicación | `Portafolio de Contactos` |
| `VITE_SNACKBAR_DURATION` | Duración del snackbar (ms) | `6000` |

## 🚀 Instalación y Uso

Este proyecto funciona con **npm** o **pnpm**. Elige el que prefieras:

### Con PNPM (Recomendado)
```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm start

# Compilar para producción
pnpm build
```

### Con NPM
```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm start

# Compilar para producción
npm run build
```

⚠️ **Importante**: Este proyecto usa **Vite** (migrado desde Create React App).
- Variables de entorno usan prefijo `VITE_` (no `REACT_APP_`)
- Compatible con npm y pnpm

### Con Docker
```bash
# Construir la imagen
docker build -t portal-contactos-web .

# Ejecutar el contenedor
docker run -p 3000:80 portal-contactos-web
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Arquitectura

### Separación de Responsabilidades

1. **Presentación** (`/components`): Componentes UI puros, solo reciben props
2. **Lógica de Negocio** (`/hooks`): Custom hooks que manejan estado y lógica
3. **Acceso a Datos** (`/services`): Encapsula llamadas HTTP
4. **Modelos** (`/models`): Definición de tipos y estructuras de datos
5. **Configuración** (`/config`): Configuración centralizada

### Flujo de Datos

```
App.tsx (Orquestador)
    ↓
useContacts + useCacheStats (Lógica de negocio)
    ↓
contactService + cacheService (Acceso a datos)
    ↓
apiClient (Cliente HTTP)
    ↓
API REST
```

### Beneficios de esta Arquitectura

✅ **Mantenibilidad**: Código organizado y fácil de encontrar  
✅ **Testabilidad**: Componentes y lógica fácilmente testeables  
✅ **Reutilización**: Hooks y servicios reutilizables  
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades  
✅ **Separación de Responsabilidades**: Cada capa tiene un propósito claro  
✅ **Configuración Externa**: No hay valores hardcodeados

## 🛠️ Tecnologías

- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite 6** - Build tool y dev server
- **Material-UI v6** - Librería de componentes
- **Axios** - Cliente HTTP
- **Custom Hooks** - Lógica reutilizable
- **Hazelcast** - Caché distribuido (integración con API)

## 🔄 Integración con Hazelcast

Esta aplicación se conecta a una API backend que utiliza **Hazelcast** como caché distribuido. La integración incluye:

### Visualización de Estadísticas
El componente `CacheStats` muestra información en tiempo real del cluster de Hazelcast:
- **Información del Cluster**: Nombre, instancia y número de nodos
- **Tamaño del Caché**: Total de contactos en caché y en el nodo local
- **Operaciones**: Contadores de hits, gets, puts y removes
- **Hit Rate**: Porcentaje de aciertos del caché

### Endpoints Utilizados
- `GET /api/contacts/cache/stats` - Obtiene estadísticas del caché

## 📝 Buenas Prácticas Implementadas

1. ✅ **No hardcodear configuración** - Uso de variables de entorno
2. ✅ **Separación de responsabilidades** - Arquitectura en capas
3. ✅ **Código tipado** - TypeScript en todos los módulos
4. ✅ **Custom Hooks** - Lógica de negocio encapsulada
5. ✅ **Servicios de API** - Llamadas HTTP centralizadas
6. ✅ **Componentes reutilizables** - UI modular
7. ✅ **Manejo de errores** - Interceptores y try/catch
8. ✅ **Documentación** - Comentarios JSDoc en código
