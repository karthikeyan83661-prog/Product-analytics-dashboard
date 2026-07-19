<p align="center">
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
</p>

# Product Analytics Dashboard

A full-stack product analytics dashboard for administrators to monitor product performance in real-time.

## Dashboard Preview

> _Add your dashboard screenshots here._  
> _Run the project and capture screenshots of the stats cards, product table, and filter controls._

## Features

- **Dashboard Analytics** — View total products, total categories, low stock alerts (stock < 10), and recently added products at a glance
- **Search** — Real-time product search by name with debounced input
- **Filter** — Filter products by category using a dropdown
- **Sort** — Sort inventory by stock quantity (ascending / descending)
- **Clickable Cards** — Click any stat card to instantly filter the product table
- **Dark Mode** — Toggle between light and dark themes with smooth transitions
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **Indian Prices** — All product prices displayed in ₹ (INR)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Spring Boot 3.4.4, Java 25 |
| **Frontend** | React 18, Vite 6, Tailwind CSS 3 |
| **Database** | MongoDB 8 |
| **API** | RESTful (JSON) |

## Getting Started

### Prerequisites

- Java 21+ ([Download](https://adoptium.net/))
- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB ([Download](https://www.mongodb.com/try/download/community))

### 1. Start MongoDB

```bash
mongod --dbpath /path/to/data
```

### 2. Start Backend

```bash
cd backend
mvn spring-boot:run
```

The API server starts at `http://localhost:8080`.  
On first run, it automatically seeds the database with 15 sample products across 5 categories.

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard loads at `http://localhost:5173`.

> **Note:** The frontend dev server proxies `/api` requests to the backend on port 8080.

## API Reference

### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products/stats` | Dashboard statistics (totals, low stock count, recent products) |

### Products

| Method | Endpoint | Query Parameters | Description |
|--------|----------|------------------|-------------|
| `GET` | `/api/products` | `?search=`, `?categoryId=`, `?sort=asc\|desc`, `?lowStock=true` | List / search / filter / sort products |
| `GET` | `/api/products/{id}` | — | Get product by ID |
| `POST` | `/api/products` | — | Create a new product |
| `PUT` | `/api/products/{id}` | — | Update a product |
| `DELETE` | `/api/products/{id}` | — | Delete a product |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | List all categories |
| `GET` | `/api/categories/{id}` | Get category by ID |
| `POST` | `/api/categories` | Create a new category |
| `PUT` | `/api/categories/{id}` | Update a category |
| `DELETE` | `/api/categories/{id}` | Delete a category |

## Project Structure

```
├── backend/
│   └── src/main/java/com/dashboard/
│       ├── config/          # CORS configuration, data seeder
│       ├── controller/      # REST API controllers
│       ├── dto/             # Data transfer objects
│       ├── model/           # MongoDB document models
│       ├── repository/      # Spring Data MongoDB repositories
│       └── service/         # Business logic layer
├── frontend/
│   └── src/
│       ├── api/             # API client utilities
│       └── components/      # React components
│           ├── Dashboard.jsx
│           ├── Layout.jsx
│           ├── ProductTable.jsx
│           ├── SearchFilter.jsx
│           └── StatsCards.jsx
└── README.md
```

## Seed Data

The backend automatically seeds 15 products across 5 categories on first run:

**Categories:** Electronics, Clothing, Home & Kitchen, Books, Sports

**Sample Products:** Wireless Headphones (₹5,999), Smart Watch (₹14,999), Running Shoes (₹9,999), Coffee Maker (₹4,999), and more.

## License

MIT
