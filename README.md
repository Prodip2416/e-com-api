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
- **Search Functionality**: Search products by name.
- **Pagination**: limit, page
- **Filters**: Filter products by:
  - Price range
  - Category
  - Availability (in stock or out of stock)
- **Sorting**: Sort products by:
  - Price (low to high, high to low)

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
| Method | Endpoint              | Description                      | Example Payload                                                                 |
|--------|-----------------------|----------------------------------|-------------------------------------------------------------------------------|
| POST   | /api/auth/signup      | Register a new user              | `{ "name": "Mr. Dip", "email": "prodip.sarker.cse@gmail.com", "password": "123456" }` |
| POST   | /api/auth/login       | Login user                       | `{ "email": "boby@gmail.com", "password": "123456" }`                       |
| POST   | /api/auth/verify      | Verify a user                    | `{ "email": "prodip.sarker.cse@gmail.com", "code": "ed245b87e4dc1645f8e85ee09ff5f55e" }` |

### Users
| Method | Endpoint              | Description                      | Example Payload |
|--------|-----------------------|----------------------------------|-----------------|
| GET    | /api/user/users       | Get all users                    | -               |

### Roles
| Method | Endpoint              | Description                      | Example Payload                                          |
|--------|-----------------------|----------------------------------|--------------------------------------------------------|
| POST   | /api/role/role        | Create a new role                | `{ "name": "HOD", "description": "" }`                 |
| GET    | /api/role/roles       | Get all roles                    | -                                                      |
| GET    | /api/role/role/:id    | Get role by ID                   | -                                                      |
| PUT    | /api/role/role        | Update a role                    | `{ "id": 3, "name": "Customer", "description": "" }`  |
| DELETE | /api/role/role        | Delete a role                    | `{ "id": 4 }`                                         |

### Products
| Method | Endpoint              | Description                      | Example Payload                                                                                  |
|--------|-----------------------|----------------------------------|------------------------------------------------------------------------------------------------|
| POST   | /api/product/product  | Create a new product             | Form Data: `{ name: "Iphone 15", description: "", price: "1100", stock: "20" } + files` |
| GET    | /api/product/products | Get all products                 | -                                                                                              |
| GET    | /api/product/product/:id | Get product by ID             | -                                                                                              |
| PUT    | /api/product/product  | Update a product                 | Form Data: `{ name: "Iphone 15 Pro", price: "900", stock: "30", id: "3" }`                 |
| DELETE | /api/product/product/:id | Delete a product             | -                                                                                              |

### Cart
| Method | Endpoint              | Description                      | Example Payload                                                                 |
|--------|-----------------------|----------------------------------|-------------------------------------------------------------------------------|
| POST   | /api/cart/cart        | Create a cart entry               | `{ "cart": [ { "product_id": 1, "quantity": 2, "price": 1100 } ] }`     |
| GET    | /api/cart/cart        | Get cart by user                 | -                                                                             |
| DELETE | /api/cart/cart        | Delete all cart items            | -                                                                             |

### Orders
| Method | Endpoint              | Description                      | Example Payload                                           |
|--------|-----------------------|----------------------------------|---------------------------------------------------------|
| POST   | /api/order/order      | Create a new order               | `{ "cart_id": 3, "total_price": 4200 }`                |
| GET    | /api/order/orders     | Get all orders                   | -                                                       |
| PUT    | /api/order/cancel-order | Cancel an order                | `{ "order_id": 3 }`                                    |

### Payments
| Method | Endpoint              | Description                      | Example Payload                                           |
|--------|-----------------------|----------------------------------|---------------------------------------------------------|
| POST   | /api/payment/create-payment | Create a payment           | `{ "order_id": 3, "amount": 4200, "currency": "BDT" }` |

## License
This project is licensed under the [MIT License](LICENSE).

---

Let me know if you'd like more details or adjustments to the `README.md`!

