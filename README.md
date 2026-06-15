# Frontend de negocio

Frontend de negocio para el proyecto de prueba, rest full API con react y tailwind.

## Stack

- Node.js
- Vite
- Tailwind
- Postman

## Comandos para levantar el proyecto
- docker compose run --rm frontend npm create vite@latest . -- --template react -> crear proyecto
- docker compose run --rm frontend npm install -> instalar dependencias
- docker compose up -d -> levantar contenedor
- docker exec -it negocio_frontend npm install --save react-router-dom -> instalar react router
- docker exec -it negocio_frontend npm install react-bootstrap bootstrap -> instalar bootstrap