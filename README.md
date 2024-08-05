# Prueba Técnica | Sensedia

## Descripción del Proyecto

Este proyecto es una prueba técnica para **Sensedia**. Desarrollado con Next.js 14, incluye funcionalidades completas para un CRUD con conexión a una base de datos.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Mordecai14/sensedia-nextjs-prueba.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura las variables de entorno:

   Copia el archivo `.env.sample` y renómbralo a `.env`. Luego, completa los valores necesarios.

   ```
   API_BASE_URL=<RemoteApiUrl>/api/v1
   API_LOCAL=http://localhost:3000
   ```

## Uso

Para iniciar el servidor de desarrollo:

    ```bash
    npm run dev
    # o
    yarn dev
    ```

El proyecto estará disponible en `http://localhost:3000`.

## Pruebas

### Pruebas Unitarias con Jest

Las pruebas unitarias están configuradas con Jest y React Testing Library. Para ejecutar las pruebas:

    ```bash
    npm test
    # o
    yarn test
    ```

### Pruebas End-to-End (E2E) con Cypress

Las pruebas E2E están configuradas con Cypress.

> **Es la primera vez que utilizo este tipo de pruebas, sin embargo estuve investigando sobre su funcionamiento y realicé un ejemplo de implementación básico.**

Para ejecutar las pruebas:

1. Inicia el servidor de desarrollo en una terminal:

   ```bash
   npm run dev
   # o
   yarn dev
   ```

2. En otra terminal, ejecuta Cypress:

   ```bash
   npx cypress open
   # o
   yarn cy:open
   ```

## Estructura del Proyecto

    ```bash
    .
    ├── __tests__
    ├── app
    ├── components
    ├── containers
    ├── coverage
    ├── cypress
    ├── libs
    ├── public
    ```

- **tests**: Aquí se encuentran los tests de Jest.
- **app**: Carpeta base de la aplicación.
- **components**: Componentes reutilizables de la interfaz de usuario.
- **containers**: Partes visuales más grandes conformadas por conjuntos de componentes.
- **coverage**: Carpeta de la cobertura de las pruebas.
- **cypress**: Directorio para pruebas E2E.
- **libs**: Funciones y utilidades.
- **public**: Archivos estáticos.

## Autor

**Aramen Meza Mendoza**
arammendoza.97@gmail.com

---

¡Gracias por revisar este proyecto! Si tienes alguna pregunta o sugerencia, no dudes en contactarme.

---
