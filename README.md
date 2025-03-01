# Jewellery E-Commerce Backend

This is the backend for a Jewellery E-Commerce website, built using **Node.js, Express, and MySQL**.

## 🚀 Features
- **User Authentication** (Register/Login with password hashing)
- **Product Management** (CRUD operations)
- **Order Processing** (Create & track orders)
- **RESTful API** structure
- **MySQL Database Connection**
- **JWT Authentication**

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT, bcrypt
- **API Testing:** Postman, cURL

## 📂 Project Structure
```
backend/
│── node_modules/
│── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
│── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── orderController.js
│── config/
│   ├── db.js
│── middleware/
│   ├── authMiddleware.js
│── .env
│── server.js
│── package.json
│── README.md
```

## 📌 Setup & Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd backend
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file and add:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=jewellery_ecom
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the Server
```sh
npm start
```

Server will run on `http://localhost:5000`

## 🔗 API Endpoints

### User Routes
- `POST /api/users/register` → Register a new user
- `POST /api/users/login` → Authenticate user
- `GET /api/users/profile` → Get user profile (requires auth)

### Product Routes
- `GET /api/products` → Fetch all products
- `GET /api/products/:id` → Fetch single product
- `POST /api/products` → Add a new product (Admin only)
- `PUT /api/products/:id` → Update a product (Admin only)
- `DELETE /api/products/:id` → Delete a product (Admin only)

### Order Routes
- `POST /api/orders` → Create an order
- `GET /api/orders/:id` → Get order details
- `GET /api/orders/user/:userId` → Get user orders

## 🛠️ Running in Development Mode
```sh
npm run dev
```
This runs the server with **nodemon** for live updates.

## 🚀 Deploying to Production
```sh
npm install --production
node server.js
```

## 🛠️ Useful Commands
- `npm start` → Start the server
- `npm run dev` → Start with nodemon
- `git pull origin main --rebase` → Sync with remote repo
- `git push origin main` → Push latest changes



