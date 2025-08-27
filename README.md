

---

````markdown
# 💳 AdilPay – Digital Wallet Frontend  

A **secure, role-based digital wallet frontend application** (similar to **bKash** or **Nagad**) built with **React 19, Redux Toolkit, RTK Query, Tailwind CSS 4, and Radix UI**.  

This project provides a **user-friendly, responsive, and scalable wallet system** that supports three different roles:  

- 👤 **User** – Send/receive money, manage wallet, view transactions  
- 🧑‍💼 **Agent** – Facilitate deposits, withdrawals, and commissions  
- 👨‍💻 **Admin** – Manage users/agents, monitor transactions, configure system  

It consumes a backend API (can be mocked or implemented separately with Node.js/Express + MongoDB).  

---

## 🚀 Features  

### 🌍 Public Landing Pages  
- Responsive landing page with hero banner, sticky navbar, footer  
- About, Features, Contact, FAQ, Pricing pages  
- Smooth transitions, skeleton loading, accessible design  

### 🔐 Authentication  
- JWT-based login & registration (User/Agent roles)  
- Persistent authentication with refresh  
- Role-based redirection  
- Logout functionality  

### 👤 User Dashboard  
- Wallet balance overview  
- Deposit, Withdraw, Send Money  
- Transaction history with pagination & filtering  
- Profile management  

### 🧑‍💼 Agent Dashboard  
- Cash-in / Cash-out for users  
- Commission tracking  
- Transaction history  
- Profile management  

### 👨‍💻 Admin Dashboard  
- Manage users & agents (approve/block/suspend)  
- System-wide transaction monitoring with advanced filters  
- Dashboard with analytics (charts, cards, stats)  
- Fee/limit configuration (optional)  

### ⚙️ General Features  
- Role-based navigation  
- Form validations  
- Pagination, filtering, search  
- Toast notifications (**Sonner**)  
- Guided tour (**React Joyride**)  
- Light/Dark mode toggle  
- Fully responsive UI  

---

## 🛠️ Technology Stack  

### **Frontend**  
- React 19 + React Router v7  
- Redux Toolkit + RTK Query  
- Tailwind CSS v4 + tailwind-merge  
- Radix UI components + lucide-react icons  
- Framer Motion (animations)  
- React Hook Form + Zod (form validation)  
- React Joyride (guided tour)  
- Sonner (toast notifications)  
- Next Themes (dark/light mode)  

### **Backend (separate project, not included here)**  
- Node.js / Express  
- MongoDB / Mongoose  
- JWT + bcrypt (authentication)  

### **Tooling**  
- Bun (package manager & runtime)  
- Vite 7 (bundler)  
- TypeScript 5.8  
- ESLint 9 + TypeScript ESLint  

---

## ⚡ Getting Started  

### 🔧 Prerequisites  
- [Bun](https://bun.sh/) (preferred) or Node.js 20+  
- Git  

---

### 📥 Installation  

Clone the repo:  

```bash
git clone https://github.com/your-username/adilpay-client.git
cd adilpay-client
````

Install dependencies (using bun):

```bash
bun install
```

---

### ▶️ Run Development Server

```bash
bun run dev
```

App will be available at:
👉 [http://localhost:5173](http://localhost:5173)

---

### 🏗️ Build for Production

```bash
bun run build
```

Preview production build:

```bash
bun run preview
```

---

### 🔍 Linting

```bash
bun run lint
```

---

## 🌐 Deployment

You can deploy easily on:

* **Vercel** (recommended for frontend)
* **Netlify**
* **Cloudflare Pages**

Once deployed, add your **Live URL** here:

👉 **Live Demo:** [https://adilpay.vercel.app](https://adilpay.vercel.app) *(replace after deployment)*

---

## 📂 Project Structure

```bash
adilpay-client/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── features/         # Redux slices & RTK Query API services
│   ├── layouts/          # Dashboard & landing layouts
│   ├── pages/            # Route-based pages
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📊 Roadmap

* [x] Setup React + Vite + Tailwind + Redux Toolkit
* [x] Add authentication flow with JWT
* [x] Role-based dashboards (User, Agent, Admin)
* [ ] Integrate backend API
* [ ] Add advanced filtering & search in transactions
* [ ] Add data visualization (charts)
* [ ] Deployment & CI/CD setup

---

## 🤝 Contributing

1. Fork the project

2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Commit changes:

   ```bash
   git commit -m "Add some feature"
   ```

4. Push to branch:

   ```bash
   git push origin feature/your-feature
   ```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ by **Arif**