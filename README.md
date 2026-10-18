# 🛍️ devstore

devstore is a developer apparel storefront built with Next.js. Browse featured products, view product details, search the catalog, and add products to the cart.

🎓 This project is part of Rocketseat's Next.js learning path.

## ✨ Features

- 🏷️ Featured products on the home page
- 👕 Product detail pages with descriptions, prices, and size options
- 🔎 Search products by title
- 🛒 Add products to an in-memory cart
- 🧪 Cypress end-to-end tests for search and cart flows

Product data is stored locally in `src/app/api/products/data.json` and served by the app's API routes.

## 🧰 Tech stack

- [Next.js](https://nextjs.org/) 16 with React 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Cypress](https://www.cypress.io/) for end-to-end tests
- [Biome](https://biomejs.dev/) for linting and formatting

## 🚀 Getting started

### Prerequisites

- Node.js and npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:

   ```env
   APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

   Both variables are required. `NEXT_PUBLIC_API_BASE_URL` is used to build requests to the app's `/api` routes.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## 📜 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the app for production |
| `npm run start` | Start the production server |
| `npm run lint` | Check the project with Biome |
| `npm run format` | Format files with Biome |

## 🧪 End-to-end tests

Start the app with `npm run dev`, then run Cypress in another terminal:

```bash
npx cypress run
```

The tests cover product search and adding products to the cart.

## 🔌 Product API

The app provides these routes:

| Route | Description |
| --- | --- |
| `GET /api/products` | Return all products |
| `GET /api/products/featured` | Return featured products |
| `GET /api/products/search?q=<query>` | Search products by title |
| `GET /api/products/<slug>` | Return a product by slug |
