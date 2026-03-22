# 🚀 Smart E-Learning Content Aggregator

A full-stack MERN application that performs **intelligent web crawling** and provides **personalized learning resource recommendations** based on user interests.

---

## 📌 Project Overview

This project implements a **focused web crawling framework with semantic personalization** to help students discover relevant educational content efficiently.

Instead of returning large amounts of unfiltered data like traditional search engines, this system:

* Crawls only relevant pages
* Filters content using keywords
* Ranks results based on relevance
* Provides personalized recommendations

---

## 🎯 Features

* 🔍 **Dynamic Topic Search** (e.g., blockchain, AI, React)
* 🧠 **Keyword Expansion for Semantic Understanding**
* 🌐 **Focused Web Crawling (Cheerio + Axios)**
* ⚡ **Parallel Crawling for Faster Performance**
* 🎯 **Relevance-Based Link Filtering**
* 🗄️ **MongoDB Data Storage**
* 📊 **Personalized Recommendation Engine**
* 🎨 **Modern Responsive UI (React)**

---

## 🏗️ Tech Stack

### Frontend

* React.js
* CSS (Modern UI with Glassmorphism)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas

### Web Scraping

* Axios
* Cheerio

---

## ⚙️ System Architecture

User Input → Keyword Expansion → Seed URL Generation → Focused Crawling → Data Filtering → MongoDB Storage → Recommendation Engine → Frontend Display

---

## 🚀 How It Works

1. User enters a topic (e.g., *blockchain*)
2. System expands keywords for better understanding
3. Dynamic seed URLs are generated
4. Web pages are crawled and parsed
5. Irrelevant pages are filtered out
6. Relevant content is stored in MongoDB
7. Recommendation algorithm ranks results
8. Top results are displayed on UI

---

## 📸 Screenshots

<img width="1890" height="894" alt="Screenshot 2026-03-22 141041" src="https://github.com/user-attachments/assets/7855da67-c466-4c24-8af1-ee44b5dfecad" />

<img width="1898" height="902" alt="Screenshot 2026-03-22 141105" src="https://github.com/user-attachments/assets/deae0451-ccd9-47da-917d-58e516a1461d" />

---

## 🧠 Key Concepts Used

* Focused Crawling
* Semantic Filtering
* Relevance Scoring
* Parallel Processing
* Personalized Recommendation

---

## ⚡ Performance Optimization

* Parallel crawling using `Promise.all`
* Depth-limited crawling
* Domain-based filtering
* Efficient database queries

---

## ⚠️ Limitations

* Depends on static web scraping
* Some websites may block crawling
* Not a full-scale search engine

---

## 🔮 Future Enhancements

* NLP-based semantic analysis
* AI-powered recommendations
* Multi-language support
* Real-time indexing
* Deployment with custom domain

---

## 🛠️ Installation (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/E-Learning.git
cd E-Learning
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_connection
PORT=5000
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Deployment

* Backend: Render
* Frontend: Vercel

---

> This system uses focused web crawling and semantic filtering to collect and recommend personalized learning content based on user interests.

---

## 👩‍💻 Author

**Prema Ghosh**

---

## ⭐ If you like this project, give it a star!
