# Évora — Free & Budget Deployment Architectures Guide

This guide details two highly cost-effective, premium architectures to host and run the **Évora** French & TCF Canada Prep Platform completely in production without paying high cloud server or AI API costs. 

---

## 🗺️ Architecture 1: The 100% Free Local Home Server
**Concept**: You host all code, databases, and AI models on your own PC or Mac, and securely expose it to the internet for free using **Cloudflare Tunnels**.

```
[Student Device] 
       │ 
       ▼ (HTTPS connection to custom subdomain)
[Cloudflare Edge DNS] (DDoS Protection & SSL)
       │
       ▼ (Secure Cloudflare Tunnel Connection)
[Your Local Machine] (Running 24/7)
 ├── Next.js Frontend (Port 3000)
 ├── Express Backend Server (Port 5001)
 ├── Postgres & Redis (Docker Compose)
 ├── Ollama LLM (Llama 3 / Mistral)
 └── Local STT / TTS Python Server (Whisper / Kokoro)
```

### ⚙️ The Tech Stack Details:
*   **Hosting**: Your local development machine (PC, Mac, or home mini-PC).
*   **LLM Evaluations**: **Ollama** running `llama3` or `mistral` locally on port `11434`.
*   **Speech-to-Text**: A local Python script running `faster-whisper` (100% CPU/GPU-driven transcription).
*   **Text-to-Speech**: A local Python script running `kokoro-onnx` (highly realistic, low-latency French voices running locally).
*   **Public Gateway**: **Cloudflare Tunnels (`cloudflared`)** exposes your local ports (`3000` & `5001`) to the internet securely, hiding your home IP and providing free HTTPS certificates.

### 📋 Setup & Exposing Instructions:
1.  **Start Services**: Ensure Docker database, Next.js frontend, and Express backend are running.
2.  **Start local Ollama**:
    ```bash
    ollama run llama3
    ```
3.  **Install & Start Cloudflare Tunnel**:
    ```bash
    brew install cloudflared
    cloudflared tunnel --url http://localhost:3000
    ```
    *Cloudflare will print a secure URL (e.g. `https://some-subdomain.trycloudflare.com`) that anyone in the world can access.*

### 👍 Pros & Cons:
*   **Pros**:
    *   **$0/month forever**. Absolutely no hosting fees or token charges.
    *   Complete privacy; user recordings and files stay on your hardware.
*   **Cons**:
    *   Your machine must remain powered on, awake, and connected to the internet 24/7.
    *   Limited by your home upload speed and hardware RAM/GPU capacity.

---

## ☁️ Architecture 2: The "Almost Free" Serverless Cloud
**Concept**: Host the application on free cloud tiers and use extremely cheap, serverless open-source AI APIs in place of paid cloud models. No home PC required.

```
[Student Device]
       │
       ├───> [Vercel] (Next.js Frontend: Free Tier, 24/7)
       │
       ├───> [Neon.tech] (Serverless Postgres DB: Free Tier, 24/7)
       │
       └───> [Render / Railway] (Express Backend: Free Tier, 24/7)
                 │
                 ▼ (Low-Cost Serverless API Calls)
           [Deepinfra / Groq / Hugging Face Spaces]
```

### ⚙️ The Tech Stack Details:
*   **Frontend**: Hosted on **Vercel** (100% free for Next.js app deployments).
*   **Backend API**: Hosted on **Render** or **Railway** free web service tiers.
*   **Database**: Hosted on **Neon.tech** or **Supabase** (provides serverless Postgres databases for free).
*   **LLM Grading Engine**: **Groq API** (free trial limits) or **Deepinfra** (runs Llama 3 for **$0.05 per million tokens** — 100x cheaper than GPT-4o, giving you millions of graded pages for cents).
*   **Speech-to-Text**: Hosted on **Hugging Face CPU Spaces** (completely free, open-source container that hosts Python Faster-Whisper to transcribe audios on demand).

### 👍 Pros & Cons:
*   **Pros**:
    *   **Runs 24/7 automatically** without relying on your home computer.
    *   Extremely high reliability, low latency, and hosted on global cloud nodes.
    *   Negligible cost (under $1-2 per month even with active users).
*   **Cons**:
    *   Minor setups required to register accounts on Vercel, Neon, and Deepinfra.

---

## 📈 Key Business Usecases for Free/Budget Hosting

Implementing these cost-saving architectures allows you to expand Évora in unique, highly profitable directions:

### 1. The High-Margin Freemium Business Model
By running your AI evaluations at $0 (locally) or $0.05/million tokens (via Deepinfra), you can easily offer a **Free Tier** to all new users. This lets you build a massive user list of TCF candidates without running into heavy API debt, converting them to premium users over time.

### 2. High-Privacy Enterprise & B2B Tenders
Language academies, universities, and immigration consultancies are legally bound to protect student recording data. By pitching a **100% locally-hosted** Évora platform running on their school's private local servers, you secure an immense advantage over cloud competitors.

### 3. Self-Contained Desktop Application (Tauri / Electron)
You can package the entire Évora repository into a downloadable **desktop installer** (.dmg / .exe) using **Tauri** or **Electron**:
*   The application runs its own SQLite/local database.
*   It calls a local Ollama instance on the user's computer.
*   You can sell it as a premium, one-time purchase "Offline TCF Prep Simulator" that operates anywhere without internet access.
