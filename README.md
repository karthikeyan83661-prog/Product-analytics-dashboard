# Product Analytics Dashboard

Dashboard to monitor product performance.

## Features
- Total Products, Total Categories, Low Stock Products (< 10 units), Recently Added Products
- Search products by name
- Filter by category
- Sort by stock quantity

## Tech Stack
- **Backend:** Spring Boot, MongoDB
- **Frontend:** React, Vite, Tailwind CSS

## Setup

### 1. MongoDB
Ensure MongoDB is running on `localhost:27017`.

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:8080`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` (proxies `/api` to backend).

## API
| GET | `/api/products/stats` | Dashboard stats |
| GET | `/api/products` | Products (`?search=`, `?categoryId=`, `?sort=asc\|desc`, `?lowStock=true`) |
| GET/POST/PUT/DELETE | `/api/products/{id}` | Product CRUD |
| GET/POST/PUT/DELETE | `/api/categories/{id}` | Category CRUD |
