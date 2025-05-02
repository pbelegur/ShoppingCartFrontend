# Shopping Cart Interface with Next.js

This project is a single-page shopping interface developed using **Next.js**. It enables users to browse products, search by title or SKU, add items to a shopping cart, and manage those items before proceeding to checkout.

## Project Overview

The project consists of two key pages:

* **Home Page**: Displays products and allows users to search and add them to the cart.
* **Cart Page**: Displays selected items, enables removal, and shows an order summary.

## Features

### Home Page

* Fetches and displays products from a backend API.
* Allows searching for products by title or SKU.
* Provides an interface to add products to a cart.
* Includes a cart icon with an item count and navigation to the cart page.
* Automatically clears the cart upon loading the page.

### Cart Page

* Fetches cart contents from the backend.
* Displays all items in the cart with image, title, SKU, and price.
* Allows users to remove individual items from the cart.
* Calculates and displays the total cost of items.
* Includes navigation to proceed to checkout or return to the home page.

## API Endpoints

All API requests are routed to:

https://karinialassignment-production.up.railway.app

### Endpoints Used

* `GET /api/data` — Fetch all products.
* `POST /api/search` — Search products by SKU or title.
* `POST /api/cart` — Add a product to the cart.
* `GET /api/cart` — Retrieve items currently in the cart.
* `DELETE /api/cart` — Remove a specific item from the cart.
* `DELETE /api/clearCart` — Clear all items from the cart on page load.

## Technology Stack

* **Next.js** (App Router, Client Components)
* **React** (`useState`, `useEffect`)
* **CSS Modules** for styling
* **Node.js/Express** (backend, assumed)
* **Railway** for backend deployment
* **Vercel** for FrontEnd deployment

## Getting Started

1. **Clone the repository**
   git clone <repository-url>
   cd <project-directory>

2. **Install dependencies**
   npm install

3. **Run the development server**
   npm run dev

4. **Access the application**

   Open a browser and go to: `https://shopping-cart-frontend-theta.vercel.app/`

## Notes

* Ensure the backend API is deployed and accessible before running the application.
* Product objects should contain the following fields: `"Image Src"`, `"Title"`, `"Variant SKU"`, and `"Variant Price"`.
