# E-commerce REST API

A simple E-commerce REST API built with **Node.js**, **Express**, and **MongoDB**. It supports CRUD operations for **Employees** and **Products**, along with optional role-based access, pagination, and search.

---

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
cd e-commerce-rest-api
npm install
```

Create a `.env` file:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce-db
JWT_SECRET=your_secret
```

Run the server:

```bash
npm run dev
```

Server: [http://localhost:4000](http://localhost:4000)

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
