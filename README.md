# 🚀 POC Fullstack con Docker Compose, Spring Boot 3 + Hazelcast y React 

Este proyecto es un ejemplo completo de una aplicación full-stack orquestada con Docker Compose, demostrando una arquitectura moderna que incluye un backend en Java, un frontend en React y un servicio de caché distribuido con Hazelcast.

## 🏗️ Estructura del Proyecto

\\\
hazelcast-portfolio/
├── api/               # Backend: Spring Boot 3.x, Java 21, Spring Data JPA
├── web/               # Frontend: React + TypeScript, Material UI, Nginx
├── docker-compose.yml # Definición de los servicios (api, web, db) y la red interna
├── .env               # Variables de entorno (no versionado)
├── .env.example       # Plantilla de variables de entorno
└── README.md
\\\

## 🛠️ Tecnologías

| Componente | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Backend** | Spring Boot | 3.5.6 | API REST para la gestión de contactos (CRUD). |
| **Base de Datos** | MariaDB | 11.6 | Base de datos relacional para persistencia. |
| **Cache** | Hazelcast | 5.5.0 | Servicio de caché distribuido en memoria. |
| **Frontend** | React + TS | Latest | Single Page Application (SPA) con Material UI. |
| **Orquestación**| Docker Compose| Latest | Define y ejecuta la aplicación completa en contenedores. |

## 🌐 Endpoints de la API (Backend: \http://api:8080\)

Todos los endpoints están prefijados con \/api/contacts\.

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **GET** | \/api/contacts\ | Obtiene la lista de todos los contactos. |
| **GET** | \/api/contacts/{id}\ | Obtiene un contacto por ID (usando Hazelcast cache). |
| **POST** | \/api/contacts\ | Crea un nuevo contacto. |
| **PUT** | \/api/contacts/{id}\ | Actualiza un contacto existente. |
| **DELETE** | \/api/contacts/{id}\ | Elimina un contacto por ID. |
| **GET** | \/api/cache/stats\ | Obtiene estadísticas del caché de Hazelcast. |

**Nota sobre Persistencia y Cache:**
* Los datos se persisten en **MariaDB** utilizando **Spring Data JPA**.
* La API implementa caché distribuido con **Hazelcast** para mejorar el rendimiento.
* El método \getContactById\ consulta la caché primero (\contacts\) y luego la base de datos, demostrando el patrón *Cache-Aside*.

## ⚙️ Pasos para Levantar el Proyecto

Asegúrate de tener Docker y Docker Compose instalados.

1.  **Configurar variables de entorno:**
    Copia el archivo de ejemplo y configura tus credenciales:
    \\\ash
    cp .env.example .env
    \\\
    
    Edita el archivo \'.env'\ con tus propias credenciales de base de datos:
    \\\env
    MARIADB_ROOT_PASSWORD=tu_password_root
    MARIADB_DATABASE=nombre_base_datos
    MARIADB_USER=tu_usuario
    MARIADB_PASSWORD=tu_password
    DB_PORT=3306
    APP_PORT=3000
    \\\

2.  **Navegar a la carpeta:**
    \\\ash
    cd hazelcast-portfolio
    \\\

3.  **Instalar dependencias del frontend:**
    \\\ash
    cd web
    npm install
    cd ..
    \\\

4.  **Construir y Ejecutar:**
    Ejecuta el siguiente comando en la carpeta raíz (\hazelcast-portfolio/\).

    \\\ash
    docker compose up --build
    \\\

5.  **Acceder a la Aplicación:**
    Una vez que todos los servicios estén en funcionamiento, puedes acceder al Frontend (React Web) en tu navegador:

    ➡️ **[http://localhost:3000](http://localhost:3000)**


## Autor

Alexis (alexis.castellano@gmail.com)