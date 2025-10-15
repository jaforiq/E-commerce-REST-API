# E-commerce REST API

A simple E-commerce REST API built with **Node.js**, **Express**, and **MongoDB**. It supports CRUD operations for **Employees** and **Products**, along with optional role-based access, pagination, and search.

## Live Server: [https://e-commerce-rest-api-s7u2.onrender.com/api-docs/](https://e-commerce-rest-api-s7u2.onrender.com/api-docs/)

## 🚀 Features

- Employee & Product CRUD operations
- Role-based access (admin permissions)
- Pagination & search for products
- Request logging middleware
- Error handling for invalid input/IDs

---

## 🛠️ Tech Stack

- Node.js + Express.js
- MongoDB (Mongoose)
- Swagger / Postman for API docs

---

## ⚙️ Setup

```bash
git clone <your-repo-url>
cd server
npm install
```

## Change in file(For running in local)

```bash
Change mongodb url in Config/database.ts
Change swagger url with your local url in utils/swagger.ts
```

Create a `.env` file:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecommerce-db
JWT_SECRET=your_secret
```

Run the server:

```bash
npm run dev
```

Live Swagger: [https://e-commerce-rest-api-s7u2.onrender.com/api-docs/](https://e-commerce-rest-api-s7u2.onrender.com/api-docs/)

---

## 📦 API Endpoints

### Employees

- `POST /employees` – Add new employee
- `GET /employees` – Get all employees
- `GET /employees/:id` – Get employee by ID
- `PUT /employees/:id` – Update employee
- `DELETE /employees/:id` – Delete employee _(admin only)_

### Products

- `POST /products` – Add new product
- `GET /products` – Get all products _(supports ?page, ?limit, ?search)_
- `GET /products/:id` – Get product by ID
- `PUT /products/:id` – Update product
- `DELETE /products/:id` – Delete product _(admin only)_

---

## 📄 Docs

- Swagger UI: `/api-docs`
- Postman Collection: `docs/postman_collection.json`

---

## 🧩 License

MIT © 2025 Jafor Iqbal
