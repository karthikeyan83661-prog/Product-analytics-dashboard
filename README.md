# Product Analytics Dashboard

A full-stack product analytics dashboard for monitoring product performance. Built with **Spring Boot**, **React**, and **H2 Database**.

## Features

- **Dashboard Analytics** — Total products, categories, low stock alerts, recently added items
- **Search** — Real-time product search by name (debounced)
- **Filter** — Filter products by category
- **Sort** — Sort inventory by stock quantity (ascending/descending)
- **Clickable Stats** — Click any stat card to filter the product table
- **Dark Mode** — Toggle between light and dark themes
- **Responsive** — Works on desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Spring Boot 3.4.4, Java 25 |
| Frontend | React 18, Vite 6, Tailwind CSS 3 |
| Database | MongoDB |
| API | RESTful (JSON) |

## Quick Start

### Prerequisites
- Java 21+ ([Download](https://adoptium.net/))
- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB running on `localhost:27017`

### Run with one command

```bash
# Build frontend, copy to backend, build JAR
cd frontend && npm install && npm run build
xcopy /e /i dist ..\backend\src\main\resources\static
cd ..\backend && mvn package -DskipTests

# Run
java -jar target/product-dashboard-1.0.0.jar
```

Open **http://localhost:8080**

### Development mode (hot reload)

**Terminal 1 — Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Frontend at **http://localhost:5173**, backend at **http://localhost:8080**

## API Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/api/products/stats` | Dashboard statistics | — |
| `GET` | `/api/products` | List products | `?search=`, `?categoryId=`, `?sort=asc\|desc`, `?lowStock=true` |
| `GET` | `/api/products/{id}` | Get product by ID | — |
| `POST` | `/api/products` | Create product | JSON body |
| `PUT` | `/api/products/{id}` | Update product | JSON body |
| `DELETE` | `/api/products/{id}` | Delete product | — |
| `GET` | `/api/categories` | List categories | — |
| `POST` | `/api/categories` | Create category | JSON body |
| `GET` | `/api/categories/{id}` | Get category by ID | — |
| `PUT` | `/api/categories/{id}` | Update category | JSON body |
| `DELETE` | `/api/categories/{id}` | Delete category | — |

## Deployment

### Build deployable JAR

```bash
cd frontend && npm install && npm run build
xcopy /e /i dist ..\backend\src\main\resources\static
cd ..\backend && mvn package -DskipTests
```

The JAR is at `backend/target/product-dashboard-1.0.0.jar` (~29MB, self-contained).

### Deploy to cloud

Upload the JAR to:

- **Railway** — `railway up`
- **Render** — Web Service, start command: `java -jar target/product-dashboard-1.0.0.jar`
- **Fly.io** — `fly launch && fly deploy`
- **Heroku** — `heroku deploy:jar product-dashboard-1.0.0.jar`

Requires MongoDB running on `localhost:27017`. For cloud deploys, use [MongoDB Atlas](https://www.mongodb.com/atlas) and update `application.properties`.

## Project Structure

```
├── backend/                     # Spring Boot API
│   ├── src/main/java/com/dashboard/
│   │   ├── config/              # CORS, data seeder, forward controller
│   │   ├── controller/          # REST controllers
│   │   ├── dto/                 # Data transfer objects
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Data access layer
│   │   └── service/             # Business logic
│   └── pom.xml
├── frontend/                    # React dashboard
│   └── src/
│       ├── api/                 # API client
│       ├── components/          # React components
│       │   ├── Dashboard.jsx    # Main dashboard
│       │   ├── Layout.jsx       # App shell with header
│       │   ├── ProductTable.jsx # Product listing
│       │   ├── SearchFilter.jsx # Search, filter, sort controls
│       │   └── StatsCards.jsx   # Analytics stat cards
│       └── App.jsx
└── *.bat                        # Startup scripts
```

## License

MIT
