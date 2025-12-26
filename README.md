# Trash Cracker: Eco-Logic v1.0
### *Next-Generation Behavioral Pedagogy for Circular Economy Education*



## 🌍 Vision & Strategic Alignment
**Trash Cracker** is a high-fidelity, interactive educational framework designed to bridge the gap between cognitive environmental awareness and tactical waste-management execution. Engineered specifically for the early-childhood demographic (K-5), the application leverages **Swedish Sustainability Paradigms** (Circular Economy) to instill lifelong sorting reflexes.

By integrating the **Avfall Sverige** (Swedish Waste Management Association) classification standards, Trash Cracker transforms complex ecological responsibilities into high-engagement behavioral "micro-wins."

---

## 🛠 High-End Technical Architecture

The platform is built on a modern, reactive stack designed for zero-latency interaction and cross-platform accessibility.

* **Logic Engine:** Built with **React 19**, utilizing advanced React Hooks (`useRef`, `useEffect`) for state-driven synchronization of visual and auditory feedback loops.
* **Motion Orchestration:** Powered by **Framer Motion**. This allows for "Fluid Inertia" dragging, ensuring that the tactile experience on touch-sensitive devices (Android/iOS) mirrors real-world physics.
* **Audio Spatialization:** Implements the **Web Audio API** to manage asynchronous sound buffers, providing an immersive auditory environment without blocking the main UI thread.
* **Physics & Collision Detection:** Custom coordinate-based "Hitbox Detection" logic, moving away from legacy HTML5 Drag APIs to a more robust, hardware-accelerated pointer-event system.



---

## 🇸🇪 The Swedish Sustainability Model
Trash Cracker is localized and technically optimized to support the Swedish "Pant" and recycling culture:
* **Category Precision:** Specialized sorting for Plastic, Paper, Bio-waste (Food), Hazardous (Batteries), and Glass.
* **Bilingual Cognitive Load:** Dual-language support (English/Swedish) to facilitate language acquisition alongside ecological education.
* **Reward Psychology:** Integrated `canvas-confetti` systems and emotive character response modules (Happy/Sad/Normal) based on the **"Nudging"** theory used in Scandinavian public policy.



---

## 🚀 Deployment & Scalability
The architecture is designed for **Edge-Runtime Deployment** via Vercel, ensuring:
* **Global Low Latency:** Assets are served from the nearest CDN node.
* **Mobile-First Responsive Design:** Optimized for 100vh viewport locking, preventing browser-chrome interference and ensuring a "Native App" feel on Android and iOS devices.
* **PWA Ready:** Manifest-compliant for "Add to Home Screen" installation, bypassing traditional App Store friction.

---

## 📂 Project Structure
```text
├── src
│   ├── assets          # High-resolution optimized visual assets
│   ├── App.jsx         # Core Application Logic & Hitbox Engine
│   ├── App.css         # Responsive Flexbox & Motion Styling
│   └── main.jsx        # Entry point
├── public              # Static audio buffers (yay.mp3, oops.mp3)
└── package.json        # Dependency Management (Framer-Motion, Confetti)


