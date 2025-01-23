# E-Commerce Application

## Overview
This is a basic e-commerce application that provides essential features for users to browse, search, and purchase products online. It also includes an admin panel for managing users, products, orders, and more. This MVP (Minimum Viable Product) includes the core features required to get the app up and running efficiently.

## Core Features (Essential for MVP)

### 1. User Authentication & Authorization
- **User Registration**: Users can sign up with email and password.
- **User Login**: Login with secure password hashing (bcrypt).
- **JWT Authentication**: APIs are secured using JWT tokens for session management.
- **Role-Based Access Control (RBAC)**:
  - Customers: Browse and purchase products.
  - Admin: Manage users, products, and orders.

### 2. Product Management
- **CRUD Operations**: Admins can create, update, delete, and view products.
- **Product Details**: Each product includes:
  - Name
  - Description
  - Price
  - Stock
  - Images

### 3. Product Search & Filtering
- **Search Functionality**: Search products by name or keywords.
- **Filters**: Filter products by:
  - Price range
  - Category
  - Availability (in stock or out of stock)
- **Sorting**: Sort products by:
  - Price (low to high, high to low)
  - Ratings

### 4. Shopping Cart
- **Add to Cart**: Users can add products to their cart.
- **Update Cart**: Modify product quantity or remove items.
- **Persistent Cart**:
  - For logged-in users, the cart is stored in the database.
- **Subtotal Calculation**: Automatically calculates the subtotal of items in the cart.

### 5. Wishlist
- **Add to Wishlist**: Users can add products to their wishlist for future purchases.
- **Persistent Wishlist**:
  - Saved for logged-in users in the database.

### 6. Order Management
- **Place Orders**: Users can place orders with a unique order ID.
- **Order Details**: Includes product name, quantity, price, and total cost.
- **Order Tracking**: Users can view their order status:
  - Pending
  - Shipped
  - Delivered
  - Canceled

### 7. Payment Gateway Integration
- **Supported Payment Gateways**:
  - Stripe
- **Multiple Payment Methods**:
  - Credit/Debit cards
  - Cash on delivery
- **Secure Transactions**: Payments are processed securely, and payment status is tracked.

### 8. Shipping & Address Management
- **Shipping Address**: Users can save and manage multiple shipping addresses.

### 9. Notifications
- **Email Notifications**:
  - Order confirmation.
  - Shipping updates.
  - Password resets.

### 10. Admin Panel
- **Dashboard**: Admins can view:
  - Total sales
  - New orders
  - Customer growth
- **User Management**:
  - View, edit, or delete users.
- **Product Management**:
  - Add, update, or delete products.
  - Manage product categories.
- **Order Management**:
  - View order history.
  - Update order status.

## Uses Technology

### Backend
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web application framework.
- **Sequelize**: ORM for database interactions.

### Database
- **MySQL**: Relational database for structured data.

### Authentication
- **JWT (JSON Web Tokens)**: For secure authentication and session management.

### Payment Gateway
- **Stripe**: For handling secure transactions.


## Installation

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- A database ( MySQL )

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Prodip2416/e-com-service.git
   ```
2. Navigate to the project directory:
   ```bash
   cd e-com-service
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PORT=5000
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=ecommerce
     JWT_SECRET=yourjwtsecret
     EMAIL=youremail@gmail.com
     EMAIL_PASSWORD=youremailpassword
     STRIPE_SECRET_KEY=yourstripekey
     ```
5. Run database migrations (Sequelize example):
   ```bash
   npm run migrate
   ```
6. Start the server:
   ```bash
   npm start
   ```
7. Access the app:
   - Backend API: `http://localhost:5000/api`

## API Endpoints (Sample)

### Authentication
| Method | Endpoint          | Description                      |
|--------|-------------------|----------------------------------|
| POST   | /api/auth/signup  | Register a new user              |
| POST   | /api/auth/verify  | Verify a user                    |
| POST   | /api/auth/login   | Login user                       |

### Users
| Method | Endpoint          | Description                      |
|--------|-------------------|----------------------------------|
| GET    | /api/user/users   | Get all users                    |

### Products
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | /api/products         | List all products            |
| GET    | /api/products/:id     | Get product details by ID    |
| POST   | /api/products         | Add a new product (Admin)    |
| PUT    | /api/products/:id     | Update a product (Admin)     |
| DELETE | /api/products/:id     | Delete a product (Admin)     |

### Cart
| Method | Endpoint       | Description                |
|--------|----------------|----------------------------|
| GET    | /api/cart      | Get user's cart items      |
| POST   | /api/cart      | Add item to cart           |
| PUT    | /api/cart/:id  | Update cart item quantity  |
| DELETE | /api/cart/:id  | Remove item from cart      |

### Orders
| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | /api/orders      | Get all user orders        |
| POST   | /api/orders      | Place a new order          |
| GET    | /api/orders/:id  | Get details of an order    |

### Admin Panel
| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| GET    | /api/admin/dashboard  | View admin dashboard stats   |
| GET    | /api/admin/users      | List all users               |
| DELETE | /api/admin/users/:id  | Delete a user                |

## License
This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like more details or adjustments to the `README.md`!

