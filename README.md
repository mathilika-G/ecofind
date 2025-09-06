# EcoFind - Sustainable Second-Hand Marketplace

EcoFind is a cross-platform **mobile application built with Expo & React Native** that empowers sustainable consumption by providing a trusted marketplace for buying and selling second-hand items.

---

## 🚀 Features

- **User Authentication**
  - Sign up / Log in (basic email + password)
  - Profile creation & editing

- **Product Listings**
  - Create, edit, and delete listings
  - Add details: title, description, category, price, and image placeholder
  - Browse all listings in a feed

- **Search & Filter**
  - Search by product title
  - Filter by predefined categories

- **Product Details**
  - View full details of any product

- **Cart & Purchases**
  - Add items to cart
  - View previous purchases

- **User Dashboard**
  - Manage personal profile information

---

## 📂 Project Structure

```
ecofind/
│── app/                      # Navigation (Expo Router)
│   ├── index.js              # Product Feed
│   ├── login.js              # Login
│   ├── signup.js             # Sign Up
│   ├── add-product.js        # Add Product
│   ├── my-listings.js        # User Listings
│   ├── product/[id].js       # Product Details
│   ├── cart.js               # Cart
│   ├── purchases.js          # Previous Purchases
│   └── dashboard.js          # User Dashboard
│
│── components/               # Reusable components
│── assets/                   # Images & Icons
│── context/                  # Auth & Product Contexts
│── services/                 # API / Storage logic
│── utils/                    # Helpers & constants
│── App.js                    # Entry point
│── package.json
└── README.md
```

---

## 🛠️ Installation & Running

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ecofind.git
   cd ecofind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo server:
   ```bash
   npx expo start
   ```

4. Run the app:
   - **Expo Go App** (scan QR code on your phone)
   - **Android Emulator** (`a` in terminal)
   - **iOS Simulator** (`i` in terminal, Mac only)

---

## 📱 Tech Stack

- [Expo](https://expo.dev/) (React Native framework)
- React Native
- React Context API (state management)
- AsyncStorage (local storage for prototype)
- Expo Router (modern navigation)

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, create a branch, and submit a PR.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🌍 Vision

EcoFind aims to **extend the lifecycle of products, reduce waste, and encourage responsible consumption** by building a vibrant community-driven marketplace for sustainable living.
