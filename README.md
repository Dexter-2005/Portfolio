# Himanshu Chaudhary | Developer Portfolio

A high-performance, interactive 3D portfolio website built for a Competitive Programmer and Full-Stack Developer. Features a custom WebGL background, dynamic Framer Motion animations, competitive programming statistics visualizers, and a **custom built-in AI Assistant** powered by Gemini.

![Portfolio Preview](./public/favicon.ico)

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & [Drei](https://github.com/pmndrs/drei)
- **AI Integration:** [Google Generative AI SDK](https://ai.google.dev/) (Gemini 2.5 Flash)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** JetBrains Mono (Terminal elements), Syne (Display headings), DM Sans (Body)

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Gemini API Key (save as `GEMINI_API_KEY` in `.env.local` for the AI assistant)

### Installation

1. Clone the repository
```bash
git clone https://github.com/Dexter-2005/Portfolio.git
cd Portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

- `src/app/`: Next.js App Router endpoints, including the `/api/chat` backend route.
- `src/components/`: Reusable UI components, Sections, and 3D Scene components.
- `src/lib/`: Utility functions, animation variants, and the **single source of truth for all data** (`data.ts`).
- `src/hooks/`: Custom React hooks (e.g., `useCountUp` for number animations).

## 📝 Updating Content

All personal data, projects, stats, AI system prompts, and text content are centralized in **`src/lib/data.ts`**. 
To update the portfolio (e.g., updating Codeforces rating, adding a new project), simply edit this one object—no component changes required!

## 🌐 Deployment

This project is optimized for deployment on Vercel.

```bash
npm run build
```
